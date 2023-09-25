import { type ReactNode } from "react";

interface Props {
  className?: string;
  children?: ReactNode;
}

export const LayoutContent = ({ children, className }: Props) => {
  return (
    <main
      className={`flex min-h-screen flex-col bg-slate-200 px-2 dark:bg-slate-700 md:p-0 ${
        !!className ? className : ""
      }`}
    >
      {children}
    </main>
  );
};
