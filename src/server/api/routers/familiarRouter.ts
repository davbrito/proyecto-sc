import { TRPCClientError, createTRPCProxyClient } from "@trpc/client";
import { TRPCError } from "@trpc/server";
import { randomInt } from "crypto";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const familiarRouter = createTRPCRouter({
  addNew: publicProcedure
    .input(
      z.object({
        familiar: z.object({
          primerNombre: z.string(),
          segundoNombre: z.string(),
          primerApellido: z.string(),
          segundoApellido: z.string(),
          fechaNacimiento: z.string(),
          genero: z.string(),
        }),
        documentos: z.object({
          tipoDocumento: z.string(),
          numeroDocumento: z.string(),
          serialCarnetPatria: z.string().default(""),
          codCarnetPatria: z.string().default(""),
          observacion: z.string().default(""),
          condicionEspecial: z.string().default(""),
        }),
        jefe: z.object({
          jefeId: z.bigint(),
          parentesco: z.string(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { jefe, familiar, documentos } = input;

      const jefeToEdit = await ctx.prisma.jefeFamilia.findFirstOrThrow({
        where: {
          id: jefe.jefeId,
        },
        include: { censo: true },
      });

      if (!jefeToEdit || !jefeToEdit.censo)
        throw new TRPCError({ message: "JEFE NO EXISTE", code: "CONFLICT" });

      const newFamiliar = await ctx.prisma.familiar.create({
        data: {
          apellidos: `${familiar.primerApellido} ${familiar.segundoApellido}`,
          nombres: `${familiar.primerNombre} ${familiar.segundoNombre}`,
          fechaNacimiento: new Date(familiar.fechaNacimiento).toJSON(),
          genero: familiar.genero,
          ...documentos,
          parentesco: jefe.parentesco,
          jefeFamiliaId: jefe.jefeId,
        },
      });

      const censoToUpdate = await ctx.prisma.censo.findFirst({
        where: {
          id: {
            equals: jefeToEdit.censo?.id,
          },
        },
      });
      if (!censoToUpdate)
        throw new TRPCError({
          message: "NO EXISTE EL CENSO",
          code: "CONFLICT",
        });

      censoToUpdate.cargaFamiliar += 1;

      if (censoToUpdate.cargaFamiliar > 4) {
        censoToUpdate.tipoFamilia = "multifamiliar";
        censoToUpdate.cajasClapsPorRecibir = 2;
      }

      const newCenso = await ctx.prisma.censo.update({
        where: {
          id: censoToUpdate.id,
        },
        data: {
          ...censoToUpdate,
        },
      });

      return { newFamiliar, newCenso };
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.familiar.findMany({
      include: {
        jefeFamilia: true,
      },
    });
  }),

  deleteById: publicProcedure
    .input(z.object({ id: z.bigint() }))
    .mutation(async ({ ctx, input }) => {
      const familiarToDelete = await ctx.prisma.familiar.findFirst({
        where: { id: input.id },
        include: {
          jefeFamilia: {
            include: {
              censo: true,
            },
          },
        },
      });

      if (
        !familiarToDelete ||
        !familiarToDelete.jefeFamilia.censo ||
        !familiarToDelete.jefeFamilia.censo.id
      )
        return;
      const censoId = familiarToDelete.jefeFamilia.censo.id;

      await ctx.prisma.censo.update({
        where: {
          id: censoId,
        },
        data: {
          cargaFamiliar: familiarToDelete.jefeFamilia.censo.cargaFamiliar - 1,
          tipoFamilia:
            familiarToDelete.jefeFamilia.censo.cargaFamiliar - 1 > 4
              ? "MULTIFAMILIAR"
              : "UNIFAMILIAR",
        },
      });

      const deleted = await ctx.prisma.familiar.delete({
        where: { id: input.id },
      });

      return deleted;
    }),

  update: publicProcedure
    .input(
      z.object({
        familiar: z.object({
          primerNombre: z.string(),
          segundoNombre: z.string(),
          primerApellido: z.string(),
          segundoApellido: z.string(),
          fechaNacimiento: z.string(),
          genero: z.string(),
        }),
        documentos: z.object({
          tipoDocumento: z.string(),
          numeroDocumento: z.string(),
          serialCarnetPatria: z.string().default(""),
          codCarnetPatria: z.string().default(""),
          observacion: z.string().default(""),
          condicionEspecial: z.string().default(""),
        }),
        jefe: z.object({
          jefeId: z.bigint(),
          parentesco: z.string(),
        }),
        id: z.bigint(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { documentos, familiar, jefe, id } = input;

      const familiarUpdated = await ctx.prisma.familiar.update({
        where: {
          id,
        },
        data: {
          apellidos: `${familiar.primerApellido} ${familiar.segundoApellido}`,
          nombres: `${familiar.primerNombre} ${familiar.segundoNombre}`,
          fechaNacimiento: new Date(familiar.fechaNacimiento).toJSON(),
          genero: familiar.genero,

          ...documentos,
          parentesco: jefe.parentesco,
        },
      });

      return familiarUpdated;
    }),
  getById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(() => {}),
});
