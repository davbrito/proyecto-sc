import { Divider, Grid, Input } from "@nextui-org/react";
import React from "react";

export const PersonaForm = ({ register, errors, getFieldState }: any) => {
  const verify = () => {
    return getFieldState("datosBasicosJefe");
  };

  return (
    <Grid.Container gap={2}>
      <Grid xs={6}>
        <Input
          fullWidth
          label="Primer nombre:"
          placeholder="Escriba los nombres..."
          bordered
          type="text"
          {...register("datosBasicosJefe.primerNombre", {
            required: { value: true, message: "Campo requerido" },
          })}
          helperText={errors?.datosBasicosJefe?.primerNombre?.message}
          helperColor="error"
        />
      </Grid>

      <Grid xs={6}>
        <Input
          fullWidth
          label="Segundo nombre:"
          placeholder="Escriba los nombres..."
          bordered
          type="text"
          {...register("datosBasicosJefe.segundoNombre", {
            required: { value: true, message: "Campo requerido" },
          })}
          helperText={errors?.datosBasicosJefe?.segundoNombre?.message}
          helperColor="error"
        />
      </Grid>

      <Grid xs={6}>
        <Input
          fullWidth
          label="Primer apellido:"
          placeholder="Escriba los apellidos..."
          bordered
          type="text"
          {...register("datosBasicosJefe.primerApellido", {
            required: { value: true, message: "Campo requerido" },
          })}
          helperText={errors?.datosBasicosJefe?.primerApellido?.message}
          helperColor="error"
        />
      </Grid>

      <Grid xs={6}>
        <Input
          fullWidth
          label="Primer apellido:"
          placeholder="Escriba los apellidos..."
          bordered
          type="text"
          {...register("datosBasicosJefe.segundoApellido", {
            required: { value: true, message: "Campo requerido" },
          })}
          helperText={errors?.datosBasicosJefe?.segundoApellido?.message}
          helperColor="error"
        />
      </Grid>

      <Divider css={{ my: "$6" }} />

      <Grid xs={4}>
        <Input
          fullWidth
          label="Fecha de nacimiento:"
          placeholder="Ingrese la fecha de nacimiento..."
          bordered
          type="date"
          {...register("datosBasicosJefe.fechaNacimiento", {
            required: { value: true, message: "Campo requerido" },
          })}
          helperText={errors?.datosBasicosJefe?.fechaNacimiento?.message}
          helperColor="error"
        />
      </Grid>

      <Grid xs={4}>
        <Input
          fullWidth
          label="Edad:"
          placeholder="Escriba la edad..."
          bordered
          type="text"
          {...register("datosBasicosJefe.edad", {
            required: { value: true, message: "Campo requerido" },
          })}
          helperText={errors?.datosBasicosJefe?.edad?.message}
          helperColor="error"
        />
      </Grid>

      <Grid xs={4}>
        <div className="w-full">
          <label className="mb-2 block text-sm font-medium text-gray-50 dark:text-white">
            Genero:
          </label>
          <select
            {...register("datosBasicosJefe.genero", {
              required: {
                value: true,
                message: "Este campo no puede estar vacio",
              },
            })}
            className="select-form"
          >
            <option value="f">Femenino</option>
            <option value="m">Masculino</option>
          </select>
        </div>
      </Grid>
    </Grid.Container>
  );
};
