export type Product = {
  id: number; code: string; name: string; category: string; color: string;
  sizes: string[]; stock: number; price: number; collection: string;
};

export const products: Product[] = [
  { id: 1, code: 'WCS-2108', name: 'Washed Utility Jacket', category: 'Jackets', color: 'Vintage Black', sizes: ['S','M','L','XL'], stock: 42, price: 49, collection: 'Core Edit' },
  { id: 2, code: 'WCS-1773', name: 'Relaxed Carpenter Denim', category: 'Denim', color: 'Stone Blue', sizes: ['30','32','34','36','38'], stock: 68, price: 36, collection: 'Denim Lab' },
  { id: 3, code: 'WCS-2090', name: 'Oversized Graphic Sweat', category: 'Sweats', color: 'Washed Grey', sizes: ['S','M','L','XL'], stock: 31, price: 29, collection: 'Urban Forms' },
  { id: 4, code: 'WCS-6920', name: 'Straight Fit Denim', category: 'Denim', color: 'Deep Indigo', sizes: ['30','32','34','36','38'], stock: 74, price: 34, collection: 'Denim Lab' },
  { id: 5, code: 'WCS-1751', name: 'Structured Overshirt', category: 'Shirts', color: 'Olive', sizes: ['S','M','L','XL'], stock: 18, price: 32, collection: 'Core Edit' },
  { id: 6, code: 'WCS-1957', name: 'Minimal Heavyweight Sweat', category: 'Sweats', color: 'Off White', sizes: ['S','M','L','XL'], stock: 55, price: 27, collection: 'Urban Forms' }
];
