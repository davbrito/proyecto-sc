import { type PropsWithChildren } from "react";
import ChangeTheme from "./ChangeTheme";

export const LayoutContent = ({ children }: PropsWithChildren) => {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center ">
        {children}
      </main>
    </>
  );
};
