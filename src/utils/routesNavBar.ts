import { type ROLE } from "@prisma/client";

interface RouteHref {
  href: string;
  pathName: string;
  needAuth: boolean;
  role_user?: ROLE[];
  needId?: boolean;
}

const routesHref: Array<RouteHref> = [
  {
    href: "/",
    pathName: "Home",
    needAuth: true,
    role_user: ["LIDER_CALLE", "ADMIN", "LIDER_COMUNIDAD"],
  },
  {
    href: "/login",
    pathName: "Iniciar sesion",
    needAuth: false,
  },
  {
    href: "/register",
    pathName: "Registrarse",
    needAuth: false,
  },
  {
    href: "/consejo-comunal",
    pathName: "Consejos Comunales",
    needAuth: true,
    role_user: ["ADMIN"],
  },
  {
    href: "/consejo-comunal/:id",
    pathName: "Consejo Comunal",
    needAuth: true,
    role_user: ["LIDER_COMUNIDAD"],
    needId: true,
  },
  {
    href: "/consejo-comunal/:id/censo",
    needAuth: true,
    pathName: "Censo",
    needId: true,
    role_user: ["LIDER_COMUNIDAD", "LIDER_CALLE"],
  },
  {
    href: "/users",
    pathName: "Usuarios",
    needAuth: true,
    role_user: ["ADMIN"],
  },
  {
    href: "/casas",
    pathName: "Casas",
    needAuth: true,
    role_user: ["ADMIN"],
  },
  {
    href: "/familiares",
    pathName: "Familiares",
    needAuth: true,
    role_user: ["ADMIN"],
  },
];

export default routesHref;
