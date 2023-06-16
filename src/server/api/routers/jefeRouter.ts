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
          fechaNacimiento: z.string(),
          genero: z.string(),
          email: z.string(),
          telefono: z.string(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { casa, documentos, jefe } = input;

      const newCasa = await ctx.prisma.casa.create({
        data: {
          ...casa,
        },
      });

      if (!newCasa) return;

      const newJefe = await ctx.prisma.jefeFamilia.create({
        data: {
          nombres: jefe.primerNombre + " " + jefe.segundoNombre,
          apellidos: jefe.primerApellido + " " + jefe.segundoApellido,
          fechaNacimiento: new Date(jefe.fechaNacimiento).toJSON(),
          genero: jefe.genero,
          email: jefe.email,
          telefono: jefe.telefono,
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

  delete: publicProcedure
    .input(
      z.object({
        id: z.bigint(),
        censoId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const censoDelete = await ctx.prisma.censo.delete({
        where: {
          id: input.censoId,
        },
      });
      console.log(censoDelete);

      const jefeDeleted = await ctx.prisma.jefeFamilia.delete({
        where: {
          id: input.id,
        },
      });

      console.log(jefeDeleted);
      return jefeDeleted;
    }),

  update: publicProcedure
    .input(
      z.object({
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
          fechaNacimiento: z.string(),
          genero: z.string(),
          email: z.string(),
          telefono: z.string(),
        }),
        id: z.bigint(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const jefeUpdated = await ctx.prisma.jefeFamilia.update({
        where: {
          id: input.id,
        },
        data: {
          nombres: input.jefe.primerNombre + " " + input.jefe.segundoNombre,
          apellidos:
            input.jefe.primerApellido + " " + input.jefe.segundoApellido,
          fechaNacimiento: new Date(input.jefe.fechaNacimiento).toJSON(),
          genero: input.jefe.genero,
          email: input.jefe.email,
          telefono: input.jefe.telefono,
          ...input.documentos,
        },
      });

      return jefeUpdated;
    }),
});
