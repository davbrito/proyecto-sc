import React from "react";
import { type JefeProps } from "./GreatForm";
import { type FieldErrors, type UseFormRegister } from "react-hook-form";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { ESTADOS_TRABAJOS } from "~/utils/estado_trabajo";

interface Props {
  register: UseFormRegister<JefeProps>;
  errors: FieldErrors<JefeProps>;
}

export const TrabajoForm = ({ register, errors }: Props) => {
  return (
    <div className="grid grid-cols-12 gap-2">
      <div className="col-span-4">
        <Input
          fullWidth
          label="Nivel educativo? "
          placeholder="Escriba el nivel educativo."
          type="text"
          {...register("trabajo.nivel_educativo", {
            required: "Este campo es obligatorio",
          })}
          autoFocus
          isInvalid={!!errors?.trabajo?.nivel_educativo}
          errorMessage={errors?.trabajo?.nivel_educativo?.message}
        />
      </div>
      <div className="col-span-8">
        <Input
          fullWidth
          label="Profesion:"
          placeholder="Describa lo que estudio."
          type="text"
          {...register("trabajo.profesion")}
          autoFocus
          isInvalid={!!errors?.trabajo?.profesion}
          errorMessage={errors?.trabajo?.profesion?.message}
        />
      </div>

      <div className="col-span-6">
        <Input
          fullWidth
          label="Ocupacion:"
          placeholder="Describa lo que hace."
          type="text"
          {...register("trabajo.ocupacion", {
            required: "Este campo es obligatorio",
          })}
          autoFocus
          isInvalid={!!errors?.trabajo?.ocupacion}
          errorMessage={errors?.trabajo?.ocupacion?.message}
        />
      </div>

      <div className="col-span-6">
        <Input
          fullWidth
          label="Estudia? (describa en caso de si):"
          placeholder="Describa lo que estudio."
          type="text"
          {...register("trabajo.estudiando")}
          autoFocus
          isInvalid={!!errors?.trabajo?.estudiando}
          errorMessage={errors?.trabajo?.estudiando?.message}
        />
      </div>

      <div className="col-span-6">
        <Input
          fullWidth
          label="Realiza deporte? (describa en caso de si):"
          placeholder="Describa el deporte."
          type="text"
          {...register("trabajo.deporte")}
          autoFocus
          isInvalid={!!errors?.trabajo?.deporte}
          errorMessage={errors?.trabajo?.deporte?.message}
        />
      </div>

      <div className="col-span-6">
        <Select
          {...register("trabajo.trabaja", {
            required: { message: "Este campo es requerido", value: true },
          })}
          items={ESTADOS_TRABAJOS}
          label="Sector de trabajo:"
          errorMessage={errors.trabajo?.trabaja?.message}
          isInvalid={!!errors.trabajo?.trabaja}
        >
          {(trabajo) => (
            <SelectItem key={trabajo.key}>{trabajo.label}</SelectItem>
          )}
        </Select>
      </div>
    </div>
  );
};
