import Link from "next/link";
import { ArrowLeft, CheckCircle2, Instagram, MapPin, ShieldAlert } from "lucide-react";
import { ProductActions } from "@/components/storefront-actions";
import { demoProducts, formatNaira, getStoreConfig } from "@/lib/products";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return demoProducts.map((product) => ({ slug: "2025hub", id: product.id }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string; id: string }> }) {
  const { slug, id } = await params;
  const store = getStoreConfig();
  const product = demoProducts.find((item) => item.id === id);
  if (slug !== store.slug || !product) notFound();
  return <main className="min-h-screen pb-16">
    <header className="container-shell flex h-[72px] items-center justify-between"><Link href="/" className="text-xl font-black tracking-[-.07em]">2025<span className="ml-1 rounded bg-accent px-1.5 py-1">HUB</span></Link><Link href="/cart" className="text-sm font-semibold underline underline-offset-4">View bag</Link></header>
    <div className="container-shell"><Link href={`/store/${slug}`} className="mb-6 inline-flex items-center gap-2 text-sm text-muted"><ArrowLeft size={16}/> Back to collection</Link>
      <div className="grid gap-8 md:grid-cols-2 md:gap-12">
        <div className="overflow-hidden rounded-[26px] bg-[#e9e5dc]"><img src={product.image} alt={product.name} className="h-full max-h-[680px] min-h-[390px] w-full object-cover"/></div>
        <div className="py-2 sm:py-5"><span className="eyebrow">{product.category} / SAMPLE LISTING</span><h1 className="mt-5 text-4xl font-black leading-tight tracking-[-.06em] sm:text-5xl">{product.name}</h1><p className="mt-4 text-2xl font-bold">{formatNaira(product.price)}</p><p className="mt-6 text-sm leading-7 text-muted">{product.description}</p><div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4"><div className="flex items-start gap-3"><ShieldAlert className="mt-0.5 shrink-0 text-amber-800" size={19}/><div><p className="text-sm font-bold text-amber-950">Availability not verified</p><p className="mt-1 text-xs leading-5 text-amber-900">This is sample catalogue content. The seller must confirm real stock, exact item condition, measurements and final price.</p></div></div></div><div className="mt-6"><ProductActions product={product}/></div><div className="mt-8 space-y-3 border-t border-black/10 pt-6"><div className="flex items-center gap-3 text-sm"><CheckCircle2 size={17} className="text-muted"/><span>Ask the seller to confirm before payment</span></div><div className="flex items-center gap-3 text-sm"><MapPin size={17} className="text-muted"/><span>Lagos, Nigeria</span></div><a href={store.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm underline underline-offset-4"><Instagram size={17}/> View seller's Instagram</a></div></div>
      </div>
    </div>
  </main>;
}