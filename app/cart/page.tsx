import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { CartPanel } from "@/components/storefront-actions";

export default function CartPage() {
  return <main className="min-h-screen pb-20"><header className="container-shell flex h-[72px] items-center justify-between"><Link href="/" className="text-xl font-black tracking-[-.07em]">2025<span className="ml-1 rounded bg-accent px-1.5 py-1">HUB</span></Link><span className="flex items-center gap-2 text-sm text-muted"><ShoppingBag size={17}/> Your bag</span></header><section className="container-shell pt-7"><Link href="/store/2025hub" className="inline-flex items-center gap-2 text-sm text-muted"><ArrowLeft size={16}/> Continue browsing</Link><h1 className="mt-5 text-4xl font-black tracking-[-.06em] sm:text-5xl">Your bag.</h1><p className="mt-3 mb-8 text-sm text-muted">Review your sample items before preparing an enquiry.</p><CartPanel/></section></main>;
}