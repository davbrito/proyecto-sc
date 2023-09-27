import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const encargadosRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const encargados = await ctx.prisma.encargadoClap.findMany({});
    return encargados;
  }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const encargados = await ctx.prisma.encargadoClap.findFirst({
        where: { id: input.id },
      });
      return encargados;
    }),
  getByConsejoId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const encargados = await ctx.prisma.encargadoClap.findMany({
        where: { consejoComunalId: input.id },
      });
      return encargados;
    }),
  create: publicProcedure
    .input(
      z.object({
        cargo: z.string(),
        nombres: z.string(),
        apellidos: z.string(),
        cedula: z.string(),
        telefono: z.string(),
        profesion: z.string(),
        email: z.string(),
        consejoComunalId: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.encargadoClap.create({
        data: {
          ...input,
        },
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.encargadoClap.delete({
        where: { id: input.id },
      });
    }),

  update: publicProcedure.input(
    z.object({
      id: z.number(),
      newInfo: z.object({
        cargo: z.string(),
        nombres: z.string(),
        apellidos: z.string(),
        cedula: z.string(),
        telefono: z.string(),
        profesion: z.string(),
        email: z.string(),
      }),
    })
  ).mutation(async({ctx, input})=>{
        const {id,newInfo} = input

        return await ctx.prisma.encargadoClap.update({
          where:{id},
          data:{
            ...newInfo
          }
        })
  }),
});
