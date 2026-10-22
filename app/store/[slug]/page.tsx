import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Instagram, MapPin, Search, ShoppingBag } from "lucide-react";
import { demoProducts, getStoreConfig } from "@/lib/products";
import { CatalogBrowser } from "@/components/catalog-browser";

export default async function StorePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const store = getStoreConfig();
  if (slug !== store.slug) {
    return <main className="container-shell py-24"><h1 className="text-3xl font-black">Store not found</h1><p className="mt-3 text-muted">This store URL is not registered in the current prototype.</p><Link className="btn-primary mt-6" href="/">Return home</Link></main>;
  }
  return <main className="min-h-screen">
    <div className="bg-ink py-2 text-center text-[10px] font-bold uppercase tracking-[.18em] text-white">Prototype store · Verify listings before purchase</div>
    <header className="container-shell flex h-[72px] items-center justify-between"><Link href="/" className="text-xl font-black tracking-[-.07em]">2025<span className="ml-1 rounded bg-accent px-1.5 py-1">HUB</span></Link><div className="flex items-center gap-2"><Link href="/wishlist" className="btn-secondary !min-h-10 !px-3 text-xs">Wishlist</Link><Link href="/cart" className="btn-primary !min-h-10 !px-3 text-xs"><ShoppingBag size={15}/> Bag</Link></div></header>
    <section className="container-shell pb-9 pt-8"><div className="relative overflow-hidden rounded-[28px] bg-[#ded8ce] sm:rounded-[34px]"><img src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1800&q=85" alt="Clothing racks in a fashion store" className="absolute inset-0 h-full w-full object-cover"/><div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/10"/><div className="relative max-w-2xl px-6 py-16 text-white sm:px-12 sm:py-24"><div className="eyebrow !border-white/35 !text-white"><span className="h-2 w-2 rounded-full bg-accent"/> {store.location}</div><h1 className="mt-6 text-5xl font-black leading-[.95] tracking-[-.07em] sm:text-7xl">{store.name}<br/><span className="text-accent">Second-hand. First choice.</span></h1><p className="mt-5 max-w-lg text-sm leading-6 text-white/80 sm:text-base">{store.description} Explore the sample collection below. Product information and prices are not yet verified by the vendor.</p><div className="mt-7 flex flex-wrap gap-3"><a href={store.instagram} target="_blank" rel="noreferrer" className="btn-primary !bg-accent !text-ink"><Instagram size={16}/> Follow on Instagram</a><span className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 text-xs"><MapPin size={14}/> Lagos, Nigeria</span></div></div></div></section>
    <section className="container-shell pb-20 pt-6">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.2em] text-muted">The catalogue</p>
          <h2 className="mt-2 text-3xl font-black tracking-[-.06em] sm:text-4xl">Shop the edit</h2>
          <p className="mt-2 text-sm text-muted">Sample product layouts · not confirmed inventory</p>
        </div>
        <span className="rounded-full bg-accent px-4 py-2 text-xs font-bold">Made for mobile shopping</span>
      </div>
      <CatalogBrowser products={demoProducts} storeSlug={slug} />
      <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
        <strong>Before ordering:</strong> This prototype does not track live stock. Sample product names, photos and prices are illustrative. Confirm actual item condition, measurements, availability, delivery and final price with 2025Hub before paying.
      </div>
      <Link href="/" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-ink"><ArrowLeft size={16}/> Back to home</Link>
    </section>
  </main>;
}