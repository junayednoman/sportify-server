export type TProduct = {
  name: string;
  category: string;
  quantity: number;
  brand: string;
  price: number;
  description?: string;
  image: string;
  rating: string;
  tag?: string;
  discount?: number;
  isDeleted: boolean;
};
