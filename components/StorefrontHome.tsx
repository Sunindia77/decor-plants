import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { shopCategories } from "@/data/categories";
import { products } from "@/data/products";

const featuredProducts = shopCategories
  .flatMap(({ label }) => {
    const featured = products.find(
      (product) => product.category === label && product.featured && product.stock > 0,
    );
    const product = featured ?? products.find((entry) => entry.category === label && entry.stock > 0);
    return product ? [product] : [];
  })
  .slice(0, 4);
const categoryCards = shopCategories.flatMap((category) => {
  const product = products.find((item) => item.category === category.label);
  return product ? [{ ...category, product }] : [];
});
const tagCategoryCards = ["Air Purifying Plants", "Low Maintenance"].flatMap((label) => {
  const product = products.find((item) => item.tags.includes(label));
  return product ? [{ label, product }] : [];
});

export default function StorefrontHome() {
  return (
    <>
      <section className="storefront-hero" id="home">
        <div className="storefront-hero-copy">
          <span className="storefront-kicker">A greener home starts here</span>
          <h1>Bring a little <em>more life</em> indoors.</h1>
          <p>
            Meet plants chosen for real homes, easy-care pots and considered little touches to help your
            space grow into its own.
          </p>
          <div className="storefront-hero-actions">
            <Link className="storefront-button" href="/shop">
              Shop the collection <i className="bi bi-arrow-up-right" aria-hidden="true" />
            </Link>
            <Link className="storefront-text-link" href="/services/garden-design">
              Need a hand with your garden?
            </Link>
          </div>
          <div className="storefront-proof">
            <span><i className="bi bi-leaf" aria-hidden="true" /> Plants for every corner</span>
            <span><i className="bi bi-heart" aria-hidden="true" /> Advice from plant people</span>
          </div>
        </div>
        <div className="storefront-hero-art">
          <Image
            src="/images/garden/indoor-tropical-garden.png"
            alt="A bright, plant-filled living room"
            fill
            priority
            sizes="(max-width: 760px) 100vw, 54vw"
          />
          <div className="storefront-image-note">
            <span>GROW YOUR OWN WAY</span>
            <strong>Good things take root at home.</strong>
          </div>
        </div>
      </section>

      <section className="storefront-categories" id="categories" aria-labelledby="storefront-categories-title">
        <div className="storefront-section-heading">
          <div>
            <span className="storefront-kicker">Find your starting point</span>
            <h2 id="storefront-categories-title">A spot for every kind of green</h2>
          </div>
          <Link className="storefront-text-link" href="/shop">
            Explore all plants <i className="bi bi-arrow-right" aria-hidden="true" />
          </Link>
        </div>
        <div className="storefront-category-grid">
          {categoryCards.map(({ label, product }) => (
            <Link
              className="storefront-category-card"
              href={`/shop?category=${encodeURIComponent(label)}`}
              key={label}
            >
              <span className="storefront-category-image">
                <Image src={product.image} alt="" fill sizes="(max-width: 560px) 42vw, 18vw" />
              </span>
              <span className="storefront-category-label">{label}</span>
              <i className="bi bi-arrow-up-right" aria-hidden="true" />
            </Link>
          ))}
          {tagCategoryCards.map(({ label, product }) => (
            <Link
              className="storefront-category-card"
              href={`/shop?category=${encodeURIComponent(label)}`}
              key={label}
            >
              <span className="storefront-category-image">
                <Image src={product.image} alt="" fill sizes="(max-width: 560px) 42vw, 18vw" />
              </span>
              <span className="storefront-category-label">{label}</span>
              <i className="bi bi-arrow-up-right" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      <section className="storefront-featured" aria-labelledby="storefront-featured-title">
        <div className="storefront-section-heading">
          <div>
            <span className="storefront-kicker">Handpicked for your home</span>
            <h2 id="storefront-featured-title">Good things are growing</h2>
          </div>
          <Link className="storefront-text-link" href="/shop">
            See the whole collection <i className="bi bi-arrow-right" aria-hidden="true" />
          </Link>
        </div>
        <div className="storefront-product-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="storefront-care" id="about">
        <div className="storefront-care-mark" aria-hidden="true"><i className="bi bi-flower1" /></div>
        <div>
          <span className="storefront-kicker">More than a delivery</span>
          <h2>Here for every new leaf.</h2>
          <p>
            From choosing the right plant to planning a balcony or garden, our Pune-based team can help
            you make a space feel a little more like yours.
          </p>
        </div>
        <Link className="storefront-button storefront-button-light" href="/services/garden-maintenance">
          Explore plant care <i className="bi bi-arrow-up-right" aria-hidden="true" />
        </Link>
      </section>
    </>
  );
}
