import { Product } from "../product.type";

export interface IProductResponse {
  data: Product;
}

export interface IAllProductsResponse {
  page: number;
  totalPages: number;
  totalProducts: number;
  pageSize: number;
  data: Product[];
}