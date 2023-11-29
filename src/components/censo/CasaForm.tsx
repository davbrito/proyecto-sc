import { Input, Select, SelectItem } from "@nextui-org/react";
import {
  type FieldErrors,
  type UseFormRegister,
  type UseFormWatch,
} from "react-hook-form";
import { type JefeProps } from "./GreatForm";
import { CONDICION_VIVIENDA } from "@prisma/client";

const condicion_vivienda = Object.keys(CONDICION_VIVIENDA).map((vivienda) => ({
  key: vivienda,
  label: vivienda,
}));

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
    <div className="grid grid-cols-6 gap-2">
      <Input
        className="col-span-6"
        autoFocus={false}
        fullWidth
        label="Numero o nombre de calle:"
        placeholder="Escriba el numero o nombre de calle..."
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
        className="col-span-2"
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
        className="col-span-4"
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

      <Select
        className="col-span-6"
        fullWidth
        label="Condicion de vivienda:"
        items={condicion_vivienda}
        placeholder="Seleccione una opcion."
        {...register("casa.condicion_vivienda", {
          required: "Este campo es requerido",
        })}
        errorMessage={
          errors.casa?.condicion_vivienda &&
          errors.casa.condicion_vivienda?.message
        }
        color={errors.casa?.condicion_vivienda && "danger"}
      >
        {(condicion) => (
          <SelectItem key={condicion.key}>{condicion.label}</SelectItem>
        )}
      </Select>
    </div>
  );
};
