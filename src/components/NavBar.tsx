import { Button, Dropdown, Navbar } from "@nextui-org/react";
import NavbarContent from "@nextui-org/react/types/navbar/navbar-content";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import routesHref from "~/utils/routesNavBar";

export const NavBar = () => {
  const { data , status} = useSession();
  const router = useRouter()
  
  return (
    <Navbar variant={"sticky"} css={{ mx: "auto" }}>
      {status === "unauthenticated" && (
        <Navbar.Content className="flex gap-x-6" hideIn="sm">
          {routesHref
            .filter(({ needAuth }) => !needAuth)
            .map(({ href, pathName }) => (
                <Navbar.Link
                  key={pathName}
                  href={href}
                  isActive={pathName === router.route}
                  className="text-lg text-blue-400 transition-all hover:text-blue-200"
                >
                  {pathName}
                </Navbar.Link>
              
            ))}
        </Navbar.Content>
      )}

      {status === "authenticated" && (
        <Navbar.Content className="flex gap-x-6" hideIn="sm">
          {routesHref
            .filter(({ needAuth }) => needAuth)
            .map(({ href, pathName }) => (
              <Navbar.Link
                  key={pathName}
                  href={href}
                  isActive={href === router.route}
                  className="text-lg text-blue-400 transition-all hover:text-blue-200"
                >
                  {pathName}
                </Navbar.Link>
              
            ))}
        </Navbar.Content>
      )}

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
                <Dropdown.Item key={"editUser"}>
                  <Link href={"/profile"}>Mi cuenta</Link>
                </Dropdown.Item>
              </Dropdown.Section>
              <Dropdown.Section>
                <Dropdown.Item key="logout" color="error">
                  {data && (
                    <Button
                      className="w-full bg-inherit "
                      onClick={() => {
                        signOut({ callbackUrl: "/login" })
                          .then(() => {
                            console.log("signed out");
                          })
                          .catch((err) => {
                            console.error(err);
                          });
                      }}
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
