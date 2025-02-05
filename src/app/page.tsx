import ProductCard from "@/components/product/ProductCard";
import { getAllProducts } from "@/lib/tools/api";

export default async function Home() {
  const products = await getAllProducts({ limit: 16 });

  // TODO: fetch more
  return (
    <div>
      <main className="flex flex-col gap-8 px-4 py-6 sm:items-start">
        <h1 className="self-start text-3xl font-bold w-full lg:max-w-[75rem] mx-auto sm:text-4xl">Products</h1>
        <div className="grid grid-cols-2 gap-y-4 gap-x-2 max-w-[75rem] mx-auto sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.data.map(product => {
            return <ProductCard key={product._id} data={product} />
          })}
        </div>
      </main>
    </div>
  );
}
