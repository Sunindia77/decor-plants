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
}

export default function ShopCatalog({ products, initialSearch = "" }: ShopCatalogProps) {
  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState<ProductCategoryFilter>("All Plants");
  const [subcategory, setSubcategory] = useState("All");
  const [variety, setVariety] = useState("All");
  const [sort, setSort] = useState<ProductSort>("featured");

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("en");
    const selectedCategory = shopCategories.find((item) => item.label === category);
    const selectedSubcategory = selectedCategory?.subcategories.find((item) => item.label === subcategory);
    const selectedVariety = selectedSubcategory?.children?.find((item) => item.label === variety);
    const filtered = products.filter((product) => {
      const matchesCategory = category === "All Plants" || product.category === category;
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
      return matchesCategory && matchesSubcategory && matchesVariety && matchesSearch;
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
  }, [category, products, search, sort, subcategory, variety]);

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
      />
      <ProductGrid products={visibleProducts} />
    </>
  );
}
