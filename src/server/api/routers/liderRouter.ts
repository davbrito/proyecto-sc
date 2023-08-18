import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const lideresRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const lideres = await ctx.prisma.liderCalle.findMany({});
    return lideres;
  }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const lideres = await ctx.prisma.liderCalle.findFirst({
        where: { id: input.id },
      });
      return lideres;
    }),
  create: publicProcedure
    .input(
      z.object({
        nombres: z.string(),
        apellidos: z.string(),
        cedula: z.string(),
        telefono: z.string(),
        profesion: z.string(),
        nacionalidad: z.string(),
        genero: z.string(),
        cantidad_familias: z.number(),
        email: z.string(),
        cantidad_combos: z.number(),
        longitud: z.number(),
        latitud: z.number(),
        casaId: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.liderCalle.create({
        data: {
          ...input,
        },
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.liderCalle.delete({
        where: { id: input.id },
      });
    }),
});
