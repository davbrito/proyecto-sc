import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import routesHref from "~/utils/routesNavBar";

export const NavBar = () => {
  const { data, status } = useSession();
  const router = useRouter();
  const role_user = data?.user.role_user;
  const consejo = data?.user.consejoComunalId;

  return (
    <Navbar className="mx-auto bg-content2 shadow-medium" shouldHideOnScroll>
      <NavbarContent>
        <NavbarMenuToggle className="sm:hidden" />
        <NavbarBrand
          className="flex items-center gap-3 text-black dark:text-white"
          as={Link}
          href={"/"}
        >
          <Image
            src={"/venezuela.ico"}
            width={32}
            height={32}
            alt="logo"
            className=""
          />

          <h1 className="app-brand-title m-0  text-2xl font-bold  text-inherit">
            CLAP
          </h1>
        </NavbarBrand>
      </NavbarContent>
      {status === "unauthenticated" && (
        <NavbarContent justify="end" className="hidden gap-x-4  sm:flex">
          {routesHref
            .filter(({ needAuth }) => !needAuth)
            // .filter(({ role_user }) => role_user === role_user)
            .map(({ href, pathName }) => {
              return (
                <NavbarItem key={pathName} isActive={href === router.asPath}>
                  <Link color="foreground" href={href} isBlock as={NextLink}>
                    {pathName}
                  </Link>
                </NavbarItem>
              );
            })}
        </NavbarContent>
      )}

      {status === "authenticated" && (
        <NavbarContent justify="center" className="hidden gap-x-2 sm:flex">
          {routesHref
            .filter(({ needAuth }) => needAuth)
            .filter((ruta) => {
              if (!ruta.role_user) return true;
              if (!role_user) return false;

              return ruta.role_user.includes(role_user);
            })
            .map(({ href, pathName, needId }) => {
              if (needId && !consejo) return null;
              const route = !needId
                ? href
                : `${href.replace(":id", `${consejo}`)}`;

              const isActive = route === router.asPath;
              return (
                <NavbarItem key={pathName} isActive={isActive}>
                  <Link
                    href={route}
                    color={isActive ? "primary" : "foreground"}
                    isBlock
                    as={NextLink}
                  >
                    {pathName}
                  </Link>
                </NavbarItem>
              );
            })}
        </NavbarContent>
      )}
      <NavbarContent justify="end">
        {data?.user && (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                size="sm"
                src={data.user.image || ""}
              />
            </DropdownTrigger>
            <DropdownMenu variant="flat">
              <DropdownItem
                key="profile"
                onPress={() => {
                  router.push("/profile");
                }}
              >
                Mi cuenta
              </DropdownItem>
              {data && (
                <DropdownItem
                  key="logout"
                  color="danger"
                  className="text-danger"
                  onPress={() => {
                    signOut({ callbackUrl: "/login" })
                      .then(() => { })
                      .catch((err) => {
                        console.error(err);
                      });
                  }}
                >
                  Cerrar sesión
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        )}
      </NavbarContent>
      <NavbarMenu>

        {status === "authenticated" &&
          routesHref
            .filter(({ needAuth }) => needAuth)
            // .filter((ruta) => ruta.role_user === role_user)
            .filter((ruta) => {
              if (!ruta.role_user) return true;
              if (!role_user) return false;
              return ruta.role_user.includes(role_user);
            })
            .map(({ href, pathName,needId }) => {
              if (needId && !consejo) return null;
              const route = !needId
                ? href
                : `${href.replace(":id", `${consejo}`)}`;

              return (
                <NavbarMenuItem key={pathName}>
                  <Link color="foreground" href={route} isBlock as={NextLink} >
                    {pathName}
                  </Link>
                </NavbarMenuItem>
              );
            })}

        {status === "unauthenticated" &&
          routesHref
            .filter(({ needAuth }) => !needAuth)
            .map(({ href, pathName }) => {
              return (
                <NavbarMenuItem key={pathName}>
                  <Link color="foreground" href={href} isBlock as={NextLink}>
                    {pathName}
                  </Link>
                </NavbarMenuItem>
              );
            })}
      </NavbarMenu>
    </Navbar>
  );
};
