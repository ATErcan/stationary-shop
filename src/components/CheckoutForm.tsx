"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { usePaymentInputs } from "react-payment-inputs";
import { useRouter } from "next/navigation";
import { InputMask } from "@react-input/mask";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CheckoutFormValidation } from "@/lib/validation";

export default function CheckoutForm({ price }: { price: string }) {
  console.log(price)
  const router = useRouter();
  const [cardType, setCardType] = useState("");

  const { getCardNumberProps, getCVCProps, meta } = usePaymentInputs();

  const form = useForm<z.infer<typeof CheckoutFormValidation>>({
    resolver: zodResolver(CheckoutFormValidation),
    defaultValues: {
      fullName: "",
      cardNumber: "",
      expiry: "",
      cvc: "",
    },
  });

  async function onSubmit(values: z.infer<typeof CheckoutFormValidation>) {
    try {
      toast.success("Checkout successful!", { id: "checkout-success" });
      router.push("/cart/checkout/success");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during checkout.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 p-6 max-w-lg mx-auto border rounded-lg shadow-lg"
      >
        <h1 className="text-2xl font-semibold">Checkout</h1>
        <h2 className="text-3xl font-semibold">${price}</h2>

        {/* Full Name */}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Card Number */}
        <FormField
          control={form.control}
          name="cardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Card Number</FormLabel>
              <FormControl>
                <Input
                  {...getCardNumberProps({
                    onChange: () => setCardType(meta.cardType || ""),
                  })}
                  {...field}
                  placeholder="1234 5678 9012 3456"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Expiry Date & CVC */}
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="expiry"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Expiry</FormLabel>
                <FormControl>
                  <InputMask
                    mask="MM/YY"
                    replacement={{ M: /\d/, Y: /\d/ }} // Restricts input to numbers
                    showMask
                    separate
                    placeholder="MM/YY"
                    value={field.value}
                    onChange={field.onChange}
                    className="border px-3 py-2 w-full rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cvc"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>CVC</FormLabel>
                <FormControl>
                  <Input {...getCVCProps()} {...field} placeholder="123" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full">
          Complete Order
        </Button>
      </form>
    </Form>
  );
}
