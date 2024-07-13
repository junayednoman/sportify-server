export type TProduct = {
  name: string;
  category: string;
  quantity: number;
  brand: string;
  price: number;
  description?: string;
  image: string;
  tag?: string;
  discount?: string;
  isDeleted: boolean;
};
