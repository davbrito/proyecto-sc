import { type User } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { hashPassword } from "~/utils/hashPassword";

//utils

const formatUserData = ({ image, name, username, lastName }: User) => {
  return {
    image,
    name,
    username,
    lastName,
  };
};

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

  deleteById: protectedProcedure
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

  updateDataInfoById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        username: z.string(),
        lastName: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id, lastName, name, username } = input;

      const oldUser = await ctx.prisma.user.findFirst({
        where: {
          id,
        },
      });

      const newData = {
        lastName: lastName || oldUser?.lastName,
        name: name || oldUser?.name,
        username: username || oldUser?.username,
      };

      const userUpdated = await ctx.prisma.user.update({
        where: {
          id,
        },
        data: newData,
      });

      return userUpdated;
    }),

  updateImage: protectedProcedure
    .input(z.object({ image: z.string() }))
    .mutation(({ ctx, input }) => {}),

  getUsers: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findMany({
      take: 100,
    });
    return user.map(formatUserData);
  }),

  getById: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findFirst({
      where: {
        username: ctx.session.user.username,
      },
    });

    return user;
  }),
});
