import { TRPCClientError } from "@trpc/client";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const consejoRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const consejos = await ctx.prisma.consejoComunal.findMany({orderBy:{fecha_registro:"asc"}});
    return consejos;
  }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const consejo = await ctx.prisma.consejoComunal.findUnique({
        where: { id: input.id },
        include: {
          censos: true,
        },
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

  getEstadisticas: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;

      const consejo = await ctx.prisma.consejoComunal.findFirst({
        where: { id },
        include: {
          censos: {
            include: { jefeFamilia: { include: { casa: true } } },
          },
        },
      });

      const casas = consejo?.censos.map((censo) => censo.jefeFamilia);

      if (!casas) return null;

      const estadistica: { tipoFamilia: string[];[key: string]: any }[] = [];

      for (let i = 0; i < casas.length; i++) {
        const arrayTemporal = estadistica.filter(
          (resp) => resp["manzana"] === casas[i]?.casa?.manzana
        );

        const censo = consejo?.censos.find(
          (censo) => censo.id === casas[i]?.censoId
        );

        if (arrayTemporal.length > 0) {
          const index = estadistica.findIndex(
            (array) => array.manzana === casas[i]?.casa?.manzana
          );

          estadistica[index]?.casas.push(casas[i]?.casa);

          if (casas[i]?.codCarnetPatria) {
            estadistica[index]?.carnets.push(casas[i]?.codCarnetPatria);
          }
          // if (typeof estadistica[index]?.cajas === "number") {
          estadistica[index]?.cajas.push(censo?.cajasClapsPorRecibir || 0);
          // }

          estadistica[index]?.tipoFamilia.push(
            censo?.tipoFamilia.toLowerCase() === "unifamiliar"
              ? "unifamiliar"
              : "multifamiliar"
          );
        } else {
          estadistica.push({
            manzana: casas[i]?.casa?.manzana,
            casas: [casas[i]?.casa],
            carnets: casas[i]?.codCarnetPatria
              ? [casas[i]?.codCarnetPatria]
              : [],
            tipoFamilia:
              censo?.tipoFamilia.toLowerCase() === "unifamiliar"
                ? ["unifamiliar"]
                : ["multifamiliar"],
            cajas:
              typeof censo?.cajasClapsPorRecibir === "number"
                ? [censo?.cajasClapsPorRecibir]
                : [0],
          });
        }
      }

      return { casas, manzanas: estadistica };
    }),

  updateById: protectedProcedure
    .input(z.object({
      id: z.number(),
      data: z.object({
        nombre_consejo: z.string().nullable(),
        nombre_clap: z.string().nullable(),
        circuito: z.number().nullable(),
        bms: z.string().nullable(),
        comunidad: z.string().nullable(),
        sector: z.string().nullable(),
        cod_siscod: z.string().nullable(),
        estado: z.string().nullable(),
        municipio: z.string().nullable(),
        parroquia: z.string().nullable(),
        rif: z.string().nullable(),
        cantidad_combos: z.number().optional(),
        cantidad_familias: z.number().optional(),
      })
    }))
    .mutation(async ({ ctx, input }) => {
      const {data,id} = input

      const consejo = await ctx.prisma.consejoComunal.findFirst({where:{id}})
      if(!consejo)
        throw new TRPCClientError(`id '${consejo}' is invalid`)

      const filteredData = Object.fromEntries(
        Object.entries(data).filter(([_, v]) => v !== undefined)
      );

      const updatedRecord = await ctx.prisma.consejoComunal.update({
        where: { id },
        data: filteredData,
      });
  
      return updatedRecord;
    })
});
