import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const lideresRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({ consejoComunalId: z.number() }))
    .query(async ({ ctx, input }) => {
      const consejo = await ctx.prisma.consejoComunal.findFirst({
        where: { id: input.consejoComunalId },
        include: {
          censos: {
            include: { jefeFamilia: { include: { casa: true } } },
          },
        },
      });

      if (!consejo)
        throw new TRPCError({
          code: "BAD_REQUEST",
          cause: "CONSEJO COMUNAL NO EXISTE",
        });

      const censos = consejo.censos.map((censo) => censo);

      if (!censos)
        throw new TRPCError({
          code: "BAD_REQUEST",
          cause: "NO POSEE CENSO REGISTRADO",
        });

      const estadistica: {
        manzana: string;
        calle: string;
        cajasClaps: number;
        familias: number;
        jefeFamiliaId: bigint;
      }[] = [];

      censos.forEach((censo) => {
        const { jefeFamilia } = censo;
        const { casa } = jefeFamilia || {};

        if (casa) {
          const { manzana, calle } = casa;
          const index = estadistica.findIndex(
            (casa) => casa["manzana"] === manzana && casa["calle"] === calle
          );

          const calleExistente = estadistica[index];

          if (calleExistente) {
            calleExistente.cajasClaps += censo.cajasClapsPorRecibir;
            calleExistente.familias += censo.cargaFamiliar;
          } else {
            estadistica.push({
              manzana: manzana ?? "",
              calle: calle ?? "",
              cajasClaps: censo.cajasClapsPorRecibir,
              familias: censo.cargaFamiliar,
              jefeFamiliaId: censo?.jefeFamilia?.id ?? BigInt(1),
            });
          }
        }
      });

      const lideres = await ctx.prisma.lider.findMany({
        where: { consejoComunalId: input.consejoComunalId },
        include: {
          jefeFamilia: {
            select: {
              id: true,
              nombres: true,
              apellidos: true,
              tipoDocumento: true,
              numeroDocumento: true,
              profesion: true,
              casa: true,
              genero: true,
              telefono: true,
              email: true,
            },
          },
        },
      });

      const lideresEstadistica = lideres.map((lider) => {
        const estadisticaLider = estadistica.find(
          (e) => e.jefeFamiliaId === lider.jefeFamiliaId
        ) || { cajasClaps: 0, familias: 0 };
        return {
          ...lider,
          cajasClaps: estadisticaLider.cajasClaps,
          familias: estadisticaLider.familias,
        };
      });

      return lideresEstadistica;
    }),
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const lideres = await ctx.prisma.lider.findFirst({
        where: { id: input.id },
      });
      return lideres;
    }),
  create: publicProcedure
    .input(
      z.object({
        jefeId: z.bigint(),
        consejoComunalId: z.number(),
        manzana: z.string(),
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

      const existe = await ctx.prisma.lider.count({
        where: {
          OR: [
            {
              jefeFamiliaId: input.jefeId,
            },
            { manzana: input.manzana },
          ],
        },
      });
      console.log(existe, " DSSSSSSSSSSSSSSSSSS");

      if (existe)
        throw new TRPCError({
          code: "BAD_REQUEST",
          cause:
            "JEFE FAMILIA YA ES LIDER DE CALLE O MANZANA YA ESTA REGISTRADA",
        });

      return await ctx.prisma.lider.create({
        data: {
          jefeFamiliaId: input.jefeId,
          consejoComunalId: input.consejoComunalId,
          manzana: input.manzana,
        },
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.lider.delete({
        where: { id: input.id },
      });
    }),
});
