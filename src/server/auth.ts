import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type ROLE } from "@prisma/client";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "~/server/db";
import { comparePassword } from "~/utils/hashPassword";

declare module "next-auth/jwt" {
  interface Token extends JWT {
    username: string;
    role_user: ROLE;
    consejoComunalId: number | null;
    // consejoComunalId: number;
  }
}

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      name: string;
      username: string;
      role_user: ROLE;
      consejoComunalId: number | null;
      image: string | null;
    };
  }
  interface User {
    name: string;
    username: string;
    role_user: ROLE;
    consejoComunalId: number | null;
    image: string | null;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.accessToken = user.id;
        token.name = user.name;
        token.username = user.username;
        token.role_user = user.role_user;
        token.picture = user.image;
        token.consejoComunalId = user.consejoComunalId;
      }
      return token;
    },
    session({ session, token }) {
      if (session?.user) {
        session.user.username = token.username as string;
        session.user.role_user = token.role_user as ROLE;
        session.user.consejoComunalId = token.consejoComunalId as number;
        if (token.picture) session.user.image = token.picture;
      }
      return session;
    },
  },
  pages: {},
  providers: [
    Credentials({
      name: "Credentials",
      type: "credentials",
      credentials: {
        username: { label: "username", type: "text", placeholder: "blablal" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.password || !credentials.username)
          throw new Error("Username or password cannot be empty!.");

        try {
          const user = await prisma.user.findUnique({
            where: {
              username: credentials.username,
            },
          });
          if (
            !user ||
            (user &&
              !(await comparePassword(credentials.password, user.password)))
          )
            throw new Error("Username or password are incorrects!.");
          return user;
        } catch (error) {
          if (typeof error === "string") {
          } else if (error instanceof Error) {
            if (error.message.includes("Username")) {
              throw new Error("Username or password are incorrects!.");
            }
          }
          throw new Error("Server is unavailable, please try again later.");
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 5,
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (
  ctx: Pick<GetServerSidePropsContext, "req" | "res">,
) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
