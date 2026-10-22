import Link from "next/link";

export default function NotFound() {
  return <main className="container-shell flex min-h-[70vh] flex-col items-start justify-center"><p className="text-xs font-bold uppercase tracking-[.2em] text-muted">404 / Not found</p><h1 className="mt-3 text-4xl font-black tracking-[-.06em] sm:text-6xl">That page wandered off.</h1><p className="mt-4 max-w-md text-sm leading-6 text-muted">The page or product may not exist in this prototype yet.</p><Link href="/" className="btn-primary mt-7">Back to homepage</Link></main>;
}