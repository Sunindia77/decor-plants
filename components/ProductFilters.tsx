"use client";

import { shopCategories } from "@/data/categories";
import type { ProductCategory } from "@/types/product";

export type ProductCategoryFilter = "All Plants" | ProductCategory | "Air Purifying Plants" | "Low Maintenance";
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
  minimumPrice: number | "";
  maximumPrice: number | "";
  light: string;
  watering: string;
  lightOptions: string[];
  wateringOptions: string[];
  inStockOnly: boolean;
  onMinimumPriceChange: (price: number | "") => void;
  onMaximumPriceChange: (price: number | "") => void;
  onLightChange: (light: string) => void;
  onWateringChange: (watering: string) => void;
  onInStockOnlyChange: (onlyAvailable: boolean) => void;
  onResetFilters: () => void;
}

const categoryFilters: ProductCategoryFilter[] = [
  "All Plants",
  ...shopCategories.map((category) => category.label),
  "Air Purifying Plants",
  "Low Maintenance",
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
  minimumPrice,
  maximumPrice,
  light,
  watering,
  lightOptions,
  wateringOptions,
  inStockOnly,
  onMinimumPriceChange,
  onMaximumPriceChange,
  onLightChange,
  onWateringChange,
  onInStockOnlyChange,
  onResetFilters,
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
      <details className="shop-refine-panel">
        <summary><i className="bi bi-sliders" aria-hidden="true" /> Refine your search</summary>
        <div className="shop-refine-controls">
          <fieldset className="shop-price-fields">
            <legend>Price range</legend>
            <label>
              <span>Minimum price</span>
              <span className="shop-price-input">
                <span aria-hidden="true">₹</span>
                <input
                  aria-label="Minimum price in rupees"
                  type="number"
                  min="0"
                  step="50"
                  value={minimumPrice}
                  onChange={(event) =>
                    onMinimumPriceChange(event.target.value === "" ? "" : Number(event.target.value))
                  }
                />
              </span>
            </label>
            <label>
              <span>Maximum price</span>
              <span className="shop-price-input">
                <span aria-hidden="true">₹</span>
                <input
                  aria-label="Maximum price in rupees"
                  type="number"
                  min="0"
                  step="50"
                  value={maximumPrice}
                  onChange={(event) =>
                    onMaximumPriceChange(event.target.value === "" ? "" : Number(event.target.value))
                  }
                />
              </span>
            </label>
          </fieldset>
          <label className="shop-refine-select">
            <span>Light requirement</span>
            <select value={light} onChange={(event) => onLightChange(event.target.value)}>
              <option value="All">Any light</option>
              {lightOptions.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </label>
          <label className="shop-refine-select">
            <span>Watering needs</span>
            <select value={watering} onChange={(event) => onWateringChange(event.target.value)}>
              <option value="All">Any watering</option>
              {wateringOptions.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </label>
          <label className="shop-stock-filter">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(event) => onInStockOnlyChange(event.target.checked)}
            />
            In stock only
          </label>
          <button className="shop-reset-filters" type="button" onClick={onResetFilters}>
            Clear filters
          </button>
        </div>
      </details>
    </div>
  );
}
