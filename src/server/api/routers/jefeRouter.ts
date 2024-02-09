import {
  CONDICION_VIVIENDA,
  ESTADO_CIVIL,
  ESTADO_TRABAJO,
} from "@prisma/client";
import { createReactProxyDecoration } from "@trpc/react-query/shared";
import { TRPCError } from "@trpc/server";
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
          condicion_vivienda: z.nativeEnum(CONDICION_VIVIENDA),
        }),
        documentos: z.object({
          tipoDocumento: z.string(),
          numeroDocumento: z.string(),
          serialCarnetPatria: z.string().default(""),
          codCarnetPatria: z.string().default(""),
          observacion: z.string().default(""),
          discapacidad: z.string().default(""),
          recibe_pension: z.boolean(),
          vacuna_covid: z.boolean(),
          enfermedad_cronica: z.string(),
          carnet_conapdis: z.boolean(),
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
          telefono_habitacion: z.string(),
          estado_civil: z.nativeEnum(ESTADO_CIVIL),
        }),
        trabajo: z.object({
          estudiando: z.string(),
          profesion: z.string(),
          ocupacion: z.string(),
          deporte: z.string(),
          nivel_educativo: z.string(),
          trabaja: z.nativeEnum(ESTADO_TRABAJO),
        }),
        consejoComunalId: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { casa, documentos, jefe, consejoComunalId, trabajo } = input;
      const cc = await ctx.prisma.consejoComunal.findUnique({
        where: { id: consejoComunalId },
        include: {
          censos: { include: { jefeFamilia: { include: { casa: true } } } },
        },
      });
      return await ctx.prisma.$transaction(async (prisma) => {
        // const nroMz = newCasa.manzana;

        // const manzanasCC = await ctx.prisma.censo.count({
        //   where: {
        //     consejoComunalId: consejoComunalId,
        //     jefeFamilia: { casa: { manzana: newCasa.manzana } },
        //   },
        // });

        // const secuenciaMz = manzanasCC + 1;

        // const jefes = await ctx.prisma.jefeFamilia.findMany({
        //   orderBy: { id: "desc" },
        //   take: 1,
        // });

        // const secJefe = jefes[0]?.id
        //   ? (jefes[0]?.id + BigInt(1)).toString()
        //   : "1";

        const newJefe = await ctx.prisma.jefeFamilia.create({
          data: {
            nombres: jefe.primerNombre + " " + jefe.segundoNombre,
            apellidos: jefe.primerApellido + " " + jefe.segundoApellido,
            fechaNacimiento: new Date(jefe.fechaNacimiento).toJSON(),
            genero: jefe.genero,
            email: jefe.email,
            telefono: jefe.telefono,
            estado_civil: jefe.estado_civil,
            telefono_habitacion: jefe.telefono_habitacion,

            ...trabajo,
            ...documentos,

            censo: {
              create: {
                // id: `${nroMz.padStart(2, "0")}${secJefe.padStart(
                //   3,
                //   "0"
                // )}${secuenciaMz.toString().padStart(4, "0")}`,
                consejoComunal: {
                  connect: { id: consejoComunalId },
                },
                condicion_vivienda: casa.condicion_vivienda,
              },
            },
            casa: {
              create: {
                calle: casa.calle,
                manzana: casa.manzana,
                casa: casa.casa,
              },
            },
          },
        });
      });
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
    .input(
      z.object({ consejoId: z.number(), casas: z.boolean().default(false) })
    )
    .query(async ({ ctx, input }) => {
      const jefes = await ctx.prisma.jefeFamilia.findMany({
        include: {
          censo: true,
          casa: input.casas,
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

      const jefeDeleted = await ctx.prisma.jefeFamilia.delete({
        where: {
          id: input.id,
        },
      });

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
          discapacidad: z.string().default(""),
          recibe_pension: z.boolean(),
          vacuna_covid: z.boolean(),
          enfermedad_cronica: z.string(),
          carnet_conapdis: z.boolean(),
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
          telefono_habitacion: z.string(),
          estado_civil: z.nativeEnum(ESTADO_CIVIL),
        }),
        trabajo: z.object({
          estudiando: z.string(),
          profesion: z.string(),
          ocupacion: z.string(),
          deporte: z.string(),
          nivel_educativo: z.string(),
          trabaja: z.nativeEnum(ESTADO_TRABAJO),
        }),
        id: z.bigint(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { documentos, id, jefe, trabajo } = input;
      const jefeUpdated = await ctx.prisma.jefeFamilia.update({
        where: {
          id,
        },
        data: {
          nombres: jefe.primerNombre + " " + jefe.segundoNombre,
          apellidos: jefe.primerApellido + " " + jefe.segundoApellido,
          fechaNacimiento: new Date(jefe.fechaNacimiento).toJSON(),
          genero: jefe.genero,
          email: jefe.email,
          telefono: jefe.telefono,

          telefono_habitacion: jefe.telefono_habitacion,
          estado_civil: jefe.estado_civil,
          ...documentos,
          ...trabajo,
        },
      });

      return jefeUpdated;
    }),
  // TRabajo
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
          email: input.newJefe.email,
          telefono: input.newJefe.telefono,
          numeroDocumento: input.newJefe.numeroDocumento,
          tipoDocumento: input.newJefe.tipoDocumento,
          apellidos: infoFamiliar?.apellidos,
          codCarnetPatria: infoFamiliar?.codCarnetPatria,
          discapacidad: infoFamiliar?.discapacidad,
          nombres: infoFamiliar?.nombres,
          genero: infoFamiliar?.genero,
          observacion: infoFamiliar?.observacion,
          fechaNacimiento: infoFamiliar?.fechaNacimiento,
          deporte: infoFamiliar.deporte,
          enfermedad_cronica: infoFamiliar.enfermedad_cronica,
          estado_civil: infoFamiliar.estado_civil,
          estudiando: infoFamiliar.estudiando,
          nivel_educativo: infoFamiliar.nivel_educativo,
          ocupacion: infoFamiliar.ocupacion,
          trabaja: infoFamiliar.trabaja,
          vacuna_covid: infoFamiliar.vacuna_covid,
          serialCarnetPatria: infoFamiliar.serialCarnetPatria,
          recibe_pension: infoFamiliar.recibe_pension,
          profesion: infoFamiliar.profesion,
        },
      });

      const newFamiliar = await ctx.prisma.familiar.update({
        where: {
          id: infoFamiliar.id,
        },
        data: {
          apellidos: infoJefe.apellidos,
          codCarnetPatria: infoJefe.codCarnetPatria,
          discapacidad: infoJefe.discapacidad,
          fechaNacimiento: infoJefe.fechaNacimiento,
          genero: infoJefe.genero,
          nombres: infoJefe.nombres,
          tipoDocumento: infoJefe.tipoDocumento,
          numeroDocumento: infoJefe.numeroDocumento,
          observacion: infoJefe.observacion,
          serialCarnetPatria: infoJefe.serialCarnetPatria,
          deporte: infoJefe.deporte,
          email: infoJefe.email,
          enfermedad_cronica: infoJefe.enfermedad_cronica,
          estado_civil: infoJefe.estado_civil,
          estudiando: infoJefe.estudiando,
          nivel_educativo: infoJefe.nivel_educativo,
          ocupacion: infoJefe.ocupacion,
          profesion: infoJefe.profesion,
          recibe_pension: infoJefe.recibe_pension,
          trabaja: infoJefe.trabaja,
          telefono: infoJefe.telefono,
          vacuna_covid: infoJefe.vacuna_covid,

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
  // getWithCasas: publicProcedure
  //   .input(z.object({ consejoId: z.number() }))
  //   .query(async ({ ctx, input }) => {
  //     const { consejoId } = input;

  //     return await ctx.prisma.

  //   }),
});
