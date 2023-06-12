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
          {...register("datosBasicos.primerNombre", {
            required: { value: true, message: "Campo requerido" },
            pattern: {
              value:
                /^(?=.{1,40}$)[a-zA-ZáéíóúüñÁÉÍÓÚÑ]+(?:[\s][a-zA-ZáéíóúüñÁÉÍÓÚÑ]+)*$/,
              message: "El nombre no es valido",
            },
          })}
          helperText={errors?.datosBasicos?.primerNombre?.message}
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
          {...register("datosBasicos.segundoNombre", {
            required: { value: true, message: "Campo requerido" },
            pattern: {
              value:
                /^(?=.{1,40}$)[a-zA-ZáéíóúüñÁÉÍÓÚÑ]+(?:[\s][a-zA-ZáéíóúüñÁÉÍÓÚÑ]+)*$/,
              message: "El nombre no es valido",
            },
          })}
          helperText={errors?.datosBasicos?.segundoNombre?.message}
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
          {...register("datosBasicos.primerApellido", {
            required: { value: true, message: "Campo requerido" },
            pattern: {
              value:
                /^(?=.{1,40}$)[a-zA-ZáéíóúüñÁÉÍÓÚÑ]+(?:[\s][a-zA-ZáéíóúüñÁÉÍÓÚÑ]+)*$/,
              message: "El apellido no es valido",
            },
          })}
          helperText={errors?.datosBasicos?.primerApellido?.message}
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
          {...register("datosBasicos.segundoApellido", {
            required: { value: true, message: "Campo requerido" },
            pattern: {
              value:
                /^(?=.{1,40}$)[a-zA-ZáéíóúüñÁÉÍÓÚÑ]+(?:[\s][a-zA-ZáéíóúüñÁÉÍÓÚÑ]+)*$/,
              message: "El apellido no es valido",
            },
          })}
          helperText={errors?.datosBasicos?.segundoApellido?.message}
          helperColor="error"
        />
      </Grid>

      <Divider css={{ mt: "1rem" }} />

      <Grid xs={6}>
        <Input
          fullWidth
          label="Fecha de nacimiento:"
          placeholder="Ingrese la fecha de nacimiento..."
          bordered
          type="date"
          max={new Date().toISOString().split("T")[0]}
          {...register("datosBasicos.fechaNacimiento", {
            required: { value: true, message: "Campo requerido" },
          })}
          helperText={errors?.datosBasicos?.fechaNacimiento?.message}
          helperColor="error"
        />
      </Grid>

      <Grid xs={6}>
        <div className="w-full">
          <label className="mb-2 block text-sm font-medium text-gray-50 dark:text-white">
            Genero:
          </label>
          <select
            {...register("datosBasicos.genero", {
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

      <Grid xs={6}>
        <Input
          fullWidth
          label="Email:"
          placeholder="Ej: pedro@gmail.com"
          bordered
          type="text"
          {...register("datosBasicos.email", {
            required: { value: true, message: "Campo requerido" },
            pattern: {
              value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              message: "La direccion del correo no es valida.",
            },
          })}
          helperText={errors?.datosBasicos?.email?.message}
          helperColor="error"
        />
      </Grid>
      <Grid xs={6}>
        <Input
          fullWidth
          label="Numero de contacto:"
          placeholder="Ej: 0414-1234567"
          bordered
          type="text"
          {...register("datosBasicos.telefono", {
            required: { value: true, message: "Campo requerido" },
            pattern: {
              value: /^(0414|0424|0412|0416|0426)[-][0-9]{7}$/,
              message: "El numero no es valido.",
            },
          })}
          helperText={errors?.datosBasicos?.telefono?.message}
          helperColor="error"
        />
      </Grid>
    </Grid.Container>
  );
};
