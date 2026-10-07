import type { Metadata } from "next";
import Header from "@/components/Header";
import ShopCatalog from "@/components/ShopCatalog";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Shop Plants, Planters & Garden Care",
  description: "Find easy-care indoor plants, thoughtful planters and garden care essentials, delivered from Decor-Plants.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const params = await searchParams;
  const initialSearch = typeof params.q === "string" ? params.q : "";

  return (
    <main className="shop-page">
      <Header />
      <section className="shop-hero">
        <div className="shop-hero-inner">
          <div className="shop-hero-copy">
            <span className="shop-eyebrow">A LITTLE MORE LIFE, EVERY DAY</span>
            <h1>Find your <em>kind</em> of green.</h1>
            <p>Thoughtfully picked plants, pots and little things that make a space feel like yours.</p>
            <a className="shop-hero-link" href="#products">
              Explore the collection <i className="bi bi-arrow-down-right" aria-hidden="true" />
            </a>
          </div>
          <div className="shop-hero-image" role="img" aria-label="A lush indoor garden filled with green plants">
            <span className="shop-hero-note"><i className="bi bi-stars" aria-hidden="true" /> Grown with care, picked for you</span>
          </div>
          <div className="shop-hero-stamp" aria-hidden="true">
            <i className="bi bi-flower1" />
            <span>GROW SLOW<br />LIVE GREEN</span>
          </div>
        </div>
      </section>
      <section className="shop-main-section">
        <div className="shop-main-inner">
          <div className="shop-section-heading">
            <div>
              <span className="shop-eyebrow">THE GOOD GREEN STUFF</span>
              <h2>Made for your everyday</h2>
            </div>
            <p>Good things grow with a little care. Find the right plant to start yours.</p>
          </div>
          <ShopCatalog products={products} initialSearch={initialSearch} />
        </div>
      </section>
      <section className="shop-perks" aria-label="Shopping benefits">
        <div><i className="bi bi-box-seam" aria-hidden="true" /><span><strong>Thoughtful packing</strong>Plants travel safely to your door.</span></div>
        <div><i className="bi bi-flower2" aria-hidden="true" /><span><strong>Picked with care</strong>Hand-selected by our plant people.</span></div>
        <div><i className="bi bi-chat-heart" aria-hidden="true" /><span><strong>Here to help</strong>Friendly advice for every new leaf.</span></div>
      </section>
    </main>
  );
}
