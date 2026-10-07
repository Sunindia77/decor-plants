"use client";

import { shopCategories } from "@/data/categories";
import type { ProductCategory } from "@/types/product";

export type ProductCategoryFilter = "All Plants" | ProductCategory;
export type ProductSort = "featured" | "price-asc" | "price-desc" | "rating" | "newest";

interface ProductFiltersProps {
  category: ProductCategoryFilter;
  subcategory: string;
  variety: string;
  onCategoryChange: (category: ProductCategoryFilter) => void;
  onSubcategoryChange: (subcategory: string) => void;
  onVarietyChange: (variety: string) => void;
  sort: ProductSort;
  onSortChange: (sort: ProductSort) => void;
}

const categoryFilters: ProductCategoryFilter[] = [
  "All Plants",
  ...shopCategories.map((category) => category.label),
];

export default function ProductFilters({
  category,
  subcategory,
  variety,
  onCategoryChange,
  onSubcategoryChange,
  onVarietyChange,
  sort,
  onSortChange,
}: ProductFiltersProps) {
  const selectedCategory = shopCategories.find((item) => item.label === category);
  const selectedSubcategory = selectedCategory?.subcategories.find((item) => item.label === subcategory);

  return (
    <div className="shop-category-section" id="categories">
      <div className="shop-category-header">
        <div>
          <span className="shop-eyebrow">FIND YOUR GREEN</span>
          <h2>Shop by category</h2>
        </div>
        <label className="shop-sort-field">
          <span>Sort by</span>
          <select value={sort} onChange={(event) => onSortChange(event.target.value as ProductSort)}>
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest</option>
          </select>
        </label>
      </div>
      <div className="shop-category-chips" role="group" aria-label="Product categories">
        {categoryFilters.map((item) => (
          <button
            key={item}
            className={category === item ? "is-selected" : ""}
            type="button"
            aria-pressed={category === item}
            onClick={() => {
              onCategoryChange(item);
              onSubcategoryChange("All");
              onVarietyChange("All");
            }}
          >
            {item}
          </button>
        ))}
      </div>
      {selectedCategory && (
        <div className="shop-subcategory-filter">
          <span className="shop-subcategory-label">Shop {selectedCategory.label}:</span>
          <div className="shop-category-chips" role="group" aria-label={`${selectedCategory.label} subcategories`}>
            <button
              className={subcategory === "All" ? "is-selected" : ""}
              type="button"
              aria-pressed={subcategory === "All"}
              onClick={() => {
                onSubcategoryChange("All");
                onVarietyChange("All");
              }}
            >
              All {selectedCategory.label}
            </button>
            {selectedCategory.subcategories.map((item) => (
              <button
                key={item.label}
                className={subcategory === item.label ? "is-selected" : ""}
                type="button"
                aria-pressed={subcategory === item.label}
                onClick={() => {
                  onSubcategoryChange(item.label);
                  onVarietyChange("All");
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
      {selectedSubcategory?.children && subcategory !== "All" && (
        <div className="shop-subcategory-filter shop-variety-filter">
          <span className="shop-subcategory-label">Shop {selectedSubcategory.label} varieties:</span>
          <div className="shop-category-chips" role="group" aria-label={`${selectedSubcategory.label} varieties`}>
            <button
              className={variety === "All" ? "is-selected" : ""}
              type="button"
              aria-pressed={variety === "All"}
              onClick={() => onVarietyChange("All")}
            >
              All {selectedSubcategory.label}
            </button>
            {selectedSubcategory.children.map((item) => (
              <button
                key={item.label}
                className={variety === item.label ? "is-selected" : ""}
                type="button"
                aria-pressed={variety === item.label}
                onClick={() => onVarietyChange(item.label)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
