import { API_NAMESPACE, MOCK_API_URL, makeServer } from "../index.js";
import { collectionToArray } from "./mirage.types.js";

const server = makeServer({ environment: "development" });
const db = server.schema.db as unknown as {
  stores: unknown;
  products: unknown;
};
const stores = collectionToArray(db.stores).length;
const products = collectionToArray(db.products).length;

console.log("Mock API pronta.");
console.log("Base URL:", MOCK_API_URL);
console.log("Namespace:", server.namespace || API_NAMESPACE);
console.log("Endpoints:");
console.log(`  GET    ${MOCK_API_URL}/api/stores`);
console.log(`  POST   ${MOCK_API_URL}/api/stores`);
console.log(`  PATCH  ${MOCK_API_URL}/api/stores/:id`);
console.log(`  DELETE ${MOCK_API_URL}/api/stores/:id`);
console.log(`  GET    ${MOCK_API_URL}/api/products`);
console.log(`  POST   ${MOCK_API_URL}/api/products`);
console.log(`  PATCH  ${MOCK_API_URL}/api/products/:id`);
console.log(`  DELETE ${MOCK_API_URL}/api/products/:id`);
console.log("Seed carregada:");
console.log(`  stores: ${stores}`);
console.log(`  products: ${products}`);

server.shutdown();
