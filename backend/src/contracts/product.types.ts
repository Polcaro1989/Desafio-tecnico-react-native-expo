export interface Product {
  id: string;
  storeId: string;
  name: string;
  category: string;
  price: number;
}

export interface CreateProductInput {
  storeId: string;
  name: string;
  category: string;
  price: number;
}

export interface UpdateProductInput {
  name?: string;
  category?: string;
  price?: number;
}
