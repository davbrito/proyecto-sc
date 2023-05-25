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
        direccion: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { calle, casa, direccion, manzana } = input;
      const newCasa = await ctx.prisma.casa.create({
        data: {
          calle,
          casa,
          direccion,
          manzana,
        },
      });

      return newCasa;
    }),
  getAllCasas: publicProcedure.query(async ({ ctx }) => {
    const casas = await ctx.prisma.casa.findMany({
      take: 100,
    });

    return casas;
  }),
  deleteCasaById: protectedProcedure
    .input(z.object({ casaId: z.bigint() }))
    .mutation(async ({ ctx, input }) => {
      console.log(ctx.session);
      const deleteCasa = await ctx.prisma.casa.delete({
        where: {
          id: input.casaId,
        },
      });

      console.log(deleteCasa);
      return;
    }),
});
