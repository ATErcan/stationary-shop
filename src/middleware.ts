import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getCookie } from "./lib/tools/cookies";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const res = NextResponse.next();

  const token = await getCookie(process.env.NEXT_PUBLIC_TOKEN_NAME!);
  const pathNames = pathname.split("/");
  console.log(pathNames)

  if (
    (pathNames[1] === "login" && token) ||
    (pathNames[1] === "signup" && token)
  ) {
    const url = new URL(`/`, req.url);
    return NextResponse.redirect(url);
  }
  if (!["login", "signup"].includes(pathNames[1]) && !token) {
    const url = new URL(`/login`, req.url);
    return NextResponse.redirect(url);
  }

  return res;
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/profile",
    "/bag/thank-you/:path*",
    "/auth/:path*",
  ],
};
