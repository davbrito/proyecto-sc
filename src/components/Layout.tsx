import { type PropsWithChildren } from "react";

export const LayoutContent = ({ children }: PropsWithChildren) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center ">
      {children}
    </main>
  );
};
