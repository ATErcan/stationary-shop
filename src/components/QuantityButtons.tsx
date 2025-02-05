'use client';

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import debounce from "lodash.debounce";
import toast from "react-hot-toast";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

import { updateCart } from "@/lib/tools/api";

export default function QuantityButtons({
  id,
  quantity,
  stock
}: {
  id: string;
  quantity: number;
  stock: number;
}) {
  const router = useRouter();
  const [localQuantity, setLocalQuantity] = useState(quantity);
  const [isUpdating, setIsUpdating] = useState(false);

  const debouncedUpdateCart = useCallback(
    debounce(async (newQuantity: number) => {
      if (newQuantity > 0 && newQuantity <= stock) {
        setIsUpdating(true);
        await updateCart({ productId: id, quantity: newQuantity });
        setIsUpdating(false);
        router.refresh(); // Refresh page to reflect updated cart
        toast.success("Cart updated!", { id: "cart-update" })
      }
    }, 500),
    [id, stock]
  );

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > stock) return;
    setLocalQuantity(newQuantity);
    debouncedUpdateCart(newQuantity);
  };

  const removeItem = async () => {
    await updateCart({ productId: id, quantity: 0 });
    router.refresh();
    toast.success("Product removed from your cart!", { id: "remove-product" });
  }

  return (
    <div className="flex gap-1 items-center">
      <button
        type="button"
        className="w-6 h-6 rounded-full flex items-center justify-center bg-zinc-200 disabled:opacity-50"
        onClick={() => handleQuantityChange(localQuantity - 1)}
        disabled={localQuantity <= 1 || isUpdating}
      >
        <MinusIcon className="size-4" />
      </button>
      <p className="text-center">{isUpdating ? ".." : localQuantity}</p>
      <button
        type="button"
        className="w-6 h-6 rounded-full flex items-center justify-center bg-zinc-200 disabled:opacity-50"
        onClick={() => handleQuantityChange(localQuantity + 1)}
        disabled={localQuantity >= stock || isUpdating}
      >
        <PlusIcon className="size-4" />
      </button>
      <button
        className="w-6 h-6 rounded-full flex items-center justify-center"
        onClick={() => removeItem()}
        disabled={isUpdating}
      >
        <TrashIcon className="size-4" />
      </button>
    </div>
  );
}