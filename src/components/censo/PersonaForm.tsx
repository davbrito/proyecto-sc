import { Input, Select, SelectItem } from "@nextui-org/react";
import {
  type Control,
  Controller,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import { z } from "zod";
import { type JefeProps } from "./GreatForm";

export const PersonaForm = ({
  register,
  errors,
  control,
}: {
  register: UseFormRegister<JefeProps>;
  errors: FieldErrors<JefeProps>;
  control: Control<JefeProps>;
}) => {
  return (
    <div className="grid grid-cols-12 gap-2">
      <div className="col-span-6">
        <Input
          fullWidth
          label="Primer nombre:"
          placeholder="Ej: pedro"
          variant="bordered"
          type="text"
          {...register("datosBasicos.primerNombre", {
            required: { value: true, message: "Campo requerido" },
            pattern: {
              value:
                /^(?=.{1,40}$)[a-zA-ZáéíóúüñÁÉÍÓÚÑ]+(?:[\s][a-zA-ZáéíóúüñÁÉÍÓÚÑ]+)*$/,
              message: "El nombre no es valido",
            },
          })}
          errorMessage={errors?.datosBasicos?.primerNombre?.message}
          isInvalid={!!errors?.datosBasicos?.primerNombre?.message}
        />
      </div>

      <div className="col-span-6">
        <Input
          fullWidth
          label="Segundo nombre:"
          placeholder="Ej: jose"
          variant="bordered"
          type="text"
          {...register("datosBasicos.segundoNombre", {
            pattern: {
              value:
                /^(?=.{1,40}$)[a-zA-ZáéíóúüñÁÉÍÓÚÑ]+(?:[\s][a-zA-ZáéíóúüñÁÉÍÓÚÑ]+)*$/,
              message: "El nombre no es valido",
            },
          })}
          errorMessage={errors?.datosBasicos?.segundoNombre?.message}
          isInvalid={!!errors?.datosBasicos?.segundoNombre?.message}
        />
      </div>

      <div className="col-span-6">
        <Input
          fullWidth
          label="Primer apellido:"
          placeholder="Ej: perez"
          variant="bordered"
          type="text"
          {...register("datosBasicos.primerApellido", {
            required: { value: true, message: "Campo requerido" },
            pattern: {
              value:
                /^(?=.{1,40}$)[a-zA-ZáéíóúüñÁÉÍÓÚÑ]+(?:[\s][a-zA-ZáéíóúüñÁÉÍÓÚÑ]+)*$/,
              message: "El apellido no es valido",
            },
          })}
          errorMessage={errors?.datosBasicos?.primerApellido?.message}
          isInvalid={!!errors?.datosBasicos?.primerApellido?.message}
        />
      </div>

      <div className="col-span-6">
        <Input
          fullWidth
          label="Segundo apellido:"
          placeholder="Ej: jimenez"
          variant="bordered"
          type="text"
          {...register("datosBasicos.segundoApellido", {
            pattern: {
              value:
                /^(?=.{1,40}$)[a-zA-ZáéíóúüñÁÉÍÓÚÑ]+(?:[\s][a-zA-ZáéíóúüñÁÉÍÓÚÑ]+)*$/,
              message: "El apellido no es valido",
            },
          })}
          errorMessage={errors?.datosBasicos?.segundoApellido?.message}
          isInvalid={!!errors?.datosBasicos?.segundoApellido?.message}
        />
      </div>

      <div className="col-span-6">
        <Input
          fullWidth
          label="Fecha de nacimiento:"
          placeholder="Ingrese la fecha de nacimiento..."
          variant="bordered"
          type="date"
          max={new Date().toISOString().split("T")[0]}
          {...register("datosBasicos.fechaNacimiento", {
            required: { value: true, message: "Campo requerido" },
          })}
          errorMessage={errors?.datosBasicos?.fechaNacimiento?.message}
          isInvalid={!!errors?.datosBasicos?.fechaNacimiento?.message}
        />
      </div>

      <div className="col-span-6">
        <Select
          label="Genero:"
          className="max-w-xs"
          {...register("datosBasicos.genero", {
            required: {
              value: true,
              message: "Este campo no puede estar vacio",
            },
          })}
          errorMessage={
            errors?.datosBasicos?.genero && errors.datosBasicos.genero.message
          }
          isInvalid={!!errors?.datosBasicos?.genero}
        >
          <SelectItem key={"f"} value="f">
            Femenino
          </SelectItem>
          <SelectItem key={"m"} value="m">
            Masculino
          </SelectItem>
        </Select>
      </div>

      <div className="col-span-8">
        <Input
          fullWidth
          label="Email:"
          placeholder="Ej: pedro@gmail.com"
          variant="bordered"
          type="text"
          {...register("datosBasicos.email", {
            required: { value: true, message: "Campo requerido" },
            validate(value) {
              if (z.string().email().safeParse(value).success) return true;
              return "La direccion del correo no es valida.";
            },
          })}
          errorMessage={errors?.datosBasicos?.email?.message}
          isInvalid={!!errors?.datosBasicos?.email?.message}
        />
      </div>
      <div className="col-span-4">
        <Controller
          control={control}
          name="datosBasicos.telefono"
          rules={{
            required: { value: true, message: "Campo requerido" },
            pattern: {
              value: /^(0414|0424|0412|0416|0426)[-]\d{7}$/,
              message: "El numero no es valido.",
            },
          }}
          render={({ field, fieldState }) => (
            <Input
              fullWidth
              label="Numero de contacto:"
              placeholder="Ej: 0414-1234567"
              variant="bordered"
              type="text"
              maxLength={12}
              errorMessage={fieldState.error?.message}
              isInvalid={!!fieldState.error?.message}
              {...field}
              value={field.value ?? ""}
              onChange={(e) => {
                let { value } = e.target;
                value = value.replace(/[^\d]/g, "");
                if (value.length > 4) {
                  value = value.slice(0, 4) + "-" + value.slice(4, 11);
                }
                field.onChange(value);
              }}
            />
          )}
        />
      </div>
      <div className="col-span-6">
        <Controller
          control={control}
          name="datosBasicos.telefono_habitacion"
          rules={{
            required: { value: true, message: "Campo requerido" },
            pattern: {
              value: /^(02)(\d{1,2})[-]\d{7}$/,
              message: "El numero no es valido.",
            },
          }}
          render={({ field, fieldState }) => (
            <Input
              fullWidth
              label="Telefono de habitacion:"
              placeholder="Ej: 0286-1234567"
              variant="bordered"
              type="text"
              maxLength={12}
              errorMessage={fieldState.error?.message}
              isInvalid={!!fieldState.error?.message}
              {...field}
              value={field.value ?? ""}
              onChange={(e) => {
                let { value } = e.target;
                value = value.replace(/[^\d]/g, "");
                if (value.length > 4) {
                  value = value.slice(0, 4) + "-" + value.slice(4, 11);
                }
                field.onChange(value);
              }}
            />
          )}
        />
      </div>

      <div className="col-span-6">
        <Select
          label="Estado Civil:"
          className="max-w-xs"
          {...register("datosBasicos.estado_civil", {
            required: {
              value: true,
              message: "Este campo no puede estar vacio",
            },
          })}
          errorMessage={
            errors?.datosBasicos?.estado_civil &&
            errors.datosBasicos.estado_civil.message
          }
          isInvalid={!!errors.datosBasicos?.estado_civil}
        >
          <SelectItem key={"Soltero"} value="Soltero">
            Soltero
          </SelectItem>
          <SelectItem key={"Casado"} value="Casado">
            Casado
          </SelectItem>
          <SelectItem key={"Divorciado"} value="Divorciado">
            Divorciado
          </SelectItem>
          <SelectItem key={"Viudo"} value="Viudo">
            Viudo
          </SelectItem>
        </Select>
      </div>
    </div>
  );
};
