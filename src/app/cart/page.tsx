import { redirect } from "next/navigation";

import { getCart } from "@/lib/tools/api"
import CartInfo from "@/components/cart/CartInfo";

export default async function Cart() {
  const cart = await getCart();

  if(!cart) {
    return redirect('/login')
  }

  if(cart.data.length === 0) {
    return (
      <main className="flex flex-col gap-8 px-2 py-6 sm:items-start sm:px-4">
        <h1 className="self-start text-3xl font-bold w-full lg:max-w-[75rem] mx-auto sm:text-4xl">Cart</h1>
        <p className="text-center text-sm mt-6 self-center sm:text-xl sm:mt-10">- You don't have any products on your cart -</p>
      </main>
    )
  }

  return (
    <main className="flex flex-col gap-8 px-2 py-6 sm:px-4">
      <h1 className="self-start text-3xl font-bold w-full lg:max-w-[75rem] mx-auto sm:text-4xl">Cart</h1>
      <CartInfo cart={cart} />
    </main>
  )
}