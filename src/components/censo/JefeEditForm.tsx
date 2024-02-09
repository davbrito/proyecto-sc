import {
  Button,
  Input,
  Select,
  SelectItem,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import {
  type ESTADO_CIVIL,
  type ESTADO_TRABAJO,
  type JefeFamilia,
} from "@prisma/client";
import React from "react";
import { type SubmitHandler, useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { api } from "~/utils/api";
import { Checkbox } from "../Checkbox";
import { ESTADOS_TRABAJOS } from "~/utils/estado_trabajo";

interface EditJefe {
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  fechaNacimiento: string;
  estado_civil: ESTADO_CIVIL;
  telefono_habitacion: string;
  estudiando: string;
  profesion: string;
  ocupacion: string;
  deporte: string;
  nivel_educativo: string;
  trabaja: ESTADO_TRABAJO;
  carnet_conapdis: boolean;
  enfermedad_cronica: string;
  recibe_pension: boolean;
  vacuna_covid: boolean;
  genero: string;
  telefono: string;
  email: string;
  tipoDocumento: string;
  numeroDocumento: string;
  serialCarnetPatria: string;
  codCarnetPatria: string;
  observacion: string;
  discapacidad: string;
}

interface Props {
  jefe: JefeFamilia;
  onClose: () => void;
}

const JefeEditForm = ({ jefe, onClose }: Props) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    control,
    register,
  } = useForm<EditJefe>({
    defaultValues: {
      primerApellido: jefe.apellidos.split(" ")[0],
      segundoApellido: jefe.apellidos.split(" ")[1],
      primerNombre: jefe.nombres.split(" ")[0],
      segundoNombre: jefe.nombres.split(" ")[1],
      codCarnetPatria: jefe.codCarnetPatria,
      email: jefe.email,
      fechaNacimiento: jefe.fechaNacimiento?.toISOString()?.split("T")[0],
      genero: jefe.genero,
      numeroDocumento: jefe.numeroDocumento,
      observacion: jefe.observacion,
      serialCarnetPatria: jefe.serialCarnetPatria,
      telefono: jefe.telefono,
      tipoDocumento: jefe.tipoDocumento,
      estado_civil: jefe.estado_civil,
      carnet_conapdis: jefe.carnet_conapdis,
      deporte: jefe.deporte,
      discapacidad: jefe.discapacidad,
      enfermedad_cronica: jefe.enfermedad_cronica,
      estudiando: jefe.estudiando,
      nivel_educativo: jefe.nivel_educativo,
      ocupacion: jefe.ocupacion,
      profesion: jefe.profesion,
      recibe_pension: jefe.recibe_pension,
      telefono_habitacion: jefe.telefono_habitacion,
      trabaja: jefe.trabaja,
      vacuna_covid: jefe.vacuna_covid,
    },
  });

  const updateJefe = api.jefe.update.useMutation();

  const onSubmit: SubmitHandler<EditJefe> = async (value, event) => {
    event?.preventDefault();

    await updateJefe.mutateAsync(
      {
        id: jefe.id,
        documentos: {
          numeroDocumento: value.numeroDocumento,
          tipoDocumento: value.tipoDocumento,
          codCarnetPatria: value.codCarnetPatria,
          observacion: value.observacion,
          serialCarnetPatria: value.serialCarnetPatria,
          discapacidad: value.discapacidad,
          carnet_conapdis: value.carnet_conapdis,
          enfermedad_cronica: value.enfermedad_cronica,
          recibe_pension: value.recibe_pension,
          vacuna_covid: value.vacuna_covid,
        },
        jefe: {
          email: value.email,
          fechaNacimiento: value.fechaNacimiento,
          genero: value.genero,
          primerApellido: value.primerApellido,
          primerNombre: value.primerNombre,
          segundoApellido: value.segundoApellido,
          segundoNombre: value.segundoNombre,
          telefono: value.telefono,
          estado_civil: value.estado_civil,
          telefono_habitacion: value.telefono_habitacion,
        },
        trabajo: {
          deporte: value.deporte,
          estudiando: value.estudiando,
          nivel_educativo: value.nivel_educativo,
          ocupacion: value.ocupacion,
          profesion: value.profesion,
          trabaja: value.trabaja,
        },
      },
      {
        onSuccess(data, variables, context) {
          onClose();
        },
        onError(error, variables, context) {
          setError("root", { type: "validate", message: error.message });
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="mx-auto my-2 text-xl">Datos personales</h2>
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-6">
          <Controller
            name="primerNombre"
            control={control}
            rules={{
              required: { value: true, message: "Campo requerido" },
              pattern: {
                value:
                  /^(?=.{1,40}$)[a-zA-ZáéíóúüñÁÉÍÓÚÑ]+(?:[\s][a-zA-ZáéíóúüñÁÉÍÓÚÑ]+)*$/,
                message: "El nombre no es valido",
              },
            }}
            render={({ field, fieldState }) => (
              <Input
                fullWidth
                label="Primer nombre:"
                placeholder="Ej: pedro"
                variant="bordered"
                type="text"
                {...field}
                errorMessage={fieldState.error?.message}
                isInvalid={!!fieldState.error}
              />
            )}
          />
        </div>

        <div className="col-span-6">
          <Controller
            control={control}
            name="segundoNombre"
            rules={{
              pattern: {
                value:
                  /^(?=.{1,40}$)[a-zA-ZáéíóúüñÁÉÍÓÚÑ]+(?:[\s][a-zA-ZáéíóúüñÁÉÍÓÚÑ]+)*$/,
                message: "El nombre no es valido",
              },
            }}
            render={({ field, fieldState }) => (
              <Input
                fullWidth
                label="Segundo nombre:"
                placeholder="Ej: jose"
                variant="bordered"
                type="text"
                {...field}
                errorMessage={fieldState.error?.message}
                isInvalid={!!fieldState.error}
              />
            )}
          />
        </div>

        <div className="col-span-6">
          <Controller
            control={control}
            name="primerApellido"
            rules={{
              required: { value: true, message: "Campo requerido" },
              pattern: {
                value:
                  /^(?=.{1,40}$)[a-zA-ZáéíóúüñÁÉÍÓÚÑ]+(?:[\s][a-zA-ZáéíóúüñÁÉÍÓÚÑ]+)*$/,
                message: "El apellido no es valido",
              },
            }}
            render={({ field, fieldState }) => (
              <Input
                fullWidth
                label="Primer apellido:"
                placeholder="Ej: perez"
                variant="bordered"
                type="text"
                {...field}
                errorMessage={fieldState.error?.message}
                isInvalid={!!fieldState.error}
              />
            )}
          />
        </div>

        <div className="col-span-6">
          <Controller
            control={control}
            name="segundoApellido"
            rules={{
              pattern: {
                value:
                  /^(?=.{1,40}$)[a-zA-ZáéíóúüñÁÉÍÓÚÑ]+(?:[\s][a-zA-ZáéíóúüñÁÉÍÓÚÑ]+)*$/,
                message: "El apellido no es valido",
              },
            }}
            render={({ field, fieldState }) => (
              <Input
                fullWidth
                label="Segundo apellido:"
                placeholder="Ej: jimenez"
                variant="bordered"
                type="text"
                {...field}
                errorMessage={fieldState.error?.message}
                isInvalid={!!fieldState.error}
              />
            )}
          />
        </div>

        <div className="col-span-6">
          <Controller
            control={control}
            name="fechaNacimiento"
            rules={{ required: { value: true, message: "Campo requerido" } }}
            render={({ field, fieldState }) => (
              <Input
                fullWidth
                label="Fecha de nacimiento:"
                placeholder="Ingrese la fecha de nacimiento..."
                variant="bordered"
                type="date"
                max={new Date().toISOString().split("T")[0]}
                {...field}
                errorMessage={fieldState.error?.message}
                isInvalid={!!fieldState.error}
              />
            )}
          />
        </div>

        <div className="col-span-6">
          <Controller
            control={control}
            name="genero"
            rules={{
              required: {
                value: true,
                message: "Este campo no puede estar vacio",
              },
            }}
            render={({ field, fieldState }) => (
              <Select
                label="Genero:"
                className="max-w-xs"
                {...field}
                selectedKeys={[field.value]}
                errorMessage={fieldState.error?.message}
                isInvalid={!!fieldState.error}
              >
                <SelectItem key={"f"} value="f">
                  Femenino
                </SelectItem>
                <SelectItem key={"m"} value="m">
                  Masculino
                </SelectItem>
              </Select>
            )}
          />
        </div>

        <div className="col-span-8">
          <Controller
            control={control}
            rules={{
              required: { value: true, message: "Campo requerido" },
              validate(value) {
                if (z.string().email().safeParse(value).success) return true;
                return "La direccion del correo no es valida.";
              },
            }}
            name="email"
            render={({ field, fieldState }) => (
              <Input
                fullWidth
                label="Email:"
                placeholder="Ej: pedro@gmail.com"
                variant="bordered"
                type="text"
                {...field}
                errorMessage={fieldState.error?.message}
                isInvalid={!!fieldState.error}
              />
            )}
          />
        </div>
        <div className="col-span-4">
          <Controller
            control={control}
            name="telefono"
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
            name="telefono_habitacion"
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
                label="Telefono habitacion:"
                placeholder="Ej: 0286-1234567"
                variant="bordered"
                type="text"
                maxLength={12}
                errorMessage={fieldState.error?.message}
                isInvalid={!!fieldState.error?.message}
                {...field}
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
            name="estado_civil"
            rules={{
              required: {
                value: true,
                message: "Este campo no puede estar vacio",
              },
            }}
            render={({ field, fieldState }) => (
              <Select
                label="Estado Civil:"
                className="max-w-xs"
                {...field}
                selectedKeys={[field.value]}
                errorMessage={fieldState.error?.message}
                isInvalid={!!fieldState.error}
              >
                <SelectItem key={"Soltero"}>Soltero</SelectItem>
                <SelectItem key={"Casado"}>Casado</SelectItem>
                <SelectItem key={"Divorciado"}>Divorciado</SelectItem>
                <SelectItem key={"Viudo"}>Viudo</SelectItem>
              </Select>
            )}
          />
        </div>
      </div>
      <h2 className="mx-auto my-2 text-xl">Documentos personales</h2>

      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-4">
          <Controller
            control={control}
            name="tipoDocumento"
            rules={{
              required: {
                message: "Este campo no puede estar vacio",
                value: true,
              },
            }}
            render={({ field, fieldState }) => (
              <Select
                label="Tipo documento:"
                placeholder="Seleccione una opcion"
                {...field}
                isInvalid={!!fieldState.error}
                errorMessage={fieldState.error?.message}
                selectedKeys={field.value}
              >
                <SelectItem key={"v"}>Venezolano</SelectItem>
                <SelectItem key={"e"}>Extranjero</SelectItem>
                <SelectItem key={"f"}>Firma</SelectItem>
              </Select>
            )}
          />
        </div>
        <div className="col-span-8">
          <Controller
            control={control}
            name="numeroDocumento"
            rules={{
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
            }}
            render={({ field, fieldState }) => (
              <Input
                fullWidth
                label="Numero documento:"
                placeholder="Ejemplo: 1234578"
                type="text"
                {...field}
                isInvalid={!!fieldState.error}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
        </div>
        <div className="col-span-6">
          <Controller
            control={control}
            name="serialCarnetPatria"
            render={({ field }) => (
              <Input
                fullWidth
                label="Serial Carnet de la patria:"
                placeholder="Escriba el serial del carnet de la patria..."
                type="text"
                {...field}
              />
            )}
          />
        </div>

        <div className="col-span-6">
          <Controller
            control={control}
            name="codCarnetPatria"
            render={({ field }) => (
              <Input
                fullWidth
                label="Codigo del carnet de la patria:"
                placeholder="Escriba el codigo del carnet de la patria..."
                type="text"
                {...field}
              />
            )}
          />
        </div>

        <div className="col-span-8">
          <Controller
            name="observacion"
            control={control}
            render={({ field }) => (
              <Textarea
                fullWidth
                label="Observacion:"
                placeholder="Escriba alguna observacion (opcional)"
                {...field}
              />
            )}
          />
        </div>

        <div className="col-span-4">
          <Controller
            control={control}
            name="discapacidad"
            render={({ field }) => (
              <Textarea
                fullWidth
                label="Discapacidad:"
                placeholder="Escriba si tiene alguna discapacidad"
                {...field}
              />
            )}
          />
        </div>

        <div className="col-span-12">
          <Controller
            control={control}
            name="enfermedad_cronica"
            render={({ field }) => (
              <Textarea
                fullWidth
                label="Sufre enfermedad cronica? (especifique):"
                placeholder="Escriba si tiene alguna enfermedad cronica"
                {...field}
              />
            )}
          />
        </div>
        <div className="col-span-12 grid grid-cols-12  place-content-center  gap-4">
          <div className="col-span-4">
            <Checkbox
              label="¿Posee Carnet CONAPDIS?"
              name="carnet_conapdis"
              register={register}
            />
          </div>
          <div className="col-span-4">
            <Checkbox
              label="Vacuna COVID"
              name="vacuna_covid"
              register={register}
            />
          </div>
          <div className="col-span-4">
            <Checkbox
              label="¿Recibe pension?"
              name="recibe_pension"
              register={register}
            />
          </div>
        </div>
      </div>

      <h2 className="mx-auto my-2 text-xl">Informacion de trabajo</h2>

      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-4">
          <Controller
            control={control}
            name="nivel_educativo"
            rules={{
              required: "Este campo es obligatorio",
            }}
            render={({ field, fieldState }) => (
              <Input
                fullWidth
                label="Nivel educativo? "
                placeholder="Escriba el nivel educativo."
                type="text"
                {...field}
                autoFocus
              />
            )}
          />
        </div>
        <div className="col-span-8">
          <Controller
            control={control}
            name="profesion"
            render={({ field, fieldState }) => (
              <Input
                fullWidth
                label="Profesion:"
                placeholder="Describa lo que estudio."
                type="text"
                {...field}
                autoFocus
              />
            )}
          />
        </div>

        <div className="col-span-6">
          <Controller
            control={control}
            name="ocupacion"
            rules={{
              required: "Este campo es obligatorio",
            }}
            render={({ field }) => (
              <Input
                fullWidth
                label="Ocupacion:"
                placeholder="Describa lo que hace."
                type="text"
                {...field}
                autoFocus
              />
            )}
          />
        </div>

        <div className="col-span-6">
          <Controller
            control={control}
            name="estudiando"
            render={({ field }) => (
              <Input
                fullWidth
                label="Estudia? (describa en caso de si):"
                placeholder="Describa lo que estudio."
                type="text"
                {...field}
                autoFocus
              />
            )}
          />
        </div>

        <div className="col-span-6">
          <Controller
            control={control}
            name="deporte"
            render={({ field }) => (
              <Input
                fullWidth
                label="Realiza deporte?:"
                placeholder="Describa el deporte."
                type="text"
                {...field}
                autoFocus
              />
            )}
          />
        </div>

        <div className="col-span-6">
          <Controller
            control={control}
            name="trabaja"
            rules={{
              required: { message: "Este campo es requerido", value: true },
            }}
            render={({ field, fieldState }) => (
              <Select
                {...field}
                items={ESTADOS_TRABAJOS}
                label="Sector de trabajo:"
                selectedKeys={[field.value]}
                errorMessage={fieldState.error?.message}
                isInvalid={!!fieldState.error}
              >
                {(trabajo) => (
                  <SelectItem key={trabajo.key}>{trabajo.label}</SelectItem>
                )}
              </Select>
            )}
          />
        </div>
      </div>

      {errors?.root && (
        <h4 className="my-2 block capitalize text-red-600">
          {errors?.root?.message}.
        </h4>
      )}
      <Button
        type="submit"
        fullWidth
        disabled={isSubmitting}
        className=" my-2 bg-blue-600 text-white hover:bg-blue-800 disabled:bg-gray-500"
      >
        {isSubmitting && (
          <Spinner as={"span"} className="mx-4" color={"secondary"} />
        )}
        Actualizar
      </Button>
    </form>
  );
};

export default JefeEditForm;
