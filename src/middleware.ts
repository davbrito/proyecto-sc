import { withAuth } from "next-auth/middleware";
import { type ROLE } from "@prisma/client";
import { NextResponse } from "next/server";

const isLiderCalleRoutes = (url: string) => {
  if (
    (url.startsWith("/consejo-comunal") &&
      (url.endsWith("/censo") ||
        url.endsWith("/censo/create") ||
        url.endsWith("/censo/estadisticas") ||
        url.match(/^\/consejo-comunal\/([^\/]+)\/censo\/([^\/]+)$/))) ||
    url.startsWith("/profile")
  )
    return true;

  return false;
};

const isLiderComunidadRoutes = (url: string) => {
  if (url.match(/^\/consejo-comunal\/[^\/]+$/)) return true;

  return false;
};

export default withAuth(
  async function middleware(req) {
    console.log("DSDSDSDSD");
    const token = req.nextauth.token;
    console.log(token);
    if (!token) return null;

    if (token.role_user === ("LIDER_CALLE" as ROLE)) {
      console.log(
        isLiderCalleRoutes(req.nextUrl.pathname),
        "LIDERCALLE",
        req.nextUrl.pathname
      );

      if (!isLiderCalleRoutes(req.nextUrl.pathname)) {
        if (token.consejoComunalId) {
          const url = new URL(
            `/consejo-comunal/${token.consejoComunalId as string}/censo`,
            req.url
          );
          return NextResponse.redirect(url);
        }
        const url = new URL(`/`, req.url);
        return NextResponse.redirect(url);
      }
    }

    if (token.role_user === ("LIDER_COMUNIDAD" as ROLE)) {
      if (
        !isLiderCalleRoutes(req.nextUrl.pathname) &&
        !isLiderComunidadRoutes(req.nextUrl.pathname)
      ) {
        if (token.consejoComunalId) {
          const url = new URL(
            `/consejo-comunal/${token.consejoComunalId as string}`,
            req.url
          );
          return NextResponse.redirect(url);
        }
        const url = new URL(`/`, req.url);
        return NextResponse.redirect(url);
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    "/",
    // "/consejo-comunal",
    // "/consejo-comunal/:path*",
    // "/consejo-comunal/(.*)",
    // "/consejo-comunal/:id",
    // "/consejo-comunal/:id/censo",
    // "/consejo-comunal/:id/censo/create",
    // "/consejo-comunal/:id/censo/estadisticas",
    // "/consejo-comunal/:id/censo/:jefeId",
    // "/profile/:path*",
  ],
  
};
