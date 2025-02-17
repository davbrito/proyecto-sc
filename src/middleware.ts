import { withAuth } from "next-auth/middleware";
import { type ROLE } from "@prisma/client";
import { NextResponse } from "next/server";
import { match } from "path-to-regexp";

const profileMatch = match("/profile/:path*");
const consejoComunalInforMatch = match("/consejo-comunal/:id?");
const consejoComunalMatch = match("/consejo-comunal");
const registerMatch = match("/register");
const censoMatch = match(
  "/consejo-comunal/:id/censo/:tab(create|estadisticas)?"
);
const censoJefeMatch = match("/consejo-comunal/:id/censo/:jefeId");

const isLiderCalleRoutes = (url: string) => {
    
  if(match("/")) return true
  if (profileMatch(url)) return true;
  if (consejoComunalInforMatch(url)) return true;
  if (consejoComunalMatch(url)) return true;
  if (censoMatch(url)) return true;
  if (censoJefeMatch(url)) return true;
  if (registerMatch(url)) return true;

  return false;
};

const isLiderComunidadRoutes = (url: string) => {
  if (consejoComunalMatch(url)) return true;
  if (registerMatch(url)) return true;

  return false;
};

export default withAuth(
  async function middleware(req) {
    const token = req.nextauth.token;
    if (!token) return null;

    const { role_user, consejoComunalId } = token;
    const { pathname } = req.nextUrl;

    if (role_user === "ADMIN") return null;
    console.log(role_user,isLiderCalleRoutes(pathname))
    if (!isLiderCalleRoutes(pathname) && role_user === "LIDER_CALLE") {
      return NextResponse.redirect(new URL(`/`, req.url));
    }

    if (isLiderComunidadRoutes(pathname) && role_user === "LIDER_COMUNIDAD") {
      return NextResponse.redirect(new URL(`/`, req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        return !!token;
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: [
    "/",
    "/register",
    "/consejo-comunal",
    "/consejo-comunal/:path*",
    "/consejo-comunal/(.*)",
    "/consejo-comunal/:id",
    "/consejo-comunal/:id/censo",
    "/consejo-comunal/:id/censo/create",
    "/consejo-comunal/:id/censo/estadisticas",
    "/consejo-comunal/:id/censo/:jefeId",
    "/profile/:path*",
  ],
};
