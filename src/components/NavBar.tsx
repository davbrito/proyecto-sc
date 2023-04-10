import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

export const NavBar = () => {
  const { data } = useSession();

  return (
    <nav className="mx-auto mt-5 flex w-full max-w-lg justify-between rounded-md border border-solid border-slate-800 bg-slate-600 p-3 font-semibold">
      <ul className="flex gap-x-6">
        <li>
          <Link
            href="/"
            className="text-lg text-blue-400 transition-all hover:text-blue-200"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/login"
            className="text-lg text-blue-400 transition-all hover:text-blue-200"
          >
            Sign in
          </Link>
        </li>
        <li>
          <Link
            href="/register"
            className="text-lg text-blue-400 transition-all hover:text-blue-200"
          >
            Sign up
          </Link>
        </li>
      </ul>

      <div>
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
