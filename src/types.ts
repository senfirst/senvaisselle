export interface Product {
  id: string;
  ref: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  discountPercentage?: number;
  shortDescription: string;
  detailedDescription: string;
  material: string;
  color: string;
  dimensions: string;
  stock: number;
  isAvailable: boolean;
  isFeatured: boolean;
  isPromo: boolean;
  isNew: boolean;
  dateAdded: string;
  images: string[]; // array of image URLs or base64 strings
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

export interface ShopInfo {
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  aboutText: string;
  bannerMessage: string;
}
