import { Input } from "@nextui-org/react";
import {
  type FieldErrors,
  type UseFormRegister,
  type UseFormWatch,
} from "react-hook-form";
import { type JefeProps } from "./GreatForm";

export const CasaForm = ({
  register,
  errors,
  watch,
}: {
  register: UseFormRegister<JefeProps>;
  errors: FieldErrors<JefeProps>;
  watch: UseFormWatch<JefeProps>;
}) => {
  return (
    <div className="grid grid-cols-3">
      <Input
        autoFocus={false}
        fullWidth
        label="N° Calle:"
        placeholder="Escriba el numero de calle..."
        {...register("casa.calle", {
          required: {
            message: "Este campo no puede estar vacio",
            value: true,
          },
        })}
        errorMessage={errors?.casa?.calle?.message}
        isInvalid={!!errors?.casa?.calle}
      />
      <Input
        autoFocus={false}
        fullWidth
        label="N° Manzana:"
        placeholder="Escriba el numero de manzana..."
        {...register("casa.manzana", {
          required: {
            message: "Este campo no puede estar vacio",
            value: true,
          },
        })}
        isInvalid={!!errors?.casa?.manzana}
        errorMessage={errors?.casa?.manzana?.message}
      />

      <Input
        fullWidth
        autoFocus={false}
        label="N° Casa:"
        placeholder="Escriba el numero de casa..."
        {...register("casa.casa", {
          required: {
            message: "Este campo no puede estar vacio",
            value: true,
          },
        })}
        errorMessage={errors?.casa?.casa?.message}
        isInvalid={!!errors?.casa?.casa}
      />
    </div>
  );
};
