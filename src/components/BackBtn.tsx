'use client';

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function BackBtn() {
  const router = useRouter();
  const goBack = () => router.back();
  return (
    <div
      className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center cursor-pointer"
      onClick={goBack}
    >
      <ArrowLeftIcon className="size-6" />
    </div>
  ); 
}