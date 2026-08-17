import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SESSION_COOKIE = "acentics_session";

function secretKey() {
  return new TextEncoder().encode(process.env.SESSION_SECRET);
}

export async function proxy(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(SESSION_COOKIE)?.value;

  let session = null;
  if (token) {
    try {
      const { payload } = await jwtVerify(token, secretKey());
      session = payload;
    } catch {
      session = null;
    }
  }

  if (pathname.startsWith("/dashboard") && !session) {
    const url = new URL("/login", request.url);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if ((pathname === "/login" || pathname === "/register") && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
