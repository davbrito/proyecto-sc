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

  return (
    <Navbar className="mx-auto bg-content2 shadow-medium" shouldHideOnScroll>
      <NavbarContent>
        <NavbarMenuToggle className="sm:hidden" />
        <NavbarBrand className="flex items-center gap-3">
          <Image
            src={"/venezuela.ico"}
            width={32}
            height={32}
            alt="logo"
            className=""
          />
          <h1 className="m-0 text-2xl  font-bold text-inherit">CLAP</h1>
        </NavbarBrand>
      </NavbarContent>
      {status === "unauthenticated" && (
        <NavbarContent justify="end">
          {routesHref
            .filter(({ needAuth }) => !needAuth)
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
        <NavbarContent className="hidden gap-x-6 sm:flex">
          {routesHref
            .filter(({ needAuth }) => needAuth)
            .map(({ href, pathName }) => {
              const isActive = href === router.asPath;
              return (
                <NavbarItem key={pathName} isActive={isActive}>
                  <Link
                    href={href}
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
                // src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
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
                      .then(() => {})
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
        <NavbarMenuItem>
          <Link as={NextLink} href="/" color="foreground">
            Home
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link as={NextLink} href="/consejo-comunal" color="foreground">
            Consejos comunales
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};
