"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import type { categories, products } from "@/lib/catalogue";

type Product = (typeof products)[number];
type Category = (typeof categories)[number];

export function ProductBrowser({ items, groups }: { items: Product[]; groups: Category[] }) {
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const category = searchParams.get("category") || "all";
  const [sort, setSort] = useState("featured");

  function changeCategory(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") params.delete("category");
    else params.set("category", value);
    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
  }

  const filtered = useMemo(() => {
    const result = items.filter((product) => {
      const matchesCategory = category === "all" || product.categorySlug === category;
      const matchesQuery = `${product.name} ${product.category}`.toLowerCase().includes(query.toLowerCase().trim());
      return matchesCategory && matchesQuery;
    });
    if (sort === "az") result.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "za") result.sort((a, b) => b.name.localeCompare(a.name));
    return result;
  }, [category, items, query, sort]);

  return (
    <div className="product-browser">
      <div className="browser-controls">
        <label className="search-field">
          <Search size={17} />
          <span className="visually-hidden">Search products</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products or ingredients" />
        </label>
        <label className="filter-field">
          <SlidersHorizontal size={15} />
          <span className="visually-hidden">Filter by category</span>
          <select value={category} onChange={(event) => changeCategory(event.target.value)}>
            <option value="all">All categories</option>
            {groups.map((group) => <option value={group.slug} key={group.slug}>{group.name}</option>)}
          </select>
        </label>
        <label className="filter-field sort-field">
          <span className="visually-hidden">Sort products</span>
          <select value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="featured">Featured order</option>
            <option value="az">Name A–Z</option>
            <option value="za">Name Z–A</option>
          </select>
        </label>
      </div>
      <p className="results-count">{filtered.length} products in this collection</p>
      {filtered.length ? (
        <div className="card-grid products-grid">
          {filtered.map((product) => <ProductCard key={product.slug} product={product} />)}
        </div>
      ) : (
        <div className="empty-results">
          <span className="eyebrow">NO MATCHES FOUND</span>
          <p>Try a different product name or category.</p>
        </div>
      )}
    </div>
  );
}
