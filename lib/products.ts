export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  badge?: string;
  sizes?: string[];
  status: "illustrative" | "verified";
};

export const demoProducts: Product[] = [
  {
    id: "thrift-001",
    name: "Everyday vintage shirt",
    category: "Tops",
    price: 8500,
    description: "A sample listing layout for a curated second-hand shirt. Confirm condition, size and availability with the vendor before ordering.",
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=85",
    badge: "Demo listing",
    sizes: ["S", "M", "L", "XL"],
    status: "illustrative"
  },
  {
    id: "thrift-002",
    name: "Relaxed-fit denim",
    category: "Bottoms",
    price: 12000,
    description: "Illustrative denim listing. Actual wash, measurements, condition and stock have not yet been confirmed by 2025Hub.",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=85",
    badge: "Demo listing",
    sizes: ["28", "30", "32", "34"],
    status: "illustrative"
  },
  {
    id: "thrift-003",
    name: "Minimal shoulder bag",
    category: "Accessories",
    price: 7000,
    description: "A placeholder product to demonstrate the catalogue. Ask the vendor to confirm measurements, condition and availability.",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85",
    badge: "Demo listing",
    status: "illustrative"
  },
  {
    id: "thrift-004",
    name: "Classic everyday sneakers",
    category: "Shoes",
    price: 15000,
    description: "Illustrative listing only; no real stock or brand authenticity is being claimed.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
    badge: "Demo listing",
    sizes: ["39", "40", "41", "42", "43", "44"],
    status: "illustrative"
  }
];

export const formatNaira = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0
  }).format(amount);

export function getStoreConfig() {
  return {
    name: "2025Hub",
    slug: "2025hub",
    tagline: "Good finds. Better second lives.",
    description: "A curated thrift-store storefront concept for Lagos, Nigeria.",
    location: "Lagos, Nigeria",
    whatsapp: process.env.NEXT_PUBLIC_DEMO_WHATSAPP_NUMBER ?? "",
    instagram: "https://www.instagram.com/2025hub/"
  };
}