import { Input, Textarea } from "@nextui-org/react";
import React from "react";
import { type FieldErrors, type UseFormRegister } from "react-hook-form";
import { type JefeProps } from "./GreatForm";

interface Props {
  register: UseFormRegister<JefeProps>;
  errors: FieldErrors<JefeProps>;
}

export const DocumentosForm = ({ register, errors }: Props) => {
  return (
    <div className="grid grid-cols-12 gap-1">
      <div className="col-span-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-50 dark:text-white">
            Tipo documento:
          </label>
          <select
            {...register("documentos.tipoDocumento", {
              required: {
                message: "Este campo no puede estar vacio",
                value: true,
              },
            })}
            className="select-form"
          >
            <option value={""} disabled>
              Seleccione una opcion
            </option>
            <option value={"v"}>Venezolano</option>
            <option value={"e"}>Extranjero</option>
            <option value={"f"}>Firma</option>
          </select>
        </div>
      </div>
      <div className="col-span-8">
        <Input
          fullWidth
          label="Cedula:"
          placeholder="Ejemplo: 1234578"
          type="text"
          {...register("documentos.numeroDocumento", {
            required: {
              value: true,
              message: "Este campo es obligatorio",
            },
            pattern: {
              value: /^[0-9]*$/,
              message: "Debe escribirlo en el siguiente formato: '12345678'",
            },
            maxLength: {
              value: 8,
              message: "Corrija el numero de cedula por favor.",
            },
          })}
          isInvalid={!!errors?.documentos?.numeroDocumento}
          errorMessage={errors?.documentos?.numeroDocumento?.message}
        />
      </div>
      <div className="col-span-6">
        <Input
          fullWidth
          label="Serial Carnet de la patria:"
          placeholder="Escriba el serial del carnet de la patria..."
          type="text"
          {...register("documentos.serialCarnetPatria")}
          isInvalid={!!errors?.documentos?.serialCarnetPatria}
          errorMessage={errors?.documentos?.serialCarnetPatria?.message}
        />
      </div>

      <div className="col-span-6">
        <Input
          fullWidth
          label="Codigo del carnet de la patria:"
          placeholder="Escriba el codigo del carnet de la patria..."
          type="text"
          {...register("documentos.codCarnetPatria")}
          isInvalid={!!errors?.documentos?.codCarnetPatria}
          errorMessage={errors?.documentos?.codCarnetPatria?.message}
        />
      </div>

      <div className="col-span-8">
        <Textarea
          fullWidth
          label="Observacion:"
          placeholder="Escriba alguna observacion (opcional)"
          {...register("documentos.observacion")}
          isInvalid={!!errors?.documentos?.observacion}
          errorMessage={errors?.documentos?.observacion?.message}
        />
      </div>
      <div className="col-span-4">
        <Textarea
          fullWidth
          label="Condicion:"
          placeholder="Escriba si tiene alguna condicion especial"
          {...register("documentos.condicionEspecial")}
          isInvalid={!!errors?.documentos?.condicionEspecial}
          errorMessage={errors?.documentos?.condicionEspecial?.message}
        />
      </div>
    </div>
  );
};
