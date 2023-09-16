import { type ReactNode, type PropsWithChildren } from "react";

interface Props {
  className?: string;
  children?: ReactNode;
}

export const LayoutContent = ({ children, className }: Props) => {
  return (
    <main className={`min-h-screen  ${!!className ? className : ""}`}>
      {children}
    </main>
  );
};
