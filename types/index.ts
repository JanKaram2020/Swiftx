type Currency = {
  label: string;
  symbol: string;
};
type Price = {
  currency: Currency;
  amount: number;
};

type Attribute = {
  displayValue: string;
  value: string;
  id: string;
};

type AttributeSet = {
  id: string;
  name: string;
  type: string;
  items: [Attribute];
};

export type Product = {
  id: string;
  name: string;
  inStock: boolean;
  gallery: [string];
  description: string;
  category: string;
  attributes: [AttributeSet];
  prices: [Price];
  brand: string;
};
export type Products = Product[];
export type Category = {
  name: string;
  products: [Product];
};
export type Categories = Category[];
