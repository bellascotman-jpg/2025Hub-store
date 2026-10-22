"use client";

import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, MessageCircle, ShieldAlert } from "lucide-react";
import { demoProducts, formatNaira, getWhatsAppChatUrl, type Product } from "@/lib/products";

type CartLine = { productId: string; quantity: number; size?: string };
const CART_KEY = "2025hub-cart-v1";

function readCart(): CartLine[] {
  try {
    const value = window.localStorage.getItem(CART_KEY);
    const parsed: unknown = value ? JSON.parse(value) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((line): line is CartLine =>
      typeof line === "object" && line !== null &&
      typeof line.productId === "string" &&
      Number.isInteger(line.quantity) && line.quantity > 0 &&
      (line.size === undefined || typeof line.size === "string")
    );
  } catch {
    return [];
  }
}

export function CheckoutForm() {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [fulfilment, setFulfilment] = useState<"delivery" | "pickup">("delivery");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Lagos");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setCart(readCart());
    setReady(true);
  }, []);

  const lines = useMemo(() => cart.map((line) => ({
    ...line,
    product: demoProducts.find((product) => product.id === line.productId)
  })).filter((line): line is CartLine & { product: Product } => Boolean(line.product)), [cart]);
  const total = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);

  function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (!lines.length) {
      setMessage("Your bag is empty. Add a product before continuing.");
      return;
    }
    if (fulfilment === "delivery" && !address.trim()) {
      setMessage("Enter a delivery address or choose pickup.");
      return;
    }

    const whatsappNumber = process.env.NEXT_PUBLIC_DEMO_WHATSAPP_NUMBER ?? "";
    const orderMessage = [
      "Hello 2025Hub, I would like to enquire about an order.",
      "",
      "CUSTOMER DETAILS",
      `Name: ${customerName.trim()}`,
      `Phone: ${phone.trim()}`,
      ...(email.trim() ? [`Email: ${email.trim()}`] : []),
      `Fulfilment: ${fulfilment === "delivery" ? "Delivery" : "Pickup / collection"}`,
      ...(fulfilment === "delivery" ? [`Delivery address: ${address.trim()}`, `City/area: ${city.trim()}`] : []),
      "",
      "ITEMS REQUESTED",
      ...lines.map((line) => `- ${line.product.name}${line.size ? ` (Size: ${line.size})` : ""} × ${line.quantity} — ${formatNaira(line.product.price * line.quantity)}`),
      `Illustrative subtotal: ${formatNaira(total)}`,
      "",
      ...(notes.trim() ? [`Customer note: ${notes.trim()}`, ""] : []),
      "Please confirm item availability, condition, measurements, final price, delivery fee and payment instructions before I pay.",
      "I understand the catalogue prices are illustrative until confirmed by the seller."
    ].join("\n");

    const url = getWhatsAppChatUrl(whatsappNumber, orderMessage);
    if (!url) {
      setMessage("WhatsApp is not connected yet. The store owner must add the verified WhatsApp number in Cloudflare's environment variables.");
      return;
    }

    window.open(url, "_blank", "noopener,noreferrer");
    setMessage("WhatsApp opened with your enquiry prepared. Review the message and tap Send in WhatsApp. This prototype does not save an order or process payment.");
  }

  if (!ready) return <div className="panel p-6">Loading checkout…</div>;

  if (!lines.length) {
    return <div className="panel p-8 text-center"><h2 className="text-xl font-bold">Your bag is empty</h2><p className="mt-2 text-sm text-muted">Add something from the catalogue before checkout.</p><Link href="/store/2025hub" className="btn-primary mx-auto mt-5">Browse the store</Link></div>;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
      <form className="panel space-y-6 p-5 sm:p-7" onSubmit={submitOrder}>
        <div><p className="text-xs font-bold uppercase tracking-[.18em] text-muted">Contact information</p><h2 className="mt-2 text-xl font-bold">Who is placing this enquiry?</h2></div>
        <label className="block text-sm font-medium">Full name <span className="text-red-600">*</span><input className="input mt-2" autoComplete="name" required minLength={2} maxLength={100} value={customerName} onChange={(event) => setCustomerName(event.target.value)} placeholder="Your name"/></label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium">Phone / WhatsApp <span className="text-red-600">*</span><input className="input mt-2" autoComplete="tel" type="tel" required minLength={7} maxLength={25} value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="e.g. 080…"/></label>
          <label className="block text-sm font-medium">Email (optional)<input className="input mt-2" autoComplete="email" type="email" maxLength={254} value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com"/></label>
        </div>

        <div className="border-t border-black/10 pt-6"><p className="text-xs font-bold uppercase tracking-[.18em] text-muted">Fulfilment</p><h2 className="mt-2 text-xl font-bold">How would you like to receive it?</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <label className={`cursor-pointer rounded-2xl border p-4 ${fulfilment === "delivery" ? "border-ink bg-[#f2f0e8]" : "border-black/10"}`}><input className="mr-2 accent-black" type="radio" name="fulfilment" value="delivery" checked={fulfilment === "delivery"} onChange={() => setFulfilment("delivery")}/> <span className="font-semibold">Delivery</span><p className="mt-2 text-xs leading-5 text-muted">Seller will confirm delivery fee and timing.</p></label>
            <label className={`cursor-pointer rounded-2xl border p-4 ${fulfilment === "pickup" ? "border-ink bg-[#f2f0e8]" : "border-black/10"}`}><input className="mr-2 accent-black" type="radio" name="fulfilment" value="pickup" checked={fulfilment === "pickup"} onChange={() => setFulfilment("pickup")}/> <span className="font-semibold">Pickup / collection</span><p className="mt-2 text-xs leading-5 text-muted">Arrange a collection point with the seller.</p></label>
          </div>
        </div>

        {fulfilment === "delivery" ? <div className="grid gap-4 sm:grid-cols-2"><label className="block text-sm font-medium sm:col-span-2">Delivery address <span className="text-red-600">*</span><textarea className="input mt-2 !h-24 !py-3" autoComplete="street-address" required maxLength={500} value={address} onChange={(event) => setAddress(event.target.value)} placeholder="Street, building, landmark"/></label><label className="block text-sm font-medium">City / area<input className="input mt-2" autoComplete="address-level2" required maxLength={100} value={city} onChange={(event) => setCity(event.target.value)} placeholder="e.g. Yaba, Lagos"/></label></div> : null}

        <label className="block text-sm font-medium">Order note (optional)<textarea className="input mt-2 !h-24 !py-3" maxLength={500} value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Sizing questions or delivery instructions"/></label>
        <div className="rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-950"><ShieldAlert className="mr-2 inline" size={17}/><strong>Prototype checkout:</strong> this sends an enquiry to WhatsApp only. It does not reserve stock, store an order in a database, or take payment.</div>
        <button type="submit" className="btn-primary w-full"><MessageCircle size={18}/> Prepare order in WhatsApp</button>
        {message ? <p role="status" className="rounded-xl border border-black/10 p-3 text-sm leading-6">{message}</p> : null}
        <Link href="/cart" className="inline-flex items-center gap-2 text-sm font-semibold text-muted"><ArrowLeft size={15}/> Return to bag</Link>
      </form>

      <aside className="panel h-fit p-5 sm:p-6"><h2 className="text-lg font-bold">Your items</h2><div className="mt-5 space-y-4">{lines.map((line) => <div key={line.productId + line.size} className="flex gap-3"><img src={line.product.image} alt="" className="h-20 w-16 rounded-xl object-cover"/><div className="min-w-0 flex-1"><p className="text-sm font-semibold">{line.product.name}</p><p className="mt-1 text-xs text-muted">{line.size ? `Size ${line.size} · ` : ""}Qty {line.quantity}</p></div><p className="whitespace-nowrap text-sm font-semibold">{formatNaira(line.product.price * line.quantity)}</p></div>)}</div><div className="my-5 border-t border-black/10"/><div className="flex justify-between text-sm"><span className="text-muted">Illustrative subtotal</span><strong>{formatNaira(total)}</strong></div><p className="mt-3 text-xs leading-5 text-muted">Delivery and final prices must be confirmed by the seller. No payment is collected on this page.</p></aside>
    </div>
  );
}
