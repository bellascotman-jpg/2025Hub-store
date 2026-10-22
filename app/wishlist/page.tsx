import Link from "next/link";
import { ArrowLeft, Heart } from "lucide-react";
import { WishlistPanel } from "@/components/storefront-actions";

export default function WishlistPage() {
  return <main className="min-h-screen pb-20"><header className="container-shell flex h-[72px] items-center justify-between"><Link href="/" className="text-xl font-black tracking-[-.07em]">2025<span className="ml-1 rounded bg-accent px-1.5 py-1">HUB</span></Link><span className="flex items-center gap-2 text-sm text-muted"><Heart size={17}/> Wishlist</span></header><section className="container-shell pt-7"><Link href="/store/2025hub" className="inline-flex items-center gap-2 text-sm text-muted"><ArrowLeft size={16}/> Back to collection</Link><h1 className="mt-5 text-4xl font-black tracking-[-.06em] sm:text-5xl">Your saved finds.</h1><p className="mt-3 mb-8 text-sm text-muted">Wishlist items are saved in this browser on this device.</p><WishlistPanel/></section></main>;
}