import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { ProductQueryParams } from "./types/product.type";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalize(title: string) {
  return title.split(" ").map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`).join(" ");
}   

export function formatDecimalSeparator(whole: string) {
  let result = "";
  let digits = 0;
  for (let i = whole.length - 1; i >= 0; i--) {
    result = whole[i] + result;

    if (++digits % 3 === 0 && i > 0) {
      result = "." + result;
    }
  }
  return result;
}

export function formatAmount(subtotal: number) {
  const decimalAmount = `${subtotal}`;
  const [whole, fraction] = decimalAmount.split(".");
  const wholeFormatted = formatDecimalSeparator(whole);
  if (decimalAmount.includes(".")) {
    return `${wholeFormatted},${fraction}`;
  } else {
    return `${wholeFormatted},00`;
  }
}

export function buildParams(params: ProductQueryParams): string {
  return new URLSearchParams(
    Object.entries(params).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null) {
        acc[key] = String(value);
      }
      return acc;
    }, {} as Record<string, string>)
  ).toString();
}