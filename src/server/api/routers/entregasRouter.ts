import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

const entregaSchema = z.object({
  costeCajaUnidad: z.number(),
  costeTransporte: z.number(),
  costeLogistica: z.number(),
  fechaEntrega: z.string(),
});

export const entregasRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        consejoComunalId: z.number(),
        censadosIds: z.array(z.string()),
        entrega: entregaSchema,
      })
    )

    .mutation(async ({ ctx, input }) => {
      const censos = await ctx.prisma.censo.findMany({
        where: {
          id: { in: input.censadosIds },
        },
        include: {
          jefeFamilia: { include: { casa: true } },
        },
      });

      if (!censos)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No puede registrar la entrega sin censados.",
        });

      const CC = input.consejoComunalId;
      if (!CC)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "EL lider de comunidad debe estar asociado a un consejo comunal, consulte con su administrador.",
        });

      const entrega = await ctx.prisma.entregaCajas.create({
        data: {
          beneficiados: {
            create: censos.map((censado) => ({
              nombres: censado.jefeFamilia?.nombres ?? "",
              apellidos: censado.jefeFamilia?.apellidos ?? "",
              numeroDocumento: censado.jefeFamilia?.numeroDocumento ?? "",
              tipoDocumento: censado.jefeFamilia?.tipoDocumento ?? "",
              cajasAsignadas: censado.cajasClapsPorRecibir,
              casa: censado.jefeFamilia?.casa?.casa ?? "",
              manzana: censado.jefeFamilia?.casa?.manzana ?? "",
              poseeCarnet: censado.jefeFamilia?.codCarnetPatria ? true : false,
              tipoFamilia: censado.tipoFamilia,
            })),
          },
          consejoComunalId: CC,
          ...input.entrega,
          fechaEntrega: new Date(input.entrega.fechaEntrega).toJSON(),
        },
      });

      return entrega;
    }),

  getAll: publicProcedure
    .input(z.object({ consejoComunalId: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.entregaCajas.findMany({
        where: { consejoComunalId: input.consejoComunalId },
        include: { beneficiados: true },
        orderBy: {
          fechaEntrega: "asc",
        },
      });
    }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.entregaCajas.findUnique({
        where: { id: input.id },
        include: { beneficiados: true, ConsejoComunal: true },
      });
    }),

  getStatisticsById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const entregaCaja = await ctx.prisma.entregaCajas.findUnique({
        where: { id: input.id },
        include: { beneficiados: true, ConsejoComunal: true },
      });

      const estadistica = [];

      const beneficiados = entregaCaja?.beneficiados;

      if (!beneficiados) return null;

      for (let i = 0; i < beneficiados.length; i++) {
        const arrayTemporal = estadistica.filter(
          (resp) => resp["manzana"] === beneficiados[i]?.manzana
        );

        const beneficiado = beneficiados.find(
          (beneficiado) => beneficiado.id === beneficiados[i]?.id
        );

        if (arrayTemporal.length > 0) {
          const index = estadistica.findIndex(
            (array) => array.manzana === beneficiado?.manzana
          );

          estadistica[index]?.carnets.push(beneficiado?.poseeCarnet);

          estadistica[index]?.cajas?.push(beneficiado?.cajasAsignadas || 0);
          estadistica[index]?.familias.push(beneficiado?.id);

          estadistica[index]?.tipoFamilia.push(
            beneficiado?.tipoFamilia.toLowerCase() === "unifamiliar"
              ? "unifamiliar"
              : "multifamiliar"
          );
        } else {
          estadistica.push({
            manzana: beneficiado?.manzana ?? "",
            cajas: beneficiado?.cajasAsignadas
              ? [beneficiado?.cajasAsignadas]
              : [0],
            tipoFamilia:
              beneficiado?.tipoFamilia.toLowerCase() === "unifamiliar"
                ? ["unifamiliar"]
                : ["multifamiliar"],
            carnets: [beneficiado?.poseeCarnet],
            familias: [beneficiado?.id],
          });
        }
      }

      return {
        entrega: entregaCaja,
        estadistica: estadistica.sort(
          (a, b) => parseInt(a.manzana) - parseInt(b.manzana)
        ),
      };
    }),

  deleteById: publicProcedure
    .input(z.object({ entrega: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.entregaCajas.delete({ where: { id: input.entrega } });
    }),
});
