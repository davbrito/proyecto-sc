import { TRPCClientError, createTRPCProxyClient } from "@trpc/client";
import { TRPCError } from "@trpc/server";
import { randomInt } from "crypto";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const censoRouter = createTRPCRouter({
  getCensoInfor: publicProcedure
    .input(z.string().default(""))
    .query(async ({ ctx, input }) => {
      const jefes = await ctx.prisma.censo.findMany({
        orderBy: {
          fecha: "asc",
        },
        take: 20,
        include: {
          jefeFamilia: true,
          casa: true,
        },
        where: {
          id: {
            contains: input,
          },
        },
      });

      return jefes;
    }),
});
