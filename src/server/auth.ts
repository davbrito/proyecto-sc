import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions
} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "~/server/db";
import { comparePassword } from "~/utils/hashPassword";
import { type DefaultSession  } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt"{
  interface Token extends JWT {
    username: string
  }
}


declare module "next-auth" {
  interface Session extends DefaultSession{
    user: {
      name:string
      username:string
    } 
  }
  interface User {
    name:string
    username:string
  }

}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: "BLABLA",
  callbacks: {
    async jwt({token, user}) {
      if (user) { 
        token.accessToken = user.id;
        token.user = user; 
        token.name = user.name
        token.username = user.username
      }
      return token;
    },
    session({session,token}){
      if(session?.user){
        session.user.username = token.username as string
      }
      return session
    },
  
  },
  pages:{
    error: "/error"
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
