import { ESTADO_TRABAJO } from "@prisma/client";

export const ESTADOS_TRABAJOS = Object.keys(ESTADO_TRABAJO).map((trabajo) => ({
  label: trabajo.replace("_", " "),
  key: trabajo,
}));
