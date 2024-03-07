import { TRPCClientError, createTRPCProxyClient } from "@trpc/client";
import { TRPCError } from "@trpc/server";
import { randomInt } from "crypto";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const censoRouter = createTRPCRouter({
  getCensoInfor: publicProcedure
    .input(
      z.object({
        keyword: z.string().default(""),
        consejoId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const jefes = await ctx.prisma.censo.findMany({
        orderBy: {
          fecha: "asc",
        },
        take: 20,
        include: {
          jefeFamilia: {
            include: {
              casa: true,
            },
          },
        },
        where: {
          id: {
            contains: input.keyword,
          },
          consejoComunalId: parseInt(input.consejoId),
        },
      });

      return jefes;
    }),

  editCaja: publicProcedure
    .input(
      z.object({
        cajasPorAsignar: z.number(),
        censoId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { cajasPorAsignar, censoId } = input;

      const response = await ctx.prisma.censo.update({
        where: {
          id: censoId,
        },
        data: {
          cajasClapsPorRecibir: cajasPorAsignar,
        },
      });

      return response;
    }),

  validarInformacion: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { username } = ctx.session.user;
      const user = await ctx.prisma.user.findFirst({ where: { username } });

      if (!user)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "ERROR, USUARIO NO EXISTE",
        });

      await ctx.prisma.censo.update({
        where: {
          id: input.id,
        },
        data: {
          encargado_validacion_id: user.id,
          datos_validado: true,
        },
      });

      return true;
    }),
});
