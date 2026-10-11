"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import Header from "@/components/Header";
import { useCart } from "@/context/CartContext";
import { getCartLines, getCartTotals, formatINR } from "@/lib/commerce";

interface OrderSuccess {
  id: string;
  total: number;
}

interface RazorpayCheckoutResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: { name: string; email: string; contact: string };
  theme: { color: string };
  handler: (response: RazorpayCheckoutResponse) => void | Promise<void>;
  modal: { ondismiss: () => void };
}

interface RazorpayInstance {
  open: () => void;
  on: (event: "payment.failed", handler: (response: { error?: { description?: string } }) => void) => void;
}

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface PendingVerification {
  customerOrderId: string;
  response: RazorpayCheckoutResponse;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getCheckoutRequestId(fingerprint: string): string {
  const storageKey = "decor-plants-checkout-request";
  const fingerprintKey = "decor-plants-checkout-fingerprint";
  const existing = window.sessionStorage.getItem(storageKey);
  if (
    existing &&
    /^[0-9a-f-]{36}$/i.test(existing) &&
    window.sessionStorage.getItem(fingerprintKey) === fingerprint
  ) {
    return existing;
  }
  const next = window.crypto.randomUUID();
  window.sessionStorage.setItem(storageKey, next);
  window.sessionStorage.setItem(fingerprintKey, fingerprint);
  return next;
}

function rotateCheckoutRequestId(): void {
  window.sessionStorage.removeItem("decor-plants-checkout-request");
  window.sessionStorage.removeItem("decor-plants-checkout-fingerprint");
}

async function loadRazorpay(): Promise<void> {
  if (window.Razorpay) return;

  await new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]',
    );
    const script = existingScript ?? document.createElement("script");

    const onLoad = () => window.Razorpay ? resolve() : reject(new Error("Payment checkout could not be loaded."));
    const onError = () => {
      script.remove();
      reject(new Error("Payment checkout could not be loaded. Check your connection and retry."));
    };
    const timeout = window.setTimeout(
      () => {
        script.remove();
        reject(new Error("Payment checkout timed out. Please check your connection and retry."));
      },
      20_000,
    );
    const settle = (callback: () => void) => {
      window.clearTimeout(timeout);
      callback();
    };
    script.addEventListener("load", () => settle(onLoad), { once: true });
    script.addEventListener("error", () => settle(onError), { once: true });

    if (!existingScript) {
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }
  });
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, ready, clearCart } = useCart();
  const lines = getCartLines(items);
  const totals = getCartTotals(lines);
  const [submitting, setSubmitting] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState<OrderSuccess | null>(null);
  const [pendingVerification, setPendingVerification] = useState<PendingVerification | null>(null);
  const [profile, setProfile] = useState<{ name: string; email: string } | null>(null);
  const [profileReady, setProfileReady] = useState(false);
  const verificationStarted = useRef(false);
  const hasEnoughStock = lines.every((line) => line.quantity <= line.product.stock && line.product.stock > 0);

  useEffect(() => {
    let cancelled = false;

    async function loadProfile(): Promise<void> {
      try {
        const response = await fetch("/api/auth/me", { cache: "no-store" });
        const result: unknown = await response.json();
        if (!response.ok) throw new Error("We could not load your signed-in profile. Please try again.");

        if (
          !isRecord(result) ||
          !isRecord(result.user) ||
          typeof result.user.email !== "string"
        ) {
          router.replace(`/login?next=${encodeURIComponent("/checkout")}`);
          return;
        }

        const name = typeof result.user.name === "string" ? result.user.name : "";
        if (!cancelled) {
          setProfile({ name, email: result.user.email });
          setProfileReady(true);
        }
      } catch (profileError) {
        if (!cancelled) {
          setError(
            profileError instanceof Error
              ? profileError.message
              : "We could not load your signed-in profile.",
          );
          setProfileReady(true);
        }
      }
    }

    void loadProfile();
    return () => {
      cancelled = true;
    };
  }, [router]);

  async function verifyPayment(pending: PendingVerification): Promise<void> {
    setVerifying(true);
    setError("");
    try {
      const response = await fetch("/api/payments/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerOrderId: pending.customerOrderId,
          ...pending.response,
        }),
      });
      const result: unknown = await response.json();
      if (
        !response.ok ||
        !isRecord(result) ||
        result.success !== true ||
        !isRecord(result.order) ||
        typeof result.order.id !== "string" ||
        typeof result.order.total !== "number" ||
        result.order.paymentStatus !== "paid"
      ) {
        const message =
          isRecord(result) && typeof result.error === "string"
            ? result.error
            : "Payment confirmation is delayed. Your cart is safe; retry verification or check your order history.";
        setError(message);
        return;
      }

      setOrder({ id: result.order.id, total: result.order.total });
      setPendingVerification(null);
      window.sessionStorage.removeItem("decor-plants-checkout-request");
      window.sessionStorage.removeItem("decor-plants-checkout-fingerprint");
      clearCart();
    } catch {
      setError("Payment confirmation could not be reached. Your cart is safe; please retry verification.");
    } finally {
      setVerifying(false);
      setSubmitting(false);
    }
  }

  async function placeOrder(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    if (lines.length === 0 || !hasEnoughStock || submitting || pendingVerification) return;

    const formData = new FormData(event.currentTarget);
    const customer = {
      name: String(formData.get("name") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
    };
    const address = {
      address: String(formData.get("address") ?? "").trim(),
      city: String(formData.get("city") ?? "").trim(),
      state: String(formData.get("state") ?? "").trim(),
      pincode: String(formData.get("pincode") ?? "").trim(),
    };
    const checkoutFingerprint = JSON.stringify({
      customer,
      address,
      items: lines.map(({ productId, quantity }) => ({ productId, quantity })),
    });

    setSubmitting(true);
    setError("");
    verificationStarted.current = false;
    try {
      const response = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer,
          address,
          items: lines.map(({ productId, quantity }) => ({ productId, quantity })),
          checkoutRequestId: getCheckoutRequestId(checkoutFingerprint),
        }),
      });
      const result: unknown = await response.json();
      if (!response.ok || !isRecord(result) || result.success !== true || !isRecord(result.order)) {
        setError(
          isRecord(result) && typeof result.error === "string"
            ? result.error
            : "We could not prepare your payment. Please check your details and try again.",
        );
        setSubmitting(false);
        return;
      }

      const customerOrderId = result.order.id;
      const orderNumber = result.order.orderNumber;
      const orderTotal = result.order.total;
      if (typeof customerOrderId !== "string" || typeof orderNumber !== "string" || typeof orderTotal !== "number") {
        setError("We received an unexpected order response. Please contact support before retrying.");
        setSubmitting(false);
        return;
      }

      if (result.alreadyPaid === true) {
        setOrder({ id: orderNumber, total: orderTotal });
        window.sessionStorage.removeItem("decor-plants-checkout-request");
        window.sessionStorage.removeItem("decor-plants-checkout-fingerprint");
        clearCart();
        setSubmitting(false);
        return;
      }

      if (
        !isRecord(result.razorpay) ||
        typeof result.razorpay.keyId !== "string" ||
        typeof result.razorpay.orderId !== "string" ||
        typeof result.razorpay.amount !== "number" ||
        result.razorpay.currency !== "INR"
      ) {
        setError("The payment service returned an unexpected response. Please try again.");
        setSubmitting(false);
        return;
      }

      await loadRazorpay();
      if (!window.Razorpay) throw new Error("Payment checkout could not be loaded.");

      const checkout = new window.Razorpay({
        key: result.razorpay.keyId,
        amount: result.razorpay.amount,
        currency: result.razorpay.currency,
        name: "Decor-Plants",
        description: `Order ${orderNumber}`,
        order_id: result.razorpay.orderId,
        prefill: { name: customer.name, email: profile?.email ?? "", contact: customer.phone },
        theme: { color: "#2f6b45" },
        handler: async (paymentResponse) => {
          verificationStarted.current = true;
          const verification = { customerOrderId, response: paymentResponse };
          setPendingVerification(verification);
          await verifyPayment(verification);
        },
        modal: {
          ondismiss: () => {
            if (!verificationStarted.current) {
              rotateCheckoutRequestId();
              setError("Payment was cancelled. Your cart is unchanged; you can try again.");
              setSubmitting(false);
            }
          },
        },
      });
      checkout.on("payment.failed", (failure) => {
        rotateCheckoutRequestId();
        setError(failure.error?.description || "Payment failed. Please try again.");
        setSubmitting(false);
      });
      checkout.open();
    } catch (paymentError) {
      setError(
        paymentError instanceof Error
          ? paymentError.message
          : "The payment service could not be reached. Your cart is unchanged.",
      );
      setSubmitting(false);
    }
  }

  return (
    <main className="shop-page">
      <Header />
      <section className="shop-checkout-page">
        <div className="shop-page-heading">
          <span className="shop-eyebrow">SECURE CHECKOUT</span>
          <h1>Delivery details</h1>
          <p>Tell us where to send your new green friends.</p>
        </div>
        {!ready || !profileReady ? (
          <div className="shop-loading-state" role="status">Getting your order ready…</div>
        ) : order ? (
          <div className="shop-order-success" role="status">
            <i className="bi bi-check-circle" aria-hidden="true" />
            <span className="shop-eyebrow">PAYMENT SUCCESSFUL</span>
            <h2>Order placed successfully.</h2>
            <p>Your order number is <strong>{order.id}</strong>.</p>
            <p>Payment confirmed: <strong>{formatINR(order.total)}</strong></p>
            <p>You can view your order status and tracking from your account.</p>
            <Link className="shop-checkout-button" href="/account">View your orders</Link>
            <Link className="shop-checkout-button" href="/shop">Back to the shop</Link>
          </div>
        ) : !profile ? (
          <div className="shop-auth-message is-error" role="alert">
            {error || "We could not load your signed-in profile. Please refresh and try again."}
          </div>
        ) : lines.length === 0 ? (
          <div className="shop-cart-empty">
            <i className="bi bi-bag" aria-hidden="true" />
            <h2>Your bag is waiting for something green</h2>
            <p>Add a plant or a planter before heading to checkout.</p>
            <Link className="shop-checkout-button" href="/shop">Browse the collection</Link>
          </div>
        ) : (
          <form className="shop-checkout-layout" onSubmit={placeOrder}>
            <div className="shop-checkout-fields">
              <section className="shop-form-section">
                <h2><span>01</span> Customer information</h2>
                <div className="shop-form-grid">
                  <label className="shop-form-field shop-field-full">
                    Full name
                    <input autoComplete="name" name="name" required maxLength={100} defaultValue={profile.name} />
                  </label>
                  <label className="shop-form-field">
                    Email
                    <input autoComplete="email" type="email" name="email" value={profile.email} readOnly />
                  </label>
                  <label className="shop-form-field">
                    Mobile number
                    <input autoComplete="tel" type="tel" name="phone" required pattern="(?:\+91 ?)?[6-9][0-9]{9}" title="Enter a valid 10-digit Indian mobile number" />
                  </label>
                </div>
              </section>
              <section className="shop-form-section">
                <h2><span>02</span> Delivery address</h2>
                <div className="shop-form-grid">
                  <label className="shop-form-field shop-field-full">
                    Address
                    <textarea autoComplete="street-address" name="address" rows={3} required maxLength={300} />
                  </label>
                  <label className="shop-form-field">
                    City
                    <input autoComplete="address-level2" name="city" required maxLength={80} />
                  </label>
                  <label className="shop-form-field">
                    State
                    <input autoComplete="address-level1" name="state" required maxLength={80} />
                  </label>
                  <label className="shop-form-field">
                    Pincode
                    <input autoComplete="postal-code" inputMode="numeric" name="pincode" required pattern="[0-9]{6}" maxLength={6} title="Enter a 6-digit Indian pincode" />
                  </label>
                </div>
              </section>
            </div>
            <aside className="shop-summary-card shop-checkout-summary">
              <h2>Order summary</h2>
              <div className="shop-checkout-lines">
                {lines.map((line) => (
                  <div className="shop-checkout-line" key={line.productId}>
                    <span>{line.product.name} <small>× {line.quantity}</small></span>
                    <strong>{formatINR(line.product.price * line.quantity)}</strong>
                  </div>
                ))}
              </div>
              <div className="shop-summary-row"><span>Subtotal</span><span>{formatINR(totals.subtotal)}</span></div>
              <div className="shop-summary-row shop-summary-discount"><span>Discount</span><span>−{formatINR(totals.discount)}</span></div>
              <div className="shop-summary-row"><span>Delivery</span><span>{totals.delivery === 0 ? "Free" : formatINR(totals.delivery)}</span></div>
              <div className="shop-summary-total"><strong>Total</strong><strong>{formatINR(totals.total)}</strong></div>
              {!hasEnoughStock && <p className="shop-form-error" role="alert">One or more items are unavailable in the requested quantity. Please return to your bag.</p>}
              {error && <p className="shop-form-error" role="alert">{error}</p>}
              {pendingVerification ? (
                <button
                  className="shop-checkout-button"
                  type="button"
                  onClick={() => void verifyPayment(pendingVerification)}
                  disabled={verifying}
                >
                  {verifying ? "Confirming payment…" : "Retry payment verification"}
                </button>
              ) : (
                <button className="shop-checkout-button" type="submit" disabled={submitting || !hasEnoughStock}>
                  {submitting ? "Opening secure payment…" : "Pay Now"}
                  {!submitting && <i className="bi bi-arrow-right" aria-hidden="true" />}
                </button>
              )}
              <p className="shop-secure-note"><i className="bi bi-shield-check" aria-hidden="true" /> Secure payment powered by Razorpay</p>
            </aside>
          </form>
        )}
      </section>
    </main>
  );
}
