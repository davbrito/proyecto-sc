import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const consejoRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const consejos = await ctx.prisma.consejoComunal.findMany({});
    return consejos;
  }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const consejo = await ctx.prisma.consejoComunal.findFirst({
        where: { id: input.id },
      });
      return consejo;
    }),
  create: publicProcedure
    .input(
      z.object({
        nombre_consejo: z.string(),
        nombre_clap: z.string(),
        circuito: z.number(),
        bms: z.string(),
        comunidad: z.string(),
        sector: z.string(),
        cod_siscod: z.string(),
        estado: z.string(),
        municipio: z.string(),
        parroquia: z.string(),
        rif: z.string(),
        cantidad_combos: z.number().default(0),
        cantidad_familias: z.number().default(0),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.consejoComunal.create({
        data: {
          ...input,
        },
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.consejoComunal.delete({
        where: { id: input.id },
      });
    }),
  
});
