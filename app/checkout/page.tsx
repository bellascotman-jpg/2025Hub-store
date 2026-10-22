import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { CheckoutForm } from "@/components/checkout-form";

export default function CheckoutPage() {
  return (
    <main className="min-h-screen pb-20">
      <header className="container-shell flex h-[72px] items-center justify-between">
        <Link href="/" className="text-xl font-black tracking-[-.07em]">2025<span className="ml-1 rounded bg-accent px-1.5 py-1">HUB</span></Link>
        <span className="flex items-center gap-2 text-sm text-muted"><ShoppingBag size={17}/> Checkout enquiry</span>
      </header>
      <section className="container-shell pt-7">
        <Link href="/store/2025hub" className="inline-flex items-center gap-2 text-sm text-muted"><ArrowLeft size={16}/> Continue browsing</Link>
        <p className="mt-7 text-xs font-bold uppercase tracking-[.18em] text-muted">Almost there</p>
        <h1 className="mt-2 text-4xl font-black tracking-[-.06em] sm:text-5xl">Checkout.</h1>
        <p className="mb-8 mt-3 max-w-2xl text-sm leading-6 text-muted">Share your contact and fulfilment details. We will prepare a WhatsApp message for the seller so they can confirm availability, delivery and final pricing.</p>
        <CheckoutForm />
      </section>
    </main>
  );
}
