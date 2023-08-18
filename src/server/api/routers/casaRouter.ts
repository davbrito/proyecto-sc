import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const casaRouter = createTRPCRouter({
  createCasa: publicProcedure
    .input(
      z.object({
        manzana: z.string(),
        casa: z.string(),
        calle: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { calle, casa, manzana } = input;
      const newCasa = await ctx.prisma.casa.create({
        data: {
          calle,
          casa,
          manzana,
        },
      });

      return newCasa;
    }),
  getAllCasas: publicProcedure.query(async ({ ctx }) => {
    const casas = await ctx.prisma.casa.findMany({
      take: 100,
      include: {
        jefeFamilia: true,
      },
    });

    return casas;
  }),
  deleteCasaById: protectedProcedure
    .input(z.object({ casaId: z.bigint() }))
    .mutation(async ({ ctx, input }) => {
      const deleteCasa = await ctx.prisma.casa.delete({
        where: {
          id: input.casaId,
        },
      });

      return;
    }),
});
