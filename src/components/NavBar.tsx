import { Button, Navbar } from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import routesHref from "~/utils/routesNavBar";

export const NavBar = () => {
  const { data } = useSession();

  return (
    <Navbar variant={"sticky"} css={{ mx: "auto" }}>
      {!data?.user && (
        <ul className="flex gap-x-6">
          {routesHref
            .filter(({ needAuth }) => !needAuth)
            .map(({ href, pathName }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-lg text-blue-400 transition-all hover:text-blue-200"
                >
                  {pathName}
                </Link>
              </li>
            ))}
        </ul>
      )}

      {data?.user && (
        <ul className="flex gap-x-6">
          {routesHref
            .filter(({ needAuth }) => needAuth)
            .map(({ href, pathName }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-lg text-blue-400 transition-all hover:text-blue-200"
                >
                  {pathName}
                </Link>
              </li>
            ))}
        </ul>
      )}

      <div className="self-center">
        {data && (
          <Button
            color="error"
            onPress={() => {
              signOut({ callbackUrl: "/login" })
                .then(() => {
                  console.log("signed out");
                })
                .catch((err) => {
                  console.error(err);
                });
            }}
          >
            Logout
          </Button>
        )}
      </div>
    </Navbar>
  );
};
