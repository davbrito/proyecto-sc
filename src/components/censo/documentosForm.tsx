import {
  Button,
  Card,
  Divider,
  Grid,
  Input,
  Text,
  Textarea,
} from "@nextui-org/react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { api } from "~/utils/api";

interface CasaProps {
  manzana: string;
  casa: string;
  calle: string;
  direccion: string;
}

interface JefeProps {
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  tipoDocumento: string;
  numeroDocumento: string;
  edad: string;
  fechaNacimiento: string;
  genero: string;
  serialCarnetPatria: string;
  codCarnetPatria: string;
  observacion?: string;
  casa: CasaProps;
}

export const DocumentosForm = ({ register, errors }: any) => {
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
            pattern: {
              value: /^[0-9]*$/,
              message: "Debe escribirlo en el siguiente formato: '12345678'",
            },
            maxLength: {
              value: 8,
              message: "Corrija el numero de cedula por favor.",
            },
          })}
          helperText={errors.numeroDocumento?.message}
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
          {...register("documentos.serialCarnetPatria", {
            required: { value: true, message: "Campo requerido" },
          })}
          helperText={errors.serialCarnetPatria?.message}
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
          {...register("documentos.codCarnetPatria", {
            required: { value: true, message: "Campo requerido" },
          })}
          helperText={errors.codCarnetPatria?.message}
          helperColor="error"
        />
      </Grid>

      <Grid xs={12}>
        <Textarea
          fullWidth
          label="Observacion:"
          placeholder="Escriba alguna observacion (opcional)"
          bordered
          {...register("documentos.observacion", {
            required: { value: true, message: "Campo requerido" },
          })}
          helperText={errors.observacion?.message}
          helperColor="error"
        />
      </Grid>
    </Grid.Container>
  );
};
