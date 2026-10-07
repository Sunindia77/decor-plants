"use client";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className="shop-search-field">
      <i className="bi bi-search" aria-hidden="true" />
      <span className="visually-hidden">Search plants and gardening products</span>
      <input
        type="search"
        placeholder="Search plants, planters, gardening products..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {value && (
        <button type="button" aria-label="Clear search" onClick={() => onChange("")}>
          <i className="bi bi-x-lg" aria-hidden="true" />
        </button>
      )}
    </label>
  );
}
