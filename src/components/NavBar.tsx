import { Button, Dropdown, Navbar, Text, useTheme } from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import routesHref from "~/utils/routesNavBar";

export const NavBar = () => {
  const { data, status } = useSession();
  const router = useRouter();
  const { isDark } = useTheme();

  const collapseItems = [
    "Features",
    "Customers",
    "Pricing",
    "Company",
    "Legal",
    "Team",
    "Help & Feedback",
    "Login",
    "Sign Up",
  ];

  return (
    <Navbar
      variant={"sticky"}
      className=""
      shouldHideOnScroll
      isBordered={isDark}
      css={{ mx: "auto", zIndex: "1000" }}
    >
      <Navbar.Toggle showIn={"xs"} aria-label="toggle navigation" />
      <Navbar.Brand className="flex items-center gap-2" as={"div"}>
        <Image
          src={"/venezuela.ico"}
          width={32}
          height={32}
          alt="logo"
          className=""
        />
        <Text h1 b className=" m-0  text-2xl text-inherit">
          CLAP
        </Text>
      </Navbar.Brand>
      {status === "unauthenticated" && (
        <Navbar.Content
          enableCursorHighlight
          className="flex gap-x-6"
          hideIn="sm"
        >
          {routesHref
            .filter(({ needAuth }) => !needAuth)
            .map(({ href, pathName }) => (
              <Navbar.Item key={pathName}>
                <Navbar.Link href={href} isActive={pathName === router.route}>
                  {pathName}
                </Navbar.Link>
              </Navbar.Item>
            ))}
        </Navbar.Content>
      )}

      {status === "authenticated" && (
        <Navbar.Content className="hidden gap-x-6 sm:flex">
          {routesHref
            .filter(({ needAuth }) => needAuth)
            .map(({ href, pathName }) => (
              <Navbar.Link
                key={pathName}
                href={href}
                isActive={href === router.route}
                activeColor={"error"}
              >
                {pathName}
              </Navbar.Link>
            ))}
        </Navbar.Content>
      )}
      <Navbar.Collapse>
        {collapseItems.map((item, index) => (
          <Navbar.CollapseItem key={item}>
            <Link color="inherit" href="#">
              {item}
            </Link>
          </Navbar.CollapseItem>
        ))}
      </Navbar.Collapse>

      <div className="self-center">
        {data?.user && (
          <Dropdown>
            <Dropdown.Button light>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#c4d3ee"
                height="1em"
                viewBox="0 0 448 512"
              >
                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
              </svg>
            </Dropdown.Button>
            <Dropdown.Menu aria-label="Static Actions">
              <Dropdown.Section>
                <Dropdown.Item key={"editUser"} css={{ textAlign: "center" }}>
                  <Link href={"/profile"} className="block w-full">
                    Mi cuenta
                  </Link>
                </Dropdown.Item>
              </Dropdown.Section>
              <Dropdown.Section>
                <Dropdown.Item
                  key="logout"
                  css={{
                    transition: "all 0.3s ease",
                    "&:focus": {
                      backgroundColor: "$red",
                    },
                  }}
                >
                  {data && (
                    <Button
                      className="w-full bg-inherit font-semibold"
                      onClick={() => {
                        signOut({ callbackUrl: "/login" })
                          .then(() => {})
                          .catch((err) => {
                            console.error(err);
                          });
                      }}
                      css={{ color: "$foreground" }}
                    >
                      Cerrar sesion
                    </Button>
                  )}
                </Dropdown.Item>
              </Dropdown.Section>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>
    </Navbar>
  );
};
