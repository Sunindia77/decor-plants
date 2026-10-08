"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { formatINR } from "@/lib/commerce";

interface AccountProfile {
  email: string;
  name: string | null;
  avatarUrl: string | null;
}

interface OrderItem {
  id: number;
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

interface CustomerOrder {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: OrderStatus;
  trackingNumber: string | null;
  trackingUrl: string | null;
  total: number;
  items: OrderItem[];
}

type AccountState =
  | { status: "loading" }
  | {
      status: "ready";
      profile: AccountProfile;
      orders: CustomerOrder[];
      ordersError: string;
      isAdmin: boolean;
    }
  | { status: "error"; message: string };

const trackingStatuses: Array<{ id: OrderStatus; label: string }> = [
  { id: "pending", label: "Order received" },
  { id: "confirmed", label: "Confirmed" },
  { id: "processing", label: "Preparing" },
  { id: "shipped", label: "Shipped" },
  { id: "out_for_delivery", label: "Out for delivery" },
  { id: "delivered", label: "Delivered" },
];

const validStatuses = new Set<OrderStatus>([
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "out_for_delivery",
  "delivered",
  "cancelled",
]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getGoogleAvatarUrl(value: unknown): string | null {
  if (typeof value !== "string") return null;

  try {
    const avatarUrl = new URL(value);
    return avatarUrl.protocol === "https:" && avatarUrl.hostname === "lh3.googleusercontent.com"
      ? value
      : null;
  } catch {
    return null;
  }
}

function parseOrderItem(value: unknown): OrderItem | null {
  if (
    !isRecord(value) ||
    typeof value.id !== "number" ||
    typeof value.product_id !== "string" ||
    typeof value.product_name !== "string" ||
    typeof value.product_image !== "string" ||
    typeof value.quantity !== "number" ||
    typeof value.unit_price !== "number" ||
    typeof value.line_total !== "number"
  ) {
    return null;
  }

  return {
    id: value.id,
    productId: value.product_id,
    productName: value.product_name,
    productImage: value.product_image,
    quantity: value.quantity,
    unitPrice: value.unit_price,
    lineTotal: value.line_total,
  };
}

function parseOrder(value: unknown): CustomerOrder | null {
  if (
    !isRecord(value) ||
    typeof value.id !== "string" ||
    typeof value.order_number !== "string" ||
    typeof value.created_at !== "string" ||
    typeof value.status !== "string" ||
    !validStatuses.has(value.status as OrderStatus) ||
    typeof value.total !== "number" ||
    !Array.isArray(value.items)
  ) {
    return null;
  }

  const items = value.items.map(parseOrderItem);
  if (items.some((item) => item === null)) return null;

  const trackingUrl = typeof value.tracking_url === "string" ? value.tracking_url : null;
  return {
    id: value.id,
    orderNumber: value.order_number,
    createdAt: value.created_at,
    status: value.status as OrderStatus,
    trackingNumber: typeof value.tracking_number === "string" ? value.tracking_number : null,
    trackingUrl:
      trackingUrl && /^https?:\/\//i.test(trackingUrl) ? trackingUrl : null,
    total: value.total,
    items: items.filter((item): item is OrderItem => item !== null),
  };
}

function getInitials(name: string | null, email: string): string {
  const source = name?.trim() || email;
  const parts = source.split(/[\s@._-]+/).filter(Boolean);
  return `${parts[0]?.[0] ?? "G"}${parts[1]?.[0] ?? ""}`.toUpperCase();
}

function getStatusLabel(status: OrderStatus): string {
  if (status === "out_for_delivery") return "Out for delivery";
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function OrderTracking({ order }: { order: CustomerOrder }) {
  if (order.status === "cancelled") {
    return <p className="shop-order-cancelled"><i className="bi bi-x-circle" aria-hidden="true" /> This order was cancelled.</p>;
  }

  const activeIndex = trackingStatuses.findIndex((step) => step.id === order.status);

  return (
    <div className="shop-order-timeline" aria-label={`Order status: ${getStatusLabel(order.status)}`}>
      {trackingStatuses.map((step, index) => (
        <div
          className={`shop-order-timeline-step${index < activeIndex ? " is-complete" : ""}${index === activeIndex ? " is-current" : ""}`}
          key={step.id}
        >
          <span className="shop-order-timeline-marker" aria-hidden="true">
            {index < activeIndex ? <i className="bi bi-check" /> : null}
          </span>
          <span>{step.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function AccountPanel() {
  const router = useRouter();
  const [account, setAccount] = useState<AccountState>({ status: "loading" });
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadAccount(): Promise<void> {
      try {
        const profileResponse = await fetch("/api/auth/me", { cache: "no-store" });
        const profileResult: unknown = await profileResponse.json();

        if (!profileResponse.ok) {
          const message =
            isRecord(profileResult) && typeof profileResult.message === "string"
              ? profileResult.message
              : "We could not load your account.";
          if (!cancelled) setAccount({ status: "error", message });
          return;
        }

        if (
          !isRecord(profileResult) ||
          !isRecord(profileResult.user) ||
          typeof profileResult.user.email !== "string"
        ) {
          router.replace(`/login?next=${encodeURIComponent("/account")}`);
          return;
        }

        const profile: AccountProfile = {
          email: profileResult.user.email,
          name: typeof profileResult.user.name === "string" ? profileResult.user.name : null,
          avatarUrl: getGoogleAvatarUrl(profileResult.user.avatarUrl),
        };
        const ordersResponse = await fetch("/api/orders", { cache: "no-store" });
        const ordersResult: unknown = await ordersResponse.json();
        let orders: CustomerOrder[] = [];
        let ordersError = "";

        let isAdmin = false;
        if (!ordersResponse.ok) {
          ordersError =
            isRecord(ordersResult) && typeof ordersResult.error === "string"
              ? ordersResult.error
              : "We could not load your order history.";
        } else if (
          !isRecord(ordersResult) ||
          !Array.isArray(ordersResult.orders) ||
          ordersResult.orders.some((value) => parseOrder(value) === null)
        ) {
          ordersError = "Your order history returned an unexpected response.";
        } else {
          isAdmin = ordersResult.isAdmin === true;
          orders = ordersResult.orders
            .map(parseOrder)
            .filter((order): order is CustomerOrder => order !== null);
        }

        if (!cancelled) setAccount({ status: "ready", profile, orders, ordersError, isAdmin });
      } catch {
        if (!cancelled) {
          setAccount({ status: "error", message: "We could not reach the account service. Please try again." });
        }
      }
    }

    void loadAccount();
    return () => {
      cancelled = true;
    };
  }, [router]);

  async function signOut(): Promise<void> {
    setSigningOut(true);
    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });
      if (!response.ok) {
        setAccount({ status: "error", message: "We could not sign you out. Please try again." });
        return;
      }
      router.replace("/login");
      router.refresh();
    } catch {
      setAccount({ status: "error", message: "We could not reach the account service. Please try again." });
    } finally {
      setSigningOut(false);
    }
  }

  if (account.status === "loading") {
    return <div className="shop-loading-state" role="status">Loading your account and orders…</div>;
  }

  if (account.status === "error") {
    return (
      <div className="shop-auth-message is-error" role="alert">
        {account.message} <Link href="/login">Return to sign in</Link>
      </div>
    );
  }

  return (
    <div className="shop-account-page">
      <section className="shop-profile-card" aria-labelledby="shop-account-title">
        <div className="shop-profile-avatar" aria-hidden="true">
          {account.profile.avatarUrl ? (
            <Image
              src={account.profile.avatarUrl}
              alt=""
              width={66}
              height={66}
            />
          ) : (
            getInitials(account.profile.name, account.profile.email)
          )}
        </div>
        <div className="shop-profile-details">
          <span className="shop-eyebrow">YOUR PROFILE</span>
          <h1 id="shop-account-title">{account.profile.name || "Welcome to Decor-Plants"}</h1>
          <p>{account.profile.email}</p>
          <span className="shop-profile-provider"><i className="bi bi-google" aria-hidden="true" /> Signed in with Google</span>
        </div>
        <button className="shop-signout-button" type="button" onClick={() => void signOut()} disabled={signingOut}>
          {signingOut ? "Signing out…" : "Sign out"}
        </button>
      </section>

      <section className="shop-account-orders" aria-labelledby="shop-orders-title">
        <div className="shop-account-section-heading">
          <div>
            <span className="shop-eyebrow">
              {account.isAdmin ? "ALL CUSTOMER PURCHASES · ADMIN" : "YOUR PURCHASES"}
            </span>
            <h2 id="shop-orders-title">Order history &amp; tracking</h2>
          </div>
          <Link href="/shop">Continue shopping <i className="bi bi-arrow-right" aria-hidden="true" /></Link>
        </div>

        {account.ordersError ? (
          <div className="shop-auth-message is-error" role="alert">{account.ordersError}</div>
        ) : account.orders.length === 0 ? (
          <div className="shop-cart-empty shop-account-empty">
            <i className="bi bi-bag" aria-hidden="true" />
            <h3>No orders yet</h3>
            <p>Orders you place while signed in will appear here with their delivery status.</p>
            <Link className="shop-checkout-button" href="/shop">Explore the shop</Link>
          </div>
        ) : (
          <div className="shop-order-list">
            {account.orders.map((order) => (
              <article className="shop-order-card" key={order.id}>
                <header className="shop-order-card-header">
                  <div>
                    <span className="shop-eyebrow">ORDER {order.orderNumber}</span>
                    <p>Placed {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
                  </div>
                  <span className={`shop-order-status${order.status === "cancelled" ? " is-cancelled" : ""}`}>
                    {getStatusLabel(order.status)}
                  </span>
                </header>

                <OrderTracking order={order} />

                {order.trackingNumber && (
                  <div className="shop-order-carrier">
                    <span>Tracking number</span>
                    {order.trackingUrl ? (
                      <a href={order.trackingUrl} target="_blank" rel="noopener noreferrer">
                        {order.trackingNumber} <i className="bi bi-box-arrow-up-right" aria-hidden="true" />
                      </a>
                    ) : (
                      <strong>{order.trackingNumber}</strong>
                    )}
                  </div>
                )}

                <div className="shop-order-items">
                  {order.items.map((item) => (
                    <div className="shop-order-item" key={item.id}>
                      <Image src={item.productImage} alt={item.productName} width={64} height={64} />
                      <span>{item.productName} <small>× {item.quantity}</small></span>
                      <strong>{formatINR(item.lineTotal)}</strong>
                    </div>
                  ))}
                </div>
                <footer className="shop-order-card-footer">
                  <span>Total</span>
                  <strong>{formatINR(order.total)}</strong>
                </footer>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
