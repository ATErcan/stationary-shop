import CheckoutForm from "@/components/CheckoutForm";

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const price = (await searchParams).price;

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex justify-center items-center">
      <CheckoutForm price={price as string} />
    </div>
  );
}
