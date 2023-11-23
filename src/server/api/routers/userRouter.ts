import { ROLE, type User } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { omit } from "lodash";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { utapi } from "~/server/uploadthing";
import { hashPassword } from "~/utils/hashPassword";

//utils

function safeUser(user: User) {
  return omit(user, ["password"]);
}

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        username: z.string(),
        lastName: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      try {
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
        return safeUser(newUser);
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: "CONFLICT",
          cause: "Server unvailable",
          message: "Ocurrio un error al conectar con el servidor!",
        });
      }
    }),

  deleteById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
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
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { id, lastName, name, username } = input;

      const isUsernameUsed = await ctx.prisma.user.findFirst({
        where: { username },
      });

      if (isUsernameUsed)
        throw new TRPCError({
          code: "CONFLICT",
          cause: "Username already used",
          message: "El nombre de usuario no esta disponible",
        });

      const oldUser = await ctx.prisma.user.findFirst({ where: { id } });

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

      return safeUser(userUpdated);
    }),

  updateImage: protectedProcedure
    .input(z.object({ image: z.string() }))
    .mutation(({ ctx, input }) => {}),

  updatePassword: protectedProcedure
    .input(z.object({ newPassword: z.string(), id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const hashed = await hashPassword(input.newPassword);

      const user = await ctx.prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          password: hashed,
        },
      });

      return safeUser(user);
    }),

  getUsers: protectedProcedure
    .input(
      z.object({
        cursor: z.string().nullish(),
        limits: z.number().min(1).max(100).default(20),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { cursor, limits } = input;
      const total = await ctx.prisma.user.count();

      const users = await ctx.prisma.user.findMany({
        take: limits + 1,
        orderBy: {
          created_at: "asc",
        },
        cursor: cursor
          ? {
              id: cursor,
            }
          : undefined,
        select: {
          image: true,
          id: true,
          name: true,
          role_user: true,
          username: true,
          lastName: true,
          consejo: {
            select: {
              id: true,
              nombre_clap: true,
            },
          },
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;

      if (users.length > limits) {
        const nextItem = users.pop();
        nextCursor = nextItem?.id;
      }

      return {
        items: users,
        nextCursor,
        total: Math.ceil(total / limits),
      };
    }),

  myUser: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findFirst({
      where: {
        username: ctx.session.user.username,
      },
    });

    return user && safeUser(user);
  }),

  getByUsername: protectedProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { username: input.username },
      });

      return user && safeUser(user);
    }),

  updateAvatarById: protectedProcedure
    .input(
      z.object({
        img_url: z.string(),
        user_id: z.string(),
        old_url: z.string().default(""),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { img_url, old_url, user_id } = input;

      if (old_url) {
        console.log(
          old_url,
          old_url.slice(old_url.lastIndexOf("/") + 1, old_url.length),
        );
        const res = await utapi.deleteFiles(
          old_url.slice(old_url.lastIndexOf("/") + 1, old_url.length),
        );

        console.log(res, old_url, "SDADASDDSDADS");
      }

      const user = await ctx.prisma.user.update({
        where: {
          id: user_id,
        },
        data: {
          image: img_url,
        },
      });

      return safeUser(user);
    }),
  updateConsejo: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        consejoId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.update({
        where: { id: input.id },
        data: {
          consejoComunalId: input.consejoId,
        },
      });
      return safeUser(user);
    }),

  updateUserRole: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        role: z.nativeEnum(ROLE),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.update({
        where: { id: input.id },
        data: {
          role_user: input.role,
        },
      });

      return safeUser(user);
    }),
});
