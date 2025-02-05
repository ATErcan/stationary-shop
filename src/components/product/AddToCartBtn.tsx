'use client';

import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";
import { Button } from "../ui/button";

export default function AddToCartBtn({ id }: { id: string }) {
  const { user } = useAuth();

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please login to add a product to your cart.", {
        id: "add-error",
      });
    }
  };

  return <Button onClick={handleAddToCart}>Add to Cart</Button>;
}