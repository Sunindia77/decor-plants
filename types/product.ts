export type ProductCategory =
  | "Indoor Plants"
  | "Outdoor Plants"
  | "Planters"
  | "Plant Combos"
  | "Plant Care";

export type ProductSubcategory =
  | "Aglaonema Plants"
  | "Money Plants"
  | "Dieffenbachia Plants"
  | "Monstera Plants"
  | "Asplenium Nidus Plants"
  | "New Flowering Plants"
  | "Flowering Plants"
  | "Philodendron Plants"
  | "Radermachera Plants"
  | "Schefflera Plants"
  | "Brassia Orchids"
  | "Palm Plants"
  | "Hosta Plants"
  | "Pachira Plants"
  | "Corporate Plant Gifts"
  | "Other Indoor Plants"
  | "Outdoor Foliage Plants"
  | "Ceramic Planters"
  | "Indoor Plant Combos"
  | "Plant Care Services";

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: ProductCategory;
  subcategory: ProductSubcategory;
  tags: string[];
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  stock: number;
  badge?: string;
  featured?: boolean;
  addedAt: string;
  light: string;
  watering: string;
  height: string;
  potSize: string;
  careInstructions: string[];
}

export interface CartItem {
  productId: string;
  quantity: number;
}
