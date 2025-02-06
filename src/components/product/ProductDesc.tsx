import { Category, Product } from "@/lib/types/product.type";
import { capitalize } from "@/lib/utils";
import DescItem from "./DescItem";

export default function ProductDesc({ data }: { data: Product }) {
  const { productType } = data;
  if (productType === "Book") {
    const { _id, author, category, pages, publisher, stock } = data;
    const descData = [
      { name: "Author", value: author },
      { name: "Publisher", value: publisher },
      { name: "Pages", value: pages.toString() },
      { name: "In Stock", value: stock.toString() },
      { name: "Category", value: capitalize((category as Category).name) },
      { name: "Product Code", value: _id.slice(0, 5) },
    ];

    return (
      <div className="w-full mx-auto bg-zinc-100 rounded-xl px-2 py-4 grid grid-cols-2 gap-4 lg:px-4 lg:py-6">
        {descData.map(desc => {
          return <DescItem key={desc.name} name={desc.name} value={desc.value} />
        })}
      </div>
    );
  }

  if (productType === "Stationery") {
    const { _id, brand, color, category, stock } = data;
    const descData = [
      { name: "Brand", value: brand },
      { name: "Color", value: color || "N/A" },
      { name: "In Stock", value: stock.toString() },
      { name: "Category", value: capitalize((category as Category).name) },
      { name: "Product Code", value: _id.slice(0, 5) },
    ];

    return (
      <div className="w-full mx-auto bg-zinc-100 rounded-xl px-2 py-4 grid grid-cols-2 gap-4 lg:px-4 lg:py-6">
        {descData.map(desc => {
          return <DescItem key={desc.name} name={desc.name} value={desc.value} />
        })}
      </div>
    );
  }

  if (productType === "Toy") {
    const { _id, brand, ageRange, category, stock } = data;
    const descData = [
      { name: "Brand", value: brand },
      { name: "Age", value: ageRange },
      { name: "In Stock", value: stock.toString() },
      { name: "Category", value: capitalize((category as Category).name) },
      { name: "Product Code", value: _id.slice(0, 5) },
    ];

    return (
      <div className="w-full mx-auto bg-zinc-100 rounded-xl px-2 py-4 grid grid-cols-2 gap-4 lg:px-4 lg:py-6">
        {descData.map(desc => {
          return <DescItem key={desc.name} name={desc.name} value={desc.value} />
        })}
      </div>
    );
  }
}