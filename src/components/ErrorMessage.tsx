import React from "react";
interface Props {
  title?: string;
  body?: string;
}

export const ErrorMessage = ({
  body = "Por favor, intente mas tarde.",
  title = "Ocurrio un error al realizar la peticion.",
}: Props) => {
  return (
    <div
      id="alert-additional-content-2"
      className="mx-auto mb-4 max-w-lg rounded-lg border border-red-300 bg-red-50 p-4 text-red-600 dark:border-red-800 dark:bg-zinc-800 dark:text-red-500"
      role="alert"
    >
      <div className="flex items-center">
        <svg
          className="mr-2 h-4 w-4 flex-shrink-0"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span className="sr-only">Info</span>
        <h3 className="text-lg font-medium">{title}</h3>
      </div>
      <div className="mb-4 mt-2 text-sm">{body}</div>
    </div>
  );
};
