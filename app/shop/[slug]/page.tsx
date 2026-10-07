import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import ProductPurchasePanel from "@/components/ProductPurchasePanel";
import { products } from "@/data/products";
import { formatINR } from "@/lib/commerce";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((entry) => entry.slug === slug);
  return product
    ? { title: product.name, description: product.description }
    : { title: "Plant not found" };
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await headers();
  const { slug } = await params;
  const product = products.find((entry) => entry.slug === slug);
  if (!product) notFound();

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <main className="shop-page">
      <Header />
      <div className="shop-detail-page">
        <div className="shop-breadcrumbs">
          <Link href="/">Home</Link><span>/</span><Link href="/shop">Shop</Link><span>/</span><span>{product.name}</span>
        </div>
        <section className="shop-detail-layout">
          <div className="shop-detail-image">
            <Image src={product.image} alt={product.name} fill priority sizes="(max-width: 767px) 100vw, 54vw" />
            {discount > 0 && <span className="shop-discount-badge">-{discount}%</span>}
          </div>
          <div className="shop-detail-copy">
            <span className="shop-product-category">{product.category} · {product.subcategory}</span>
            <h1>{product.name}</h1>
            {product.reviewCount > 0 ? (
              <div className="shop-detail-rating" aria-label={`${product.rating} out of 5 stars`}>
                <span aria-hidden="true">★</span> {product.rating.toFixed(1)}
                <span>({product.reviewCount} reviews)</span>
              </div>
            ) : (
              <p className="shop-detail-rating shop-no-reviews">New to our shop · Be the first to review</p>
            )}
            <p className="shop-detail-description">{product.description}</p>
            <ProductPurchasePanel product={product} />
            <div className="shop-detail-assurance">
              <i className="bi bi-truck" aria-hidden="true" />
              <span>Carefully packed and delivered to your doorstep.</span>
            </div>
          </div>
        </section>
        <section className="shop-product-information">
          <div className="shop-info-heading">
            <span className="shop-eyebrow">A FEW THINGS TO KNOW</span>
            <h2>Product information</h2>
          </div>
          <div className="shop-care-grid">
            <div className="shop-care-card">
              <i className="bi bi-brightness-high" aria-hidden="true" />
              <span>Light</span><strong>{product.light}</strong>
            </div>
            <div className="shop-care-card">
              <i className="bi bi-droplet" aria-hidden="true" />
              <span>Watering</span><strong>{product.watering}</strong>
            </div>
            <div className="shop-care-card">
              <i className="bi bi-rulers" aria-hidden="true" />
              <span>Height</span><strong>{product.height}</strong>
            </div>
            <div className="shop-care-card">
              <i className="bi bi-circle" aria-hidden="true" />
              <span>Pot size</span><strong>{product.potSize}</strong>
            </div>
          </div>
          <div className="shop-care-instructions">
            <h3>Plant care tips</h3>
            <ul>{product.careInstructions.map((tip) => <li key={tip}>{tip}</li>)}</ul>
          </div>
          <div className="shop-detail-price-footnote">Current price: {formatINR(product.price)} · Taxes included</div>
        </section>
      </div>
    </main>
  );
}
