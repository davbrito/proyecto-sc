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
  getCensoInfor: publicProcedure.query(async ({ ctx }) => {
    const jefes = await ctx.prisma.censo.findMany({
      take: 20,
      include: {
        jefeFamilia: true,
        casa: true,
      },
    });
    return jefes;
  }),
});
