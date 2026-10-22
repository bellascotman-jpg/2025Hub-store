import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "2025Hub — Your style. Your next find.",
  description: "Discover fashion and accessories at 2025Hub. Browse the collection, save your favourites and contact the store directly.",
  applicationName: "2025Hub Store"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}