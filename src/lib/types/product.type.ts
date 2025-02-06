import { APIResponse } from "./global.type";

export interface Category extends APIResponse {
  _id: string;
  name: string;
}

export type Image = string;

export interface BaseProduct extends APIResponse {
  _id: string;
  name: string;
  category: Category | string;
  price: number;
  images: Image[];
  stock: number;
}

export interface Stationery extends BaseProduct {
  productType: "Stationery";
  color?: string;
  brand: string;
}

export interface Book extends BaseProduct {
  productType: "Book";
  author: string;
  publisher: string;
  pages: number;
}

export interface Toy extends BaseProduct {
  productType: "Toy";
  ageRange: string;
  brand: string;
}

export type Product = Stationery | Book | Toy;

export interface ProductQueryParams {
  search?: string;
  category?: string;
  sort?: string;
  page?: number;
  limit?: number;
}