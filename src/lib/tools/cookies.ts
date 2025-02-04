'use server';

import { cookies } from "next/headers";


export async function setCookie(name: string, value: string) {
  const cookieStore = await cookies();
  cookieStore.set({
    name,
    value,
    secure: true,
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60,
  });
}

export async function getCookie(name: string) {
  const cookieStore = await cookies();
  return cookieStore.get(name);
}

export async function deleteCookie(name: string) {
  (await cookies()).delete("name");
}