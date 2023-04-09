import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db";
import LoginPage from "~/pages/login";
import { comparePassword } from "~/utils/hashPassword";
import { randomBytes, randomUUID } from "crypto";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession{
    user: {
      id: string;
      username: string;
      name: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: "BLABLA",
  callbacks: {
    async jwt({token, user}) {
      if (user) {
        token.accessToken = user.id;
        token.user = user; 
      }
      return token;
    },
  },
  providers: [
    Credentials({
      name: "Credentials",
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
