import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // if user is signed in and the current path is / redirect the user to /account
  if (user) {
    // return NextResponse.redirect(new URL("/account", req.url));
    console.log("u r signed in");
  }

  // if user is not signed in and the current path is not / redirect the user to /
  if (!user) {
    // return NextResponse.redirect(new URL("/", req.url));
    console.log("u r NOT signed in");
  }

  return res;
}

export const config = {
  matcher: ["/", "/account"],
};
