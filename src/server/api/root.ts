import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "./routers/userRouter";
import { familiarRouter } from "./routers/familiarRouter";
import { casaRouter } from "./routers/casaRouter";
import { jefeRouter } from "./routers/jefeRouter";
import { censoRouter } from "./routers/censoRouter";
import { encargadosRouter } from "./routers/encargadosRouter";
import { lideresRouter } from "./routers/liderRouter";
import { consejoRouter } from "./routers/consejoRouter";
import { liderCalleRouter } from "./routers/liderCalleRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  familia: familiarRouter,
  casa: casaRouter,
  jefe: jefeRouter,
  censo: censoRouter,
  encargados: encargadosRouter,
  lider: lideresRouter,
  consejo: consejoRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
