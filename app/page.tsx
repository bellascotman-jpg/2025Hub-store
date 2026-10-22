import Link from "next/link";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Check, Heart, Instagram, Leaf, Search, ShieldCheck, ShoppingBag, Sparkles, Truck } from "lucide-react";
import { demoProducts, formatNaira, getStoreConfig } from "@/lib/products";

const features = [
  { icon: ShoppingBag, title: "A store that feels like you", copy: "A clean, branded shopping experience designed for customers on their phones." },
  { icon: Heart, title: "Save the good finds", copy: "Customers can keep a wishlist and return to their favourites later." },
  { icon: Truck, title: "Clear next steps", copy: "A simple route from product discovery to a WhatsApp conversation with the seller." }
];

export default function HomePage() {
  const store = getStoreConfig();
  return (
    <main className="overflow-hidden">
      <div className="bg-ink py-2 text-center text-[10px] font-semibold uppercase tracking-[.2em] text-white sm:text-xs">A better way to shop small · Made for mobile</div>
      <header className="container-shell flex h-[76px] items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-black tracking-[-.07em]">2025<span className="rounded-md bg-accent px-1.5 py-1">HUB</span></Link>
        <nav className="hidden items-center gap-7 text-sm text-muted md:flex"><a href="#story">Our point of view</a><a href="#benefits">Why shop here</a><Link href="/store/2025hub">Shop the demo</Link></nav>
        <div className="flex items-center gap-2"><Link href="/wishlist" aria-label="Wishlist" className="icon-button !h-10 !w-10"><Heart size={18}/></Link><Link href="/cart" aria-label="Shopping bag" className="icon-button !h-10 !w-10"><ShoppingBag size={18}/></Link></div>
      </header>

      <section className="container-shell grid items-center gap-10 pb-16 pt-8 md:grid-cols-[1.03fr_.97fr] md:pb-24 md:pt-10">
        <div className="relative z-10 py-3 md:py-12">
          <div className="eyebrow"><Sparkles size={13}/> Curated finds, fresh stories</div>
          <h1 className="mt-6 max-w-2xl text-[clamp(3.2rem,8vw,6.8rem)] font-black leading-[.91] tracking-[-.085em]">Good finds.<br/><span className="relative inline-block">Better second<span className="relative ml-2 inline-block">lives.<svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 240 14" fill="none" aria-hidden="true"><path d="M4 9C62 2 160 2 235 8" stroke="#C4EE51" strokeWidth="8" strokeLinecap="round"/></svg></span></span></h1>
          <p className="mt-7 max-w-lg text-base leading-7 text-muted sm:text-lg sm:leading-8">Discover expressive second-hand style, without the endless scrolling. A concept storefront for 2025Hub, built around easy browsing and a direct line to the seller.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Link href="/store/2025hub" className="btn-primary">Explore the collection <ArrowRight size={17}/></Link><a href={store.instagram} target="_blank" rel="noreferrer" className="btn-secondary">Visit Instagram <Instagram size={16}/></a></div>
          <div className="mt-9 flex items-center gap-4 border-t border-black/10 pt-6"><div className="flex -space-x-2">{["#D7FF64","#E9B6A7","#D8D3C6"].map((color,i)=><span key={color} className="h-8 w-8 rounded-full border-2 border-paper" style={{background:color}}>{i===0?"✳":i===1?"↗":"◌"}</span>)}</div><p className="text-xs leading-5 text-muted">A prototype storefront<br/><span className="font-semibold text-ink">Sample listings need vendor confirmation</span></p></div>
        </div>
        <div className="relative mx-auto w-full max-w-[540px]">
          <div className="absolute -right-8 top-10 h-36 w-36 rounded-full bg-accent/80 blur-3xl"/>
          <div className="relative grid grid-cols-[1fr_.82fr] items-center gap-3 sm:gap-4">
            <div className="overflow-hidden rounded-[28px] bg-[#e7e2d8] shadow-soft"><img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85" alt="Fashion shoppers browsing a clothing rack" className="h-[330px] w-full object-cover sm:h-[470px]"/><div className="bg-white p-4 sm:p-5"><p className="text-[10px] font-bold uppercase tracking-[.18em] text-muted">The edit</p><p className="mt-1 text-lg font-bold tracking-tight">Wear it your way.</p></div></div>
            <div className="space-y-3 pt-14 sm:space-y-4 sm:pt-20"><div className="overflow-hidden rounded-[25px] bg-[#ded8ce]"><img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=700&q=85" alt="Contemporary streetwear inspiration" className="h-[210px] w-full object-cover sm:h-[290px]"/></div><div className="rounded-[25px] bg-accent p-4 sm:p-5"><Leaf size={22}/><p className="mt-5 text-xl font-black leading-tight tracking-tight sm:text-2xl">Style with<br/>another story.</p><ArrowDownRight className="mt-3" size={20}/></div></div>
          </div>
          <div className="absolute -bottom-4 left-3 rounded-full border border-black/10 bg-white px-4 py-3 text-xs font-semibold shadow-soft sm:left-6"><span className="mr-2 inline-block h-2 w-2 rounded-full bg-lime-500"/> Designed for phone-first shopping</div>
        </div>
      </section>

      <section id="story" className="bg-white py-5"><div className="container-shell flex flex-wrap items-center justify-between gap-3 py-4 text-xs font-bold uppercase tracking-[.14em] text-muted sm:text-sm"><span>Thoughtful finds</span><span className="text-black/20">✳</span><span>Personal style</span><span className="text-black/20">✳</span><span>Direct seller contact</span><span className="text-black/20">✳</span><span>Less waste, more wear</span></div></section>

      <section className="container-shell py-20 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-5"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-muted">The first edit</p><h2 className="mt-3 text-4xl font-black tracking-[-.06em] sm:text-5xl">Pieces with potential.</h2><p className="mt-3 max-w-lg text-sm leading-6 text-muted">These sample cards show how products will look. Items, pricing and availability are illustrative until 2025Hub verifies its real catalogue.</p></div><Link href="/store/2025hub" className="group inline-flex items-center gap-2 text-sm font-bold">Browse all products <ArrowUpRight size={17} className="transition group-hover:translate-x-1 group-hover:-translate-y-1"/></Link></div>
        <div className="product-grid mt-9">{demoProducts.map((product,index)=><article className="product-card" key={product.id}><Link href={`/store/2025hub/product/${product.id}`} className="relative block"><img src={product.image} alt={product.name} className="product-image"/><span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider">{product.category}</span></Link><div className="p-4 sm:p-5"><div className="flex items-start justify-between gap-2"><div><Link href={`/store/2025hub/product/${product.id}`} className="font-semibold tracking-tight hover:underline">{product.name}</Link><p className="mt-1 text-xs text-muted">Illustrative listing</p></div><span className="whitespace-nowrap text-sm font-bold">{formatNaira(product.price)}</span></div><Link href={`/store/2025hub/product/${product.id}`} className="mt-4 flex items-center justify-between border-t border-black/10 pt-3 text-xs font-bold">View details <ArrowUpRight size={15}/></Link></div></article>)}</div>
      </section>

      <section id="benefits" className="bg-[#e9e6dd] py-20 sm:py-24"><div className="container-shell"><div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[.2em] text-muted">A more human way to shop</p><h2 className="mt-3 text-4xl font-black leading-tight tracking-[-.06em] sm:text-5xl">Shopping should feel simple. And personal.</h2></div><div className="mt-10 grid gap-4 md:grid-cols-3">{features.map(({icon:Icon,title,copy},i)=><div key={title} className="rounded-[22px] bg-white p-6 sm:p-7"><div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent"><Icon size={20}/></div><p className="mt-8 text-xs font-bold text-muted">0{i+1} / THE EXPERIENCE</p><h3 className="mt-2 text-xl font-bold tracking-tight">{title}</h3><p className="mt-3 text-sm leading-6 text-muted">{copy}</p></div>)}</div></div></section>

      <section className="container-shell py-20 sm:py-28"><div className="relative overflow-hidden rounded-[30px] bg-ink px-6 py-12 text-white sm:px-12 sm:py-16"><div className="absolute -right-10 -top-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl"/><div className="relative max-w-2xl"><div className="eyebrow !border-white/20 !text-white"><ShieldCheck size={14}/> Browse with clarity</div><h2 className="mt-6 text-4xl font-black tracking-[-.06em] sm:text-6xl">Found your next favourite?</h2><p className="mt-4 max-w-xl text-sm leading-7 text-white/65 sm:text-base">Explore the prototype catalogue, save pieces, and prepare an enquiry. The seller must confirm availability and the final price before any purchase.</p><Link href="/store/2025hub" className="btn-primary mt-7 !border-accent !bg-accent !text-ink">Shop the demo <ArrowRight size={17}/></Link></div></div></section>

      <footer className="border-t border-black/10 bg-paper"><div className="container-shell flex flex-col gap-5 py-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between"><Link href="/" className="text-lg font-black tracking-[-.07em] text-ink">2025<span className="ml-1 rounded bg-accent px-1 py-0.5">HUB</span></Link><p>Storefront prototype · Lagos, Nigeria</p><div className="flex gap-5"><Link href="/store/2025hub">Shop</Link><Link href="/cart">Bag</Link><Link href="/wishlist">Wishlist</Link></div></div></footer>
    </main>
  );
}