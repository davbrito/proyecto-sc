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
        nombres: z.string(),
        apellidos: z.string(),
        numeroDocumento: z.string(),
        edad: z.string(),
        fechaNacimiento: z.string(),
        genero: z.string(),
        serialCarnetPatria: z.string().default(""),
        codCarnetPatria: z.string().default(""),
        observacion: z.string().default(""),
        casa: z.object({
          manzana: z.string(),
          casa: z.string(),
          calle: z.string(),
          direccion: z.string(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const {
        apellidos,
        codCarnetPatria,
        edad,
        fechaNacimiento,
        genero,
        nombres,
        numeroDocumento,
        observacion,
        serialCarnetPatria,
        casa,
      } = input;

      const newCasa = await ctx.prisma.casa.create({
        data: casa,
      });

      const newJefe = await ctx.prisma.jefeFamilia.create({
        data: {
          apellidos,
          codCarnetPatria,
          edad: parseInt(edad),
          fechaNacimiento: new Date(fechaNacimiento),
          genero,
          nombres,
          numeroDocumento,
          observacion,
          serialCarnetPatria,
          Censo: {
            create: {
              casaId: BigInt(newCasa.id),
            },
          },
        },
      });

      //Crear censo

      return newJefe;
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

      const jefeToEdit = await ctx.prisma.jefeFamilia.findFirstOrThrow({
        where: {
          cod: BigInt(jefeId),
        },
      });

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
    const jefes = await ctx.prisma.jefeFamilia.findMany({ take: 20 });

    return jefes;
  }),

  getJefesWithFamiliares: publicProcedure.query(({ ctx }) => {}),
});
