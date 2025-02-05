'use client';

import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";
import { Button } from "../ui/button";
import { updateCart } from "@/lib/tools/api";

export default function AddToCartBtn({ id }: { id: string }) {
  const { user } = useAuth();

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please login to add a product to your cart.", {
        id: "add-error",
      });
    } else {
      await updateCart({ productId: id, quantity: 1 })
      toast.success("Product added to your cart", { id: "add-to-cart" })
    }
  };

  return <Button onClick={handleAddToCart}>Add to Cart</Button>;
}