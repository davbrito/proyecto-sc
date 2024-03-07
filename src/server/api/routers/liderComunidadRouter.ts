import { TRPCError } from "@trpc/server";
import { object, z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const liderComunidadRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({ consejoComunalId: z.number() }))
    .query(async ({ ctx, input }) => {
      const lideres = await ctx.prisma.liderComunidad.findMany({
        where: { consejoComunalId: input.consejoComunalId },
        include: {
          jefeFamilia: true,
        },
      });
      return lideres;
    }),
  create: publicProcedure
    .input(
      z.object({
        jefeFamiliaId: z.number(),
        consejoComunalId: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const inforJefeFamilia = await ctx.prisma.jefeFamilia.findFirst({
        where: { id: input.jefeFamiliaId },
      });

      if (!inforJefeFamilia)
        throw new TRPCError({
          code: "BAD_REQUEST",
          cause: "JEFE DE FAMILIA DEBE ESTAR REGISTRADO",
        });

      const existe = await ctx.prisma.liderComunidad.count({
        where: { id: input.jefeFamiliaId },
      });

      if (existe)
        throw new TRPCError({
          code: "BAD_REQUEST",
          cause: "YA EXISTE COMO JEFE DE COMUNIDAD",
        });

      const newLider = await ctx.prisma.liderComunidad.create({
        data: {
          jefeFamiliaId: input.jefeFamiliaId,
          consejoComunalId: input.consejoComunalId,
        },
      });

      return newLider;
    }),

  delete: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.liderComunidad.delete({ where: { id: input.id } });
    }),
});
