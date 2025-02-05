import { notFound } from "next/navigation";
import Image from "next/image";

import AddToCartBtn from "@/components/product/AddToCartBtn";
import ProductDesc from "@/components/product/ProductDesc";
import { getProduct } from "@/lib/tools/api";
import { capitalize, formatAmount } from "@/lib/utils";
import BackBtn from "@/components/BackBtn";

export default async function SingleProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  try {
    const { data } = await getProduct(id);

    const { name, price, images } = data;

    return (
      <main className="px-2 py-4 flex flex-col gap-4 sm:min-h-[calc(100vh-4rem)] sm:flex-row sm:items-center sm:justify-center md:px-5 lg:max-w-[75rem] lg:mx-auto lg:gap-8">
        <div className="flex flex-col gap-4 w-full max-w-96 mx-auto sm:mx-0">
          <BackBtn />
          <div className="w-full aspect-square relative max-w-96 mx-auto sm:mx-0">
            <Image src={images[0]} alt={name} fill priority />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between gap-1 sm:flex-col sm:gap-0">
            <h1
              className="text-2xl font-bold sm:text-3xl"
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                WebkitLineClamp: 2,
                wordBreak: "break-word",
                overflowWrap: "break-word",
              }}
            >
              {capitalize(data.name)}
            </h1>
            <p className="text-2xl font-semibold">{`$${formatAmount(
              price
            )}`}</p>
          </div>
          <div className="flex flex-col gap-4">
            <ProductDesc data={data} />
            <AddToCartBtn id={id} />
          </div>
        </div>
      </main>
    );
  } catch (error) {
    if (
      (error instanceof Error && (error.message === "Product not found" ||
      error.message === "Invalid product ID")
    )) {
      notFound();
    }
    throw error;
  }
}