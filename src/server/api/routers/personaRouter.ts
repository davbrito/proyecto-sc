import { createTRPCProxyClient } from "@trpc/client";
import { randomInt } from "crypto";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const personaRouter = createTRPCRouter({
  createJefeFamilia: publicProcedure
    .input(
      z.object({
        casa: z.object({
          manzana: z.string(),
          casa: z.string(),
          calle: z.string(),
          direccion: z.string(),
        }),
        documentos: z.object({
          tipoDocumento: z.string(),
          numeroDocumento: z.string(),
          serialCarnetPatria: z.string().default(""),
          codCarnetPatria: z.string().default(""),
          observacion: z.string().default(""),
        }),
        jefe: z.object({
          primerNombre: z.string(),
          segundoNombre: z.string(),
          primerApellido: z.string(),
          segundoApellido: z.string(),
          edad: z.number(),
          fechaNacimiento: z.string(),
          genero: z.string(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { casa, documentos, jefe } = input;

      const newCasa = await ctx.prisma.casa.create({
        data: {
          id: BigInt(
            `${casa.manzana.padStart(2, "0")}${casa.casa.padStart(4, "0")}`
          ),
          ...casa,
        },
      });

      if (!newCasa) return;

      const newJefe = await ctx.prisma.jefeFamilia.create({
        data: {
          nombres: jefe.primerNombre + ", " + jefe.segundoNombre,
          apellidos: jefe.primerApellido + ", " + jefe.segundoApellido,
          fechaNacimiento: new Date(jefe.fechaNacimiento).toJSON(),
          edad: jefe.edad,
          genero: jefe.genero,
          ...documentos,
        },
      });

      const censo = await ctx.prisma.censo.create({
        data: {
          id: `${newCasa.manzana.padStart(2, "0")}${newCasa.casa.padStart(
            2,
            "0"
          )}${newJefe.id.toString().padStart(4, "0")}`,
          casaId: newCasa.id,
          jefeFamiliaCod: newJefe.id,
        },
      });

      return { newJefe, newCasa, censo };
    }),
  addNewFamiliar: publicProcedure
    .input(
      z.object({
        jefeId: z.string(),
        nombres: z.string(),
        apellidos: z.string(),
        numeroDocumento: z.string(),
        edad: z.string(),
        fechaNacimiento: z.string(),
        genero: z.string(),
        email: z.string(),
        telefono: z.string(),
        serialCarnetPatria: z.string(),
        codCarnetPatria: z.string(),
        observacion: z.string(),

        parentesco: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const {
        apellidos,
        codCarnetPatria,
        edad,
        email,
        fechaNacimiento,
        genero,
        jefeId,
        nombres,
        numeroDocumento,
        observacion,
        parentesco,
        serialCarnetPatria,
        telefono,
      } = input;

      const jefeToEdit = await ctx.prisma.jefeFamilia.findFirstOrThrow({});

      console.log(jefeToEdit);

      const newFamiliar = await ctx.prisma.familiar.create({
        data: {
          apellidos,
          codCarnetPatria,
          edad: parseInt(edad),
          email,
          fechaNacimiento,
          genero,
          nombres,
          numeroDocumento,
          observacion,
          parentesco,
          serialCarnetPatria,
          telefono,
        },
      });

      return newFamiliar;
    }),
  getJefesFamilias: publicProcedure.query(async ({ ctx }) => {
    const jefes = await ctx.prisma.censo.findMany({
      take: 20,
      include: {
        jefeFamilia: true,
        casa: true,
      },
    });

    return jefes;
  }),

  getJefesWithFamiliares: publicProcedure.query(({ ctx }) => {}),
});
