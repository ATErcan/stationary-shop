import Image from "next/image";

import { capitalize, formatAmount } from "@/lib/utils";
import { CartItem as CartItemType } from "@/lib/types/cart.type";
import { textOverflowEllipsis } from "@/styles/common";
import QuantityButtons from "./QuantityButtons";

export default function CartItem({ data }: { data: CartItemType }) {
  const {
    quantity,
    product: { _id ,name, price, images, stock },
  } = data;

  return (
    <div className="flex gap-2 max-w-[40rem]">
      <div className="relative w-24 aspect-square flex flex-shrink-0 sm:w-32">
        <Image src={images[0]} alt={name} fill priority />
      </div>
      <div className="flex flex-col justify-between w-full sm:py-1">
        <div className="flex justify-between gap-1">
          <h1 className="font-bold w-[calc(100vw-11rem)] sm:text-lg sm:w-[calc(100vw-16rem)]" style={textOverflowEllipsis.singleLine}>{capitalize(name)}</h1>
          <p className="sm:text-lg">{`$${formatAmount(price)}`}</p>
        </div>
        <div className="flex justify-between sm:text-lg">
          <div className="flex gap-1 items-center">
            <p className="font-semibold">In Stock:</p>
            <p>{stock}</p>
          </div>
          <QuantityButtons id={_id} quantity={quantity} stock={stock} />
        </div>
      </div>
    </div>
  );
}