import { PrismaAdapter } from "@next-auth/prisma-adapter";
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
    };
  }
  interface User {
    name: string;
    username: string;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: "BLABLA",
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.accessToken = user.id;
        token.user = user;
        token.name = user.name;
        token.username = user.username;
      }
      return token;
    },
    session({ session, token }) {
      if (session?.user) {
        session.user.username = token.username as string;
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

        console.log(user);
        return user;
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
  ctx: Pick<GetServerSidePropsContext, "req" | "res">
) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
