"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/types/product";
import ProductGrid from "@/components/ProductGrid";
import ProductFilters from "@/components/ProductFilters";
import type { ProductCategoryFilter, ProductSort } from "@/components/ProductFilters";
import SearchBar from "@/components/SearchBar";
import { shopCategories } from "@/data/categories";

interface ShopCatalogProps {
  products: Product[];
  initialSearch?: string;
  initialCategory?: ProductCategoryFilter;
}

export default function ShopCatalog({
  products,
  initialSearch = "",
  initialCategory = "All Plants",
}: ShopCatalogProps) {
  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState<ProductCategoryFilter>(initialCategory);
  const [subcategory, setSubcategory] = useState("All");
  const [variety, setVariety] = useState("All");
  const [sort, setSort] = useState<ProductSort>("featured");
  const [minimumPrice, setMinimumPrice] = useState<number | "">("");
  const [maximumPrice, setMaximumPrice] = useState<number | "">("");
  const [light, setLight] = useState("All");
  const [watering, setWatering] = useState("All");
  const [inStockOnly, setInStockOnly] = useState(false);

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("en");
    const selectedCategory = shopCategories.find((item) => item.label === category);
    const selectedSubcategory = selectedCategory?.subcategories.find((item) => item.label === subcategory);
    const selectedVariety = selectedSubcategory?.children?.find((item) => item.label === variety);
    const filtered = products.filter((product) => {
      const matchesCategory =
        category === "All Plants" ||
        (category === "Air Purifying Plants" && product.tags.includes(category)) ||
        (category === "Low Maintenance" && product.tags.includes(category)) ||
        product.category === category;
      const matchesSubcategory =
        !selectedSubcategory ||
        subcategory === "All" ||
        (selectedSubcategory.subcategory !== undefined && product.subcategory === selectedSubcategory.subcategory) ||
        (selectedSubcategory.subcategories !== undefined &&
          selectedSubcategory.subcategories.includes(product.subcategory)) ||
        (selectedSubcategory.tag !== undefined && product.tags.includes(selectedSubcategory.tag));
      const matchesVariety =
        !selectedVariety ||
        variety === "All" ||
        selectedVariety.nameIncludes?.some((term) =>
          product.name.toLocaleLowerCase("en").includes(term.toLocaleLowerCase("en")),
        ) === true;
      const matchesSearch =
        !query ||
        `${product.name} ${product.category} ${product.subcategory} ${product.description} ${product.tags.join(" ")}`
          .toLocaleLowerCase("en")
          .includes(query);
      const matchesPrice =
        (minimumPrice === "" || product.price >= minimumPrice) &&
        (maximumPrice === "" || product.price <= maximumPrice);
      const matchesLight = light === "All" || product.light === light;
      const matchesWatering = watering === "All" || product.watering === watering;
      const matchesAvailability = !inStockOnly || product.stock > 0;
      return (
        matchesCategory &&
        matchesSubcategory &&
        matchesVariety &&
        matchesSearch &&
        matchesPrice &&
        matchesLight &&
        matchesWatering &&
        matchesAvailability
      );
    });

    return [...filtered].sort((first, second) => {
      switch (sort) {
        case "price-asc":
          return first.price - second.price;
        case "price-desc":
          return second.price - first.price;
        case "rating":
          return second.rating - first.rating;
        case "newest":
          return second.addedAt.localeCompare(first.addedAt);
        default:
          return Number(second.featured) - Number(first.featured);
      }
    });
  }, [
    category,
    inStockOnly,
    light,
    maximumPrice,
    minimumPrice,
    products,
    search,
    sort,
    subcategory,
    variety,
    watering,
  ]);

  const lightOptions = useMemo(() => [...new Set(products.map((product) => product.light))].sort(), [products]);
  const wateringOptions = useMemo(
    () => [...new Set(products.map((product) => product.watering))].sort(),
    [products],
  );

  function resetFilters(): void {
    setCategory("All Plants");
    setSubcategory("All");
    setVariety("All");
    setMinimumPrice("");
    setMaximumPrice("");
    setLight("All");
    setWatering("All");
    setInStockOnly(false);
  }

  return (
    <>
      <div className="shop-catalog-toolbar" id="products">
        <SearchBar value={search} onChange={setSearch} />
        <div className="shop-result-count" aria-live="polite">
          Showing <strong>{visibleProducts.length}</strong> of {products.length} carefully chosen finds
        </div>
      </div>
      <ProductFilters
        category={category}
        subcategory={subcategory}
        variety={variety}
        onCategoryChange={setCategory}
        onSubcategoryChange={setSubcategory}
        onVarietyChange={setVariety}
        sort={sort}
        onSortChange={setSort}
        minimumPrice={minimumPrice}
        maximumPrice={maximumPrice}
        light={light}
        watering={watering}
        lightOptions={lightOptions}
        wateringOptions={wateringOptions}
        inStockOnly={inStockOnly}
        onMinimumPriceChange={setMinimumPrice}
        onMaximumPriceChange={setMaximumPrice}
        onLightChange={setLight}
        onWateringChange={setWatering}
        onInStockOnlyChange={setInStockOnly}
        onResetFilters={resetFilters}
      />
      <div className="shop-product-results">
        <div className="shop-results-heading">
          <h2>{category === "All Plants" ? "The full collection" : category}</h2>
          <span>{visibleProducts.length} {visibleProducts.length === 1 ? "find" : "finds"}</span>
        </div>
        <ProductGrid products={visibleProducts} />
      </div>
    </>
  );
}
