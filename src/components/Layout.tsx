import { type ReactNode } from "react";

interface Props {
  className?: string;
  children?: ReactNode;
}

export const LayoutContent = ({ children, className }: Props) => {
  return (
    <main
      className={`flex min-h-screen flex-col ${!!className ? className : ""}`}
    >
      {children}
    </main>
  );
};
