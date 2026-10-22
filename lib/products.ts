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
    name: "Everyday Classic Shirt",
    category: "Tops",
    price: 8500,
    description: "A versatile wardrobe staple for effortless everyday styling. Confirm exact colour, measurements and availability with 2025Hub before ordering.",
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=85",
    badge: "Demo listing",
    sizes: ["S", "M", "L", "XL"],
    status: "illustrative"
  },
  {
    id: "thrift-002",
    name: "Essential Denim",
    category: "Bottoms",
    price: 12000,
    description: "An easy-to-style denim essential for relaxed everyday looks. Confirm the wash, measurements and availability with 2025Hub before ordering.",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=85",
    badge: "Demo listing",
    sizes: ["28", "30", "32", "34"],
    status: "illustrative"
  },
  {
    id: "thrift-003",
    name: "Everyday Shoulder Bag",
    category: "Accessories",
    price: 7000,
    description: "A compact finishing touch designed to complement a range of looks. Confirm colour, dimensions and availability before ordering.",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85",
    badge: "Demo listing",
    status: "illustrative"
  },
  {
    id: "thrift-004",
    name: "Statement Sneakers",
    category: "Shoes",
    price: 15000,
    description: "A standout footwear option for everyday rotation. Confirm size, condition and availability before ordering.",
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
    tagline: "Your style. Your next find.",
    description: "Discover standout pieces, everyday essentials and accessories chosen to make getting dressed feel effortless.",
    location: "Lagos, Nigeria",
    whatsapp: process.env.NEXT_PUBLIC_DEMO_WHATSAPP_NUMBER ?? "",
    instagram: "https://www.instagram.com/2025hub/"
  };
}
/** Build a safe click-to-chat URL. WhatsApp requires an international number without the leading plus sign. */
export function getWhatsAppChatUrl(phone: string, message: string) {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return "";
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
