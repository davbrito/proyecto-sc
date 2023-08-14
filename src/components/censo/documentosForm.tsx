import { Grid, Input, Textarea } from "@nextui-org/react";
import React from "react";
import { type FieldErrors, type UseFormRegister } from "react-hook-form";
import { type JefeProps } from "./GreatForm";

interface Props {
  register: UseFormRegister<JefeProps>;
  errors: FieldErrors<JefeProps>;
}

export const DocumentosForm = ({ register, errors }: Props) => {
  return (
    <Grid.Container gap={1}>
      <Grid xs={4}>
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
      </Grid>
      <Grid xs={8}>
        <Input
          fullWidth
          label="Cedula:"
          placeholder="Ejemplo: 1234578"
          bordered
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
          helperText={errors?.documentos?.numeroDocumento?.message}
          helperColor="error"
        />
      </Grid>
      <Grid xs={6}>
        <Input
          fullWidth
          label="Serial Carnet de la patria:"
          placeholder="Escriba el serial del carnet de la patria..."
          bordered
          type="text"
          {...register("documentos.serialCarnetPatria")}
          helperText={errors?.documentos?.serialCarnetPatria?.message}
          helperColor="error"
        />
      </Grid>

      <Grid xs={6}>
        <Input
          fullWidth
          label="Codigo del carnet de la patria:"
          placeholder="Escriba el codigo del carnet de la patria..."
          bordered
          type="text"
          {...register("documentos.codCarnetPatria")}
          helperText={errors?.documentos?.codCarnetPatria?.message}
          helperColor="error"
        />
      </Grid>

      <Grid xs={8}>
        <Textarea
          fullWidth
          label="Observacion:"
          placeholder="Escriba alguna observacion (opcional)"
          bordered
          {...register("documentos.observacion")}
          helperText={errors?.documentos?.observacion?.message}
          helperColor="error"
        />
      </Grid>
      <Grid xs={4}>
        <Textarea
          fullWidth
          label="Condicion:"
          placeholder="Escriba si tiene alguna condicion especial"
          bordered
          {...register("documentos.condicionEspecial")}
          helperText={errors?.documentos?.condicionEspecial?.message}
          helperColor="error"
        />
      </Grid>
    </Grid.Container>
  );
};
