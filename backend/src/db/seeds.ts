import type { Product } from "../contracts/product.types.js";
import type { Store } from "../contracts/store.types.js";

const seedStoreIds = {
  central: "store-central",
  norte: "store-norte",
  sul: "store-sul",
} as const;

export const initialStores: Store[] = [
  {
    id: seedStoreIds.central,
    name: "Loja Centro",
    address: "Rua das Flores, 123",
  },
  {
    id: seedStoreIds.norte,
    name: "Loja Norte",
    address: "Avenida Brasil, 900",
  },
  {
    id: seedStoreIds.sul,
    name: "Loja Sul",
    address: "Rua do Comercio, 45",
  },
];

export const initialProducts: Product[] = [
  {
    id: "product-1",
    storeId: seedStoreIds.central,
    name: "Camiseta Basica",
    category: "Vestuarios",
    price: 59.9,
  },
  {
    id: "product-2",
    storeId: seedStoreIds.central,
    name: "Calca Jeans",
    category: "Vestuarios",
    price: 129.9,
  },
  {
    id: "product-3",
    storeId: seedStoreIds.norte,
    name: "Mouse Sem Fio",
    category: "Eletronicos",
    price: 89.9,
  },
  {
    id: "product-4",
    storeId: seedStoreIds.sul,
    name: "Fone Bluetooth",
    category: "Eletronicos",
    price: 149.9,
  },
];
