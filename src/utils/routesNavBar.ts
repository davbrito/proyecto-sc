interface RouteHref {
  href: string;
  pathName: string;
}

const routesHref: Array<RouteHref> = [
  {
    href: "/",
    pathName: "Home",
  },
  {
    href: "/login",
    pathName: "Sign in",
  },
  {
    href: "/register",
    pathName: "Sign up",
  },
  {
    href: "/censo",
    pathName: "Datos de Censo",
  },
];

export default routesHref;
