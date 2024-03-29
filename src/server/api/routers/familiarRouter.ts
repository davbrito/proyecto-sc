import { ESTADO_CIVIL, ESTADO_TRABAJO } from "@prisma/client";
import { TRPCClientError, createTRPCProxyClient } from "@trpc/client";
import { TRPCError } from "@trpc/server";
import { randomInt } from "crypto";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

const createFamiliarSchema = z.object({
  primerNombre: z.string(),
  segundoNombre: z.string(),
  primerApellido: z.string(),
  segundoApellido: z.string(),
  fechaNacimiento: z.string(),
  genero: z.string(),
  telefono: z.string(),
  email: z.string(),
  estado_civil: z.nativeEnum(ESTADO_CIVIL),
});

const documentosFamiliarSchema = z.object({
  tipoDocumento: z.string(),
  numeroDocumento: z.string(),
  serialCarnetPatria: z.string().default(""),
  codCarnetPatria: z.string().default(""),
  observacion: z.string().default(""),
  discapacidad: z.string().default(""),
  enfermedad_cronica: z.string(),
  recibe_pension: z.boolean(),
  vacuna_covid: z.boolean(),
});

const trabajoFamiliarSchema = z.object({
  profesion: z.string(),
  ocupacion: z.string(),
  trabaja: z.nativeEnum(ESTADO_TRABAJO),
  nivel_educativo: z.string(),
  estudiando: z.string(),
  deporte: z.string(),
});

export const familiarRouter = createTRPCRouter({
  addNew: publicProcedure
    .input(
      z.object({
        familiar: createFamiliarSchema,
        documentos: documentosFamiliarSchema,
        trabajo: trabajoFamiliarSchema,
        jefe: z.object({
          jefeId: z.bigint(),
          parentesco: z.string(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { jefe, familiar, documentos, trabajo } = input;

      const jefeToEdit = await ctx.prisma.jefeFamilia.findUnique({
        where: {
          id: jefe.jefeId,
        },
        include: { censo: true },
      });

      if (!jefeToEdit) {
        throw new TRPCError({ message: "JEFE NO EXISTE", code: "CONFLICT" });
      }

      const newFamiliar = await ctx.prisma.familiar.create({
        data: {
          apellidos: `${familiar.primerApellido} ${familiar.segundoApellido}`,
          nombres: `${familiar.primerNombre} ${familiar.segundoNombre}`,
          fechaNacimiento: new Date(familiar.fechaNacimiento).toJSON(),
          genero: familiar.genero,
          estado_civil: familiar.estado_civil,
          email: familiar.email,
          telefono: familiar.telefono,

          parentesco: jefe.parentesco,
          jefeFamiliaId: jefe.jefeId,

          ...documentos,
          ...trabajo,
        },
      });

      const censoToUpdate = await ctx.prisma.censo.findFirst({
        where: { id: jefeToEdit.censo.id },
      });

      if (!censoToUpdate) {
        throw new TRPCError({
          message: "NO EXISTE EL CENSO",
          code: "CONFLICT",
        });
      }

      censoToUpdate.cargaFamiliar += 1;

      if (censoToUpdate.cargaFamiliar > 4) {
        censoToUpdate.tipoFamilia = "multifamiliar";
      }

      const newCenso = await ctx.prisma.censo.update({
        where: { id: censoToUpdate.id },
        data: { ...censoToUpdate },
      });

      return { newFamiliar, newCenso };
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.prisma.familiar.findMany({
      include: {
        jefeFamilia: true,
      },
    });

    return data;
  }),

  deleteById: publicProcedure
    .input(z.object({ id: z.bigint() }))
    .mutation(async ({ ctx, input }) => {
      try {
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
          throw new TRPCError({
            code: "CONFLICT",
            message: "NO EXISTE EL REGISTRO",
          });
        const censoId = familiarToDelete.jefeFamilia.censo.id;

        await ctx.prisma.censo.update({
          where: {
            id: censoId,
          },
          data: {
            tipoFamilia:
              familiarToDelete.jefeFamilia.censo.cargaFamiliar - 1 > 4
                ? "MULTIFAMILIAR"
                : "UNIFAMILIAR",
            cargaFamiliar: familiarToDelete.jefeFamilia.censo.cargaFamiliar - 1,
          },
        });

        const deleted = await ctx.prisma.familiar.delete({
          where: { id: input.id },
        });

        return deleted;
      } catch (error) {
        throw error;
      }
    }),

  update: publicProcedure
    .input(
      z.object({
        familiar: createFamiliarSchema,
        documentos: documentosFamiliarSchema,
        trabajo: trabajoFamiliarSchema,
        jefe: z.object({
          jefeId: z.bigint(),
          parentesco: z.string(),
        }),
        id: z.bigint(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { documentos, familiar, jefe, id, trabajo } = input;

      const familiarUpdated = await ctx.prisma.familiar.update({
        where: {
          id,
        },
        data: {
          apellidos: `${familiar.primerApellido} ${familiar.segundoApellido}`,
          nombres: `${familiar.primerNombre} ${familiar.segundoNombre}`,
          fechaNacimiento: new Date(familiar.fechaNacimiento).toJSON(),
          genero: familiar.genero,
          estado_civil: familiar.estado_civil,
          email: familiar.email,
          telefono: familiar.telefono,

          parentesco: jefe.parentesco,
          jefeFamiliaId: jefe.jefeId,

          ...trabajo,
          ...documentos,
        },
      });

      return familiarUpdated;
    }),
  getByJefeId: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      const response = await ctx.prisma.familiar.findMany({
        where: {
          jefeFamiliaId: input.id,
        },
      });

      return response;
    }),
});
