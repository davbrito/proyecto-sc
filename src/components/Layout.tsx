import { type ReactNode, type PropsWithChildren } from "react";

interface Props {
  className?: string;
  children?: ReactNode;
}

export const LayoutContent = ({ children, className }: Props) => {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center ${
        !!className ? className : ""
      }`}
    >
      {children}
    </main>
  );
};
