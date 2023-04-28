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
        serialCarnetPatria: z.string(),
        codCarnetPatria: z.string(),
        observacion: z.string(),
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
      } = input;

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
        },
      });

      //Crear censo

      return newJefe;
    }),
});
