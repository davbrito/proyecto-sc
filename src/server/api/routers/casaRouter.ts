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
      include: {
        jefeFamilia: {
          include:{
            censo:true
          }
        },
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

  getAllByConsejoId: publicProcedure
    .input(z.object({ consejoId: z.number() }))
    .query(async ({ input, ctx }) => {
      const { consejoId } = input;
      const jefes = await ctx.prisma.jefeFamilia.findMany({
        include: {
          censo: true,
          casa: true,
        },
      });

      const casas = jefes
        .filter((jefe) => jefe.censo.consejoComunalId === input.consejoId)
        .map((jefe) => jefe.casa);

      return casas;
    }),

    getByCasaId: publicProcedure
      .input(z.object({id:z.number()}))
      .query(async ({ctx,input})=> {
        const {id}=input
        const casa = await ctx.prisma.casa.findUniqueOrThrow({
          where: {id},
          include:{
            jefeFamilia:{
              include:{
                censo:true
              },
              orderBy:{
                fechaRegistro:"asc"
              }
            }
          }
        })

        return casa

      })
});
