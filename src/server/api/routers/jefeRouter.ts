import { createReactProxyDecoration } from "@trpc/react-query/shared";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

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
          condicionEspecial: z.string().default(""),
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
        consejoComunalId: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { casa, documentos, jefe, consejoComunalId } = input;

        const newCasa = await ctx.prisma.casa.create({
          data: {
            ...casa,
          },
        });

        if (!newCasa) throw new Error("Error creating the house");

        const nroMz = newCasa.manzana;

        const cc = await ctx.prisma.consejoComunal.findFirst({
          where: {
            id: consejoComunalId,
          },
          include: {
            censos: {
              include: {
                jefeFamilia: {
                  include: {
                    casa: true,
                  },
                },
              },
            },
          },
        });

        const manzanasCC = cc?.censos.filter(
          (censo) => censo.jefeFamilia?.casa?.manzana === newCasa.manzana
        ).length;

        const secuenciaMz = manzanasCC ? manzanasCC + 1 : 1;

        const jefes = await ctx.prisma.jefeFamilia.findMany({
          orderBy: { id: "desc" },
          take: 1,
        });

        const secJefe = jefes[0]?.id
          ? (jefes[0]?.id + BigInt(1)).toString()
          : "1";

        const censo = await ctx.prisma.censo.create({
          data: {
            id: `${nroMz.padStart(2, "0")}${secJefe.padStart(
              3,
              "0"
            )}${secuenciaMz.toString().padStart(4, "0")}`,
            consejoComunalId,
          },
        });
        if (!censo) throw new Error("Error creating the censo");

        const newJefe = await ctx.prisma.jefeFamilia.create({
          data: {
            nombres: jefe.primerNombre + " " + jefe.segundoNombre,
            apellidos: jefe.primerApellido + " " + jefe.segundoApellido,
            fechaNacimiento: new Date(jefe.fechaNacimiento).toJSON(),
            genero: jefe.genero,
            email: jefe.email,
            telefono: jefe.telefono,
            ...documentos,
            censoId: censo.id,
            casaId: newCasa.id,
          },
        });
        if (!newJefe) throw new Error("Error creating the jefe");

        return { newJefe, newCasa, censo };
      } catch (error) {
        throw error;
      }
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.jefeFamilia.findFirstOrThrow({
        where: { id: BigInt(input.id) },
        include: { censo: true, familiar: true, casa: true },
      });
    }),

  getAll: publicProcedure
    .input(z.object({ consejoId: z.number() }))
    .query(async ({ ctx, input }) => {
      const jefes = await ctx.prisma.jefeFamilia.findMany({
        include: {
          censo: true,
        },
      });

      const jefesEnCC = jefes.filter(
        (jefe) => jefe.censo.consejoComunalId === input.consejoId
      );

      return jefesEnCC;
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
          condicionEspecial: z.string().default(""),
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

  changeJefe: publicProcedure
    .input(
      z.object({
        newJefe: z.object({
          numeroDocumento: z.string(),
          tipoDocumento: z.string(),
          email: z.string(),
          telefono: z.string(),
        }),
        idJefe: z.number(),
        idFamiliar: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const infoFamiliar = await ctx.prisma.familiar.findFirst({
        where: {
          id: input.idFamiliar,
        },
      });

      if (!infoFamiliar) return null;

      const infoJefe = await ctx.prisma.jefeFamilia.findFirst({
        where: {
          id: input.idJefe,
        },
      });

      if (!infoJefe) return null;

      const newJefe = await ctx.prisma.jefeFamilia.update({
        where: {
          id: infoJefe?.id,
        },
        data: {
          apellidos: infoFamiliar?.apellidos,
          codCarnetPatria: infoFamiliar?.codCarnetPatria,
          tipoDocumento: input.newJefe.tipoDocumento,
          condicionEspecial: infoFamiliar?.condicionEspecial,
          nombres: infoFamiliar?.nombres,
          numeroDocumento: input.newJefe.numeroDocumento,
          genero: infoFamiliar?.genero,
          telefono: input.newJefe.telefono,
          observacion: infoFamiliar?.observacion,
          fechaNacimiento: infoFamiliar?.fechaNacimiento,
          email: input.newJefe.email,
        },
      });

      const newFamiliar = await ctx.prisma.familiar.update({
        where: {
          id: infoFamiliar.id,
        },
        data: {
          apellidos: infoJefe.apellidos,
          codCarnetPatria: infoJefe.codCarnetPatria,
          condicionEspecial: infoJefe.condicionEspecial,
          fechaNacimiento: infoJefe.fechaNacimiento,
          genero: infoJefe.genero,
          nombres: infoJefe.nombres,
          tipoDocumento: infoJefe.tipoDocumento,
          numeroDocumento: infoJefe.numeroDocumento,
          observacion: infoJefe.observacion,
          serialCarnetPatria: infoJefe.serialCarnetPatria,
          parentesco:
            infoFamiliar.parentesco.at(-1) === "o"
              ? infoFamiliar.parentesco.slice(
                  0,
                  infoFamiliar.parentesco.lastIndexOf("o")
                ) + "a"
              : infoFamiliar.parentesco.slice(
                  0,
                  infoFamiliar.parentesco.lastIndexOf("a")
                ) + "o",
        },
      });

      return { newJefe, newFamiliar };
    }),
});
