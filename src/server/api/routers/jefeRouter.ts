import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const jefeRouter = createTRPCRouter({
  create: publicProcedure
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

      console.log(newCasa);
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
          jefeFamiliaId: newJefe.id,
          casaId: newCasa.id,
        },
      });

      return { newJefe, newCasa, censo };
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.jefeFamilia.findFirstOrThrow({
        where: { id: BigInt(input.id) },
        include: { censo: { include: { casa: true } }, familiar: true },
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const jefes = await ctx.prisma.jefeFamilia.findMany({});
    return jefes;
  }),

  getAllWithFamiliares: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.jefeFamilia.findMany({
      include: {
        familiar: true,
      },
    });
  }),
});
