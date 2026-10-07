import Link from "next/link";
import type { CartTotals } from "@/lib/commerce";
import { formatINR } from "@/lib/commerce";

export default function CartSummary({ totals }: { totals: CartTotals }) {
  return (
    <aside className="shop-summary-card">
      <h2>Cart summary</h2>
      <div className="shop-summary-row"><span>Subtotal</span><span>{formatINR(totals.subtotal)}</span></div>
      <div className="shop-summary-row shop-summary-discount">
        <span>Discount</span><span>−{formatINR(totals.discount)}</span>
      </div>
      <div className="shop-summary-row">
        <span>Delivery</span><span>{totals.delivery === 0 ? "Free" : formatINR(totals.delivery)}</span>
      </div>
      <p className="shop-delivery-note">
        {totals.delivery === 0 ? "You’ve unlocked free delivery." : `Free delivery on orders of ${formatINR(1500)} or more.`}
      </p>
      <div className="shop-summary-total"><strong>Total</strong><strong>{formatINR(totals.total)}</strong></div>
      <Link className="shop-checkout-button" href="/checkout">
        Proceed to checkout <i className="bi bi-arrow-right" aria-hidden="true" />
      </Link>
      <p className="shop-secure-note"><i className="bi bi-shield-check" aria-hidden="true" /> Secure checkout, no payment due yet</p>
    </aside>
  );
}
