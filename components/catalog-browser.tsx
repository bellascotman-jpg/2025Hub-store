"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search, SlidersHorizontal, X } from "lucide-react";
import { formatNaira, type Product } from "@/lib/products";

type SortOption = "featured" | "price-low" | "price-high" | "name";

export function CatalogBrowser({ products, storeSlug }: { products: Product[]; storeSlug: string }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All items");
  const [sort, setSort] = useState<SortOption>("featured");

  const categories = useMemo(
    () => ["All items", ...Array.from(new Set(products.map((product) => product.category)))],
    [products]
  );

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const matchesCategory = category === "All items" || product.category === category;
      const searchable = [product.name, product.category, product.description].join(" ").toLowerCase();
      return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery));
    });

    if (sort === "price-low") return [...filtered].sort((a, b) => a.price - b.price);
    if (sort === "price-high") return [...filtered].sort((a, b) => b.price - a.price);
    if (sort === "name") return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    return filtered;
  }, [products, query, category, sort]);

  return (
    <div>
      <div className="panel p-4 sm:p-5">
        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_210px]">
          <label className="relative block">
            <span className="sr-only">Search products</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
            <input
              className="input !rounded-full !pl-11"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search pieces, categories…"
            />
            {query ? <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 hover:bg-black/5"><X size={15} /></button> : null}
          </label>
          <label className="relative block">
            <span className="sr-only">Sort products</span>
            <SlidersHorizontal className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={16} />
            <select className="input !rounded-full !pl-10" value={sort} onChange={(event) => setSort(event.target.value as SortOption)}>
              <option value="featured">Featured order</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </label>
        </div>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1" aria-label="Filter by category">
          {categories.map((item) => (
            <button key={item} type="button" onClick={() => setCategory(item)} aria-pressed={category === item}
              className={`shrink-0 rounded-full border px-4 py-2.5 text-xs font-semibold transition ${category === item ? "border-ink bg-ink text-white" : "border-black/10 bg-white text-muted hover:border-black/30 hover:text-ink"}`}>
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 text-sm">
        <p className="text-muted">{visibleProducts.length} {visibleProducts.length === 1 ? "piece" : "pieces"} found</p>
        {(query || category !== "All items" || sort !== "featured") ? (
          <button type="button" className="font-semibold underline underline-offset-4" onClick={() => { setQuery(""); setCategory("All items"); setSort("featured"); }}>Reset filters</button>
        ) : null}
      </div>

      {visibleProducts.length ? (
        <div className="product-grid mt-4">
          {visibleProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <Link href={`/store/${storeSlug}/product/${product.id}`} className="relative block">
                <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
                <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider">{product.category}</span>
              </Link>
              <div className="p-4 sm:p-5">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <Link href={`/store/${storeSlug}/product/${product.id}`} className="font-semibold tracking-tight hover:underline">{product.name}</Link>
                    <p className="mt-1 text-xs text-muted">Sample listing · confirm stock</p>
                  </div>
                  <span className="whitespace-nowrap text-sm font-bold">{formatNaira(product.price)}</span>
                </div>
                <Link href={`/store/${storeSlug}/product/${product.id}`} className="mt-4 flex items-center justify-between border-t border-black/10 pt-3 text-xs font-bold">
                  View details <ArrowUpRight size={15} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="panel mt-5 px-6 py-14 text-center">
          <Search className="mx-auto mb-4 text-muted" size={30} />
          <h3 className="text-lg font-semibold">No pieces match that search.</h3>
          <p className="mt-2 text-sm text-muted">Try another keyword or choose a different category.</p>
          <button type="button" className="btn-primary mx-auto mt-5" onClick={() => { setQuery(""); setCategory("All items"); }}>Show all pieces</button>
        </div>
      )}
    </div>
  );
}
