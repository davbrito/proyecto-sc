import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { hashPassword } from "~/utils/hashPassword";

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        username: z.string(),
        lastName: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const users = await ctx.prisma.user.findFirst({
        where: {
          username: input.username,
        },
      });

      if (users)
        throw new TRPCError({
          code: "CONFLICT",
          message: "Username is already used!",
        });

      const { lastName, name, password, username } = input;
      const hashed = await hashPassword(password);

      const newUser = await ctx.prisma.user.create({
        data: {
          password: hashed,
          lastName,
          name,
          username,
        },
      });

      return newUser;
    }),

  deleteById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id } = input;

      await ctx.prisma.user.delete({
        where: {
          id,
        },
      });

      return true;
    }),

  updateDataInfoById: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        username: z.string(),
        image: z.string(),
        lastName: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id, image, lastName, name, username } = input;

      const userFound = await ctx.prisma.user.update({
        where: {
          id,
        },
        data: {
          image,
          lastName,
          name,
          username,
        },
      });

      return userFound
    }),
});
