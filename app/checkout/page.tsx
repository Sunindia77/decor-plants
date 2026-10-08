"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import Header from "@/components/Header";
import { useCart } from "@/context/CartContext";
import { getCartLines, getCartTotals, formatINR } from "@/lib/commerce";

interface OrderSuccess {
  id: string;
  total: number;
}

function isOrderSuccess(value: unknown): value is { success: true; order: OrderSuccess } {
  if (typeof value !== "object" || value === null || !("success" in value) || !("order" in value)) {
    return false;
  }
  const order = value.order;
  return (
    value.success === true &&
    typeof order === "object" &&
    order !== null &&
    "id" in order &&
    "total" in order &&
    typeof order.id === "string" &&
    typeof order.total === "number"
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, ready, clearCart } = useCart();
  const lines = getCartLines(items);
  const totals = getCartTotals(lines);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState<OrderSuccess | null>(null);
  const [profile, setProfile] = useState<{ name: string; email: string } | null>(null);
  const [profileReady, setProfileReady] = useState(false);
  const hasEnoughStock = lines.every((line) => line.quantity <= line.product.stock && line.product.stock > 0);

  useEffect(() => {
    let cancelled = false;

    async function loadProfile(): Promise<void> {
      try {
        const response = await fetch("/api/auth/me", { cache: "no-store" });
        const result: unknown = await response.json();
        if (!response.ok) {
          throw new Error("We could not load your signed-in profile. Please try again.");
        }

        if (
          typeof result !== "object" ||
          result === null ||
          !("user" in result) ||
          typeof result.user !== "object" ||
          result.user === null ||
          !("email" in result.user) ||
          typeof result.user.email !== "string"
        ) {
          router.replace(`/login?next=${encodeURIComponent("/checkout")}`);
          return;
        }

        const name =
          "name" in result.user && typeof result.user.name === "string" ? result.user.name : "";
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

  async function placeOrder(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    if (lines.length === 0 || !hasEnoughStock || submitting) return;

    const formData = new FormData(event.currentTarget);
    const customer = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
    };
    const address = {
      address: String(formData.get("address") ?? "").trim(),
      city: String(formData.get("city") ?? "").trim(),
      state: String(formData.get("state") ?? "").trim(),
      pincode: String(formData.get("pincode") ?? "").trim(),
    };

    setSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer,
          address,
          items: lines.map(({ productId, quantity }) => ({ productId, quantity })),
          total: totals.total,
        }),
      });
      const result: unknown = await response.json();
      if (!response.ok) {
        const message =
          typeof result === "object" && result !== null && "error" in result && typeof result.error === "string"
            ? result.error
            : "We couldn’t place your order. Please check your details and try again.";
        setError(message);
        return;
      }
      if (!isOrderSuccess(result)) {
        setError("We received an unexpected response. Please contact us before trying again.");
        return;
      }
      setOrder(result.order);
      clearCart();
    } catch {
      setError("We couldn’t reach the order service. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="shop-page">
      <Header />
      <section className="shop-checkout-page">
        <div className="shop-page-heading">
          <span className="shop-eyebrow">ONE LAST LITTLE STEP</span>
          <h1>Delivery details</h1>
          <p>Tell us where to send your new green friends.</p>
        </div>
        {!ready || !profileReady ? (
          <div className="shop-loading-state" role="status">Getting your order ready…</div>
        ) : order ? (
          <div className="shop-order-success" role="status">
            <i className="bi bi-check-circle" aria-hidden="true" />
            <span className="shop-eyebrow">ORDER RECEIVED</span>
            <h2>Thank you for growing with us.</h2>
            <p>Your order reference is <strong>{order.id}</strong>. We have received your order for {formatINR(order.total)}.</p>
            <p>You can see its status and tracking updates from your account.</p>
            <p className="shop-payment-note">Your order is saved. Payment is pending and has not been collected; a payment option can be connected later.</p>
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
              {!hasEnoughStock && <p className="shop-form-error" role="alert">One or more items are no longer available in the requested quantity. Please return to your bag.</p>}
              {error && <p className="shop-form-error" role="alert">{error}</p>}
              <button className="shop-checkout-button" type="submit" disabled={submitting || !hasEnoughStock}>
                {submitting ? "Placing order…" : "Place order"}
                {!submitting && <i className="bi bi-arrow-right" aria-hidden="true" />}
              </button>
              <p className="shop-secure-note"><i className="bi bi-shield-check" aria-hidden="true" /> No payment is taken at this stage.</p>
            </aside>
          </form>
        )}
      </section>
    </main>
  );
}
