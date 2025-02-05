import { CartItem, UpdatedCartItem } from "../cart.type"

export interface ICartResponse {
  page: number;
  totalPages: number;
  totalItemsInCart: number;
  pageSize: number;
  data: CartItem[]
}

export interface IUpdatedCartResponse {
  data: UpdatedCartItem[];
}