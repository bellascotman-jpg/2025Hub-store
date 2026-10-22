import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "2025Hub — Good finds. Better second lives.",
  description: "A mobile-first thrift storefront concept for 2025Hub in Lagos, Nigeria.",
  applicationName: "2025Hub Store"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}