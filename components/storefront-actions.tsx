"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { demoProducts, formatNaira, getWhatsAppChatUrl, type Product } from "@/lib/products";

type CartLine = { productId: string; quantity: number; size?: string };
const CART_KEY = "2025hub-cart-v1";
const WISHLIST_KEY = "2025hub-wishlist-v1";

function readStorage<T>(key: string, fallback: T): T {
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function ProductActions({ product }: { product: Product }) {
  const [size, setSize] = useState(product.sizes?.[0] ?? "");
  const [saved, setSaved] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    setSaved(readStorage<string[]>(WISHLIST_KEY, []).includes(product.id));
  }, [product.id]);

  function toggleWishlist() {
    const list = readStorage<string[]>(WISHLIST_KEY, []);
    const next = list.includes(product.id) ? list.filter((id) => id !== product.id) : [...list, product.id];
    window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(next));
    setSaved(next.includes(product.id));
    setNotice(next.includes(product.id) ? "Saved to your wishlist." : "Removed from wishlist.");
  }

  function addToCart() {
    const cart = readStorage<CartLine[]>(CART_KEY, []);
    const existing = cart.find((line) => line.productId === product.id && line.size === size);
    const next = existing
      ? cart.map((line) => line === existing ? { ...line, quantity: line.quantity + 1 } : line)
      : [...cart, { productId: product.id, quantity: 1, ...(size ? { size } : {}) }];
    window.localStorage.setItem(CART_KEY, JSON.stringify(next));
    setNotice("Added to bag. Demo listing — confirm availability with the vendor.");
  }

  return (
    <div className="space-y-4">
      {product.sizes?.length ? (
        <label className="block text-sm font-medium">
          Select size
          <select className="input mt-2" value={size} onChange={(event) => setSize(event.target.value)}>
            {product.sizes.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
      ) : null}
      <div className="flex gap-3">
        <button onClick={addToCart} className="btn-primary flex-1"><ShoppingBag size={18} /> Add to bag</button>
        <button onClick={toggleWishlist} aria-label={saved ? "Remove from wishlist" : "Add to wishlist"} className={`icon-button ${saved ? "bg-accent" : ""}`}><Heart size={19} fill={saved ? "currentColor" : "none"} /></button>
      </div>
      {notice ? <p role="status" className="text-sm text-muted">{notice}</p> : null}
    </div>
  );
}

export function CartPanel() {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setCart(readStorage<CartLine[]>(CART_KEY, []));
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, ready]);

  const lines = cart.map((line) => ({ ...line, product: demoProducts.find((product) => product.id === line.productId) }))
    .filter((line): line is CartLine & { product: Product } => Boolean(line.product));
  const total = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);

  function update(line: CartLine, delta: number) {
    setCart((current) => current.map((item) => item.productId === line.productId && item.size === line.size
      ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  }

  if (!ready) return <div className="panel p-6">Loading your bag…</div>;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
      <section className="space-y-3">
        {lines.length ? lines.map((line) => (
          <article key={line.productId + line.size} className="panel flex gap-4 p-4 sm:p-5">
            <img src={line.product.image} alt="" className="h-24 w-20 rounded-xl object-cover sm:h-28 sm:w-24" />
            <div className="min-w-0 flex-1">
              <a href={`/store/2025hub/product/${line.product.id}`} className="font-semibold hover:underline">{line.product.name}</a>
              <p className="mt-1 text-sm text-muted">{line.size ? `Size ${line.size} · ` : ""}{formatNaira(line.product.price)}</p>
              <span className="mt-2 inline-block rounded-full bg-amber-50 px-2 py-1 text-xs text-amber-800">Demo listing</span>
              <div className="mt-3 flex items-center gap-3">
                <button className="quantity-button" onClick={() => update(line, -1)} aria-label="Decrease quantity"><Minus size={14} /></button>
                <span className="text-sm font-semibold">{line.quantity}</span>
                <button className="quantity-button" onClick={() => update(line, 1)} aria-label="Increase quantity"><Plus size={14} /></button>
                <button className="ml-2 text-muted hover:text-red-600" onClick={() => setCart((current) => current.filter((item) => !(item.productId === line.productId && item.size === line.size)))} aria-label="Remove item"><Trash2 size={16} /></button>
              </div>
            </div>
            <p className="text-sm font-semibold">{formatNaira(line.product.price * line.quantity)}</p>
          </article>
        )) : (
          <div className="panel px-6 py-14 text-center">
            <ShoppingBag className="mx-auto mb-4 text-muted" size={32} />
            <h2 className="text-lg font-semibold">Your bag is taking a breather.</h2>
            <p className="mt-2 text-sm text-muted">Browse the collection and add something you like.</p>
            <Link href="/store/2025hub" className="btn-primary mx-auto mt-5">Explore collection</Link>
          </div>
        )}
      </section>
      <aside className="panel h-fit p-6">
        <h2 className="text-lg font-semibold">Order summary</h2>
        <div className="mt-5 flex justify-between text-sm"><span className="text-muted">Subtotal</span><span>{formatNaira(total)}</span></div>
        <div className="mt-3 flex justify-between text-sm"><span className="text-muted">Delivery</span><span>Confirm with vendor</span></div>
        <div className="my-5 border-t border-black/10" />
        <div className="flex justify-between font-semibold"><span>Estimated subtotal</span><span>{formatNaira(total)}</span></div>
        <p className="mt-4 rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-900">Sample listings and prices only. This prototype does not reserve stock, create a database order, or accept payment.</p>
        <Link href="/checkout" aria-disabled={!lines.length} className={`btn-primary mt-5 w-full ${!lines.length ? "pointer-events-none opacity-50" : ""}`}>Continue to checkout</Link>
      </aside>
    </div>
  );
}

export function WishlistPanel() {
  const [ids, setIds] = useState<string[]>([]);
  useEffect(() => setIds(readStorage<string[]>(WISHLIST_KEY, [])), []);
  const products = demoProducts.filter((product) => ids.includes(product.id));
  return (
    <div>
      {products.length ? <div className="product-grid">{products.map((product) => (
        <article className="product-card" key={product.id}>
          <a href={`/store/2025hub/product/${product.id}`}><img src={product.image} alt={product.name} className="product-image" /></a>
          <div className="p-4"><p className="text-xs text-muted">{product.category}</p><a className="mt-1 block font-semibold" href={`/store/2025hub/product/${product.id}`}>{product.name}</a><p className="mt-2 font-semibold">{formatNaira(product.price)}</p><button className="mt-4 text-sm underline" onClick={() => { const next = ids.filter((id) => id !== product.id); setIds(next); window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(next)); }}>Remove</button></div>
        </article>
      ))}</div> : <div className="panel p-10 text-center"><Heart className="mx-auto mb-3 text-muted" /><h2 className="font-semibold">Your wishlist is empty</h2><p className="mt-2 text-sm text-muted">Save pieces you want to come back to.</p><Link href="/store/2025hub" className="btn-primary mx-auto mt-5">Browse products</Link></div>}
    </div>
  );
}