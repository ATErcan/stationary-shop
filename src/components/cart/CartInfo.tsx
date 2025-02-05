import { useMemo } from "react";

import { ICartResponse } from "@/lib/types/responses/cart.type";
import CartItem from "./CartItem";
import { formatAmount } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";

const SHIPPING = 20;

export default function CartInfo({ cart }: { cart: ICartResponse }) {
  const subtotal = useMemo(() => {
    return cart.data
      .map((item) => item.quantity * item.product.price)
      .reduce((price, sum) => price + sum);
  }, [cart])

  return (
    <div className="flex flex-col gap-3 w-full lg:flex-row lg:gap-8 lg:max-w-[75rem] lg:mx-auto">
      <div className="flex flex-col w-full gap-2 max-w-[75rem] sm:gap-4">
        {cart.data.map((item) => (
          <CartItem key={item.product._id} data={item} />
        ))}
      </div>
      <div className="flex flex-col gap-2 w-full max-w-[75rem] mx-auto lg:gap-4">
        <h3 className="font-bold text-2xl mt-2 sm:text-3xl lg:mt-0">Summary</h3>
        <div className="flex justify-between items-center font-medium sm:text-lg">
          <p>Subtotal</p>
          <p>${formatAmount(subtotal)}</p>
        </div>
        <div className="flex justify-between items-center font-medium sm:text-lg">
          <p>Shipping</p>
          <p>${SHIPPING}</p>
        </div>
        <hr />
        <div className="flex justify-between items-center font-medium sm:text-lg">
          <p>Total</p>
          <p>${formatAmount(subtotal + SHIPPING)}</p>
        </div>
        <Button className="w-full p-0">
          <Link
            href={{
              pathname: "/cart/checkout",
              query: { price: formatAmount(subtotal + SHIPPING) },
            }}
            className="w-full h-full py-2 px-4 rounded-lg"
          >
            Checkout
          </Link>
        </Button>
      </div>
    </div>
  );
}