import { Spinner } from "@nextui-org/react";
import { clsx } from "clsx";

interface Props {
  className?: string;
}

export const CustomLoading = ({ className }: Props) => {
  return (
    <div className={clsx(className, "container my-4 w-full text-center")}>
      <Spinner size="lg" label="Cargando..." />
    </div>
  );
};
