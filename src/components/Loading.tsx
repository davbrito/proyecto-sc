import { Spinner } from "@nextui-org/react";
import { clsx } from "clsx";

interface Props {
  className?: string;
}

export const CustomLoading = ({ className }: Props) => {
  return (
    <Spinner
      size="lg"
      label="Cargando..."
      className={clsx(
        className,
        "mx-auto my-4 flex w-fit rounded-xl  bg-opacity-75 px-4 py-3 text-center backdrop-blur-sm"
      )}
    />
  );
};
