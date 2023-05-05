import { Divider, Grid, Input } from "@nextui-org/react";
import React from "react";

export const PersonaForm = ({ register, errors, getFieldState }: any) => {
  return (
    <Grid.Container gap={2}>
      <Grid xs={6}>
        <Input
          fullWidth
          label="Primer nombre:"
          placeholder="Ej: pedro"
          bordered
          type="text"
          {...register("datosBasicosJefe.primerNombre", {
            required: { value: true, message: "Campo requerido" },
            pattern: {
              value:
                /^(?=.{1,40}$)[a-zA-ZáéíóúüñÁÉÍÓÚÑ]+(?:[\s][a-zA-ZáéíóúüñÁÉÍÓÚÑ]+)*$/,
              message: "El nombre no es valido",
            },
          })}
          helperText={errors?.datosBasicosJefe?.primerNombre?.message}
          helperColor="error"
        />
      </Grid>

      <Grid xs={6}>
        <Input
          fullWidth
          label="Segundo nombre:"
          placeholder="Ej: jose"
          bordered
          type="text"
          {...register("datosBasicosJefe.segundoNombre", {
            required: { value: true, message: "Campo requerido" },
            pattern: {
              value:
                /^(?=.{1,40}$)[a-zA-ZáéíóúüñÁÉÍÓÚÑ]+(?:[\s][a-zA-ZáéíóúüñÁÉÍÓÚÑ]+)*$/,
              message: "El nombre no es valido",
            },
          })}
          helperText={errors?.datosBasicosJefe?.segundoNombre?.message}
          helperColor="error"
        />
      </Grid>

      <Grid xs={6}>
        <Input
          fullWidth
          label="Primer apellido:"
          placeholder="Ej: perez"
          bordered
          type="text"
          {...register("datosBasicosJefe.primerApellido", {
            required: { value: true, message: "Campo requerido" },
            pattern: {
              value:
                /^(?=.{1,40}$)[a-zA-ZáéíóúüñÁÉÍÓÚÑ]+(?:[\s][a-zA-ZáéíóúüñÁÉÍÓÚÑ]+)*$/,
              message: "El apellido no es valido",
            },
          })}
          helperText={errors?.datosBasicosJefe?.primerApellido?.message}
          helperColor="error"
        />
      </Grid>

      <Grid xs={6}>
        <Input
          fullWidth
          label="Segundo apellido:"
          placeholder="Ej: jimenez"
          bordered
          type="text"
          {...register("datosBasicosJefe.segundoApellido", {
            required: { value: true, message: "Campo requerido" },
            pattern: {
              value:
                /^(?=.{1,40}$)[a-zA-ZáéíóúüñÁÉÍÓÚÑ]+(?:[\s][a-zA-ZáéíóúüñÁÉÍÓÚÑ]+)*$/,
              message: "El apellido no es valido",
            },
          })}
          helperText={errors?.datosBasicosJefe?.segundoApellido?.message}
          helperColor="error"
        />
      </Grid>

      <Divider css={{ mt: "1rem" }} />

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
          placeholder="18"
          bordered
          type="text"
          {...register("datosBasicosJefe.edad", {
            required: { value: true, message: "Campo requerido" },
            pattern: {
              value: /^[0-9]*$/,
              message: "La edad debe estar en numeros",
            },
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
