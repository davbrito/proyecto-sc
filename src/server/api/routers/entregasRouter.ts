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

      const CC = ctx.session.user.consejoComunalId;
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
            })),
          },
          consejoComunalId: CC,
          ...input.entrega,
          fechaEntrega: new Date(input.entrega.fechaEntrega).toJSON(),
        },
      });

      return entrega;
    }),
});
