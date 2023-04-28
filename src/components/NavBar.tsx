import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import routesHref from "~/utils/routesNavBar";

export const NavBar = () => {
  const { data } = useSession();

  return (
    <nav className="mx-auto mt-5 flex w-full max-w-2xl justify-between rounded-md border border-solid border-slate-800 bg-slate-600 p-3 font-semibold">
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
          <button
            className="rounded border bg-red-500
                    px-3 py-2 text-red-800 transition-colors hover:bg-red-400"
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
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};
