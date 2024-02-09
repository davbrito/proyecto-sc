import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const lideresRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const lideres = await ctx.prisma.liderCalle.findMany({
      include: { casa: true },
    });
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
        jefeId: z.bigint(),
        casaId: z.bigint(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const dataJefeFamilia = await ctx.prisma.jefeFamilia.findFirst({
        where: { id: input.jefeId },
        include: {
          censo: true,
        },
      });

      if (!dataJefeFamilia)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "JEFE DE FAMILIA NO EXISTE",
        });

      return await ctx.prisma.liderCalle.create({
        data: {
          apellidos: dataJefeFamilia.apellidos,
          cedula: dataJefeFamilia.numeroDocumento,
          email: dataJefeFamilia.email,
          genero: dataJefeFamilia.genero,
          nacionalidad:
            dataJefeFamilia.tipoDocumento.slice(1).toUpperCase() === "V"
              ? "VENEZOLANO"
              : "EXTRANJERO",
          nombres: dataJefeFamilia.nombres,
          profesion: dataJefeFamilia.profesion,
          telefono: dataJefeFamilia.telefono,
          casaId: input.casaId,
          cantidad_familias: 0,
          cantidad_combos: 0,
          longitud: 0.0,
          latitud: 0.0,
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
