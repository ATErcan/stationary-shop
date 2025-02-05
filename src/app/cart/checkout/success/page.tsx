import { Button } from "@/components/ui/button";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function CheckoutSuccess() {
  return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex justify-center items-center">
      <div className="space-y-4 p-6 max-w-lg mx-auto border rounded-lg shadow-lg flex flex-col items-center">
        <CheckCircleIcon className="size-16" color="green" />
        <h1 className="text-3xl font-semibold text-center">Checkout Success</h1>
        <p className="text-center">
          We have received your order. It will be delivered within 7 business
          days.
        </p>
        <Button className="w-full p-0">
          <Link
            href={"/"}
            className="w-full h-full py-2 px-4 rounded-lg"
          >
            Home
          </Link>
        </Button>
      </div>
    </div>
  );
}