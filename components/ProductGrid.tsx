import type { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";

export default function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="shop-empty-state" role="status">
        <span className="shop-empty-icon"><i className="bi bi-flower1" aria-hidden="true" /></span>
        <h2>No plants found just yet</h2>
        <p>Try another search or choose a different category to find your next favourite.</p>
      </div>
    );
  }

  return (
    <div className="shop-product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
