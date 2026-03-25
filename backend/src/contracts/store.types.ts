export interface Store {
  id: string;
  name: string;
  address: string;
}

export interface CreateStoreInput {
  name: string;
  address: string;
}

export interface UpdateStoreInput {
  name?: string;
  address?: string;
}

export interface StoreResponse extends Store {
  productCount: number;
}
