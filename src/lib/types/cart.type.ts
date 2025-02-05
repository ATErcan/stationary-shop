import { APIResponse } from "./global.type";
import { Product } from "./product.type";

export interface CartItem extends APIResponse {
  product: Product;
  quantity: number;
}

export interface UpdatedCartItem extends APIResponse {
  _id: string;
  product: string;
  quantity: number;
}