import Image from "next/image";
import Link from "next/link";

import { capitalize, formatAmount } from "@/lib/utils";
import { Book, Product, Stationery, Toy } from "@/lib/types/product.type";
import { textOverflowEllipsis } from "@/styles/common";

export default function ProductCard({ data }: { data: Product }) {
  const { _id, name, price, images, productType, ...product } = data;
  const thumbnail = images[0];
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="w-full aspect-square relative">
        <Image src={thumbnail} alt={name} fill className="object-cover" priority />
      </div>
      <Link href={`/products/${_id}`} className="flex flex-col">
        <div className="flex justify-between gap-1 sm:gap-2">
          <h2 className="text-sm font-semibold sm:text-lg" style={textOverflowEllipsis.singleLine}>{capitalize(name)}</h2>
          <h3 className="text-sm font-semibold sm:text-lg">{`$${formatAmount(price)}`}</h3>
        </div>
        <div>
          <h4 className="text-xs sm:text-sm">
            {productType === "Book"
              ? (product as Book).author
              : (product as Stationery | Toy).brand}
          </h4>
        </div>
      </Link>
    </div>
  );
}