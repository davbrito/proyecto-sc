import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
  Select,
  SelectItem,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import { type JefeFamilia } from "@prisma/client";
import React from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { api } from "~/utils/api";

interface EditJefe {
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  fechaNacimiento: string;
  genero: string;
  telefono: string;
  email: string;
  tipoDocumento: string;
  numeroDocumento: string;
  serialCarnetPatria: string;
  codCarnetPatria: string;
  observacion: string;
}

interface Props {
  jefe: JefeFamilia;
  onClose: () => void;
}

const JefeEditForm = ({ jefe, onClose }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
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
          <Input
            fullWidth
            label="Primer nombre:"
            placeholder="Ej: pedro"
            type="text"
            {...register("primerNombre", {
              required: { value: true, message: "Campo requerido" },
              pattern: {
                value:
                  /^(?=.{1,40}$)[a-zA-ZáéíóúüñÁÉÍÓÚÑ]+(?:[\s][a-zA-ZáéíóúüñÁÉÍÓÚÑ]+)*$/,
                message: "El nombre no es valido",
              },
            })}
            isInvalid={!!errors.primerNombre}
            errorMessage={errors.primerNombre?.message}
          />
        </div>

        <div className="col-span-6">
          <Input
            fullWidth
            label="Segundo nombre:"
            placeholder="Ej: jose"
            type="text"
            {...register("segundoNombre", {
              required: { value: true, message: "Campo requerido" },
              pattern: {
                value:
                  /^(?=.{1,40}$)[a-zA-ZáéíóúüñÁÉÍÓÚÑ]+(?:[\s][a-zA-ZáéíóúüñÁÉÍÓÚÑ]+)*$/,
                message: "El nombre no es valido",
              },
            })}
            isInvalid={!!errors.segundoNombre}
            errorMessage={errors.segundoNombre?.message}
          />
        </div>

        <div className="col-span-6">
          <Input
            fullWidth
            label="Primer apellido:"
            placeholder="Ej: perez"
            type="text"
            {...register("primerApellido", {
              required: { value: true, message: "Campo requerido" },
              pattern: {
                value:
                  /^(?=.{1,40}$)[a-zA-ZáéíóúüñÁÉÍÓÚÑ]+(?:[\s][a-zA-ZáéíóúüñÁÉÍÓÚÑ]+)*$/,
                message: "El apellido no es valido",
              },
            })}
            isInvalid={!!errors.primerApellido}
            errorMessage={errors.primerApellido?.message}
          />
        </div>

        <div className="col-span-6">
          <Input
            fullWidth
            label="Segundo apellido:"
            placeholder="Ej: jimenez"
            type="text"
            {...register("segundoApellido", {
              required: { value: true, message: "Campo requerido" },
              pattern: {
                value:
                  /^(?=.{1,40}$)[a-zA-ZáéíóúüñÁÉÍÓÚÑ]+(?:[\s][a-zA-ZáéíóúüñÁÉÍÓÚÑ]+)*$/,
                message: "El apellido no es valido",
              },
            })}
            isInvalid={!!errors.segundoApellido}
            errorMessage={errors.segundoApellido?.message}
          />
        </div>

        <div className="col-span-6">
          <Input
            fullWidth
            label="Fecha de nacimiento:"
            placeholder="Ingrese la fecha de nacimiento..."
            type="date"
            max={new Date().toISOString().split("T")[0]}
            {...register("fechaNacimiento", {
              required: { value: true, message: "Campo requerido" },
            })}
            isInvalid={!!errors.fechaNacimiento}
            errorMessage={errors.fechaNacimiento?.message}
          />
        </div>

        <div className="col-span-6">
          <Select
            label="Genero:"
            placeholder="Seleccione el genero"
            {...register("genero", {
              required: {
                value: true,
                message: "Este campo no puede estar vacio",
              },
            })}
            isInvalid={!!errors.genero}
            errorMessage={errors.genero?.message}
            defaultSelectedKeys={jefe.genero}
          >
            <SelectItem key="f">Femenino</SelectItem>
            <SelectItem key="m">Masculino</SelectItem>
          </Select>
        </div>

        <div className="col-span-6">
          <Input
            fullWidth
            label="Email:"
            placeholder="Ej: pedro@gmail.com"
            type="text"
            {...register("email", {
              required: { value: true, message: "Campo requerido" },
              pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: "La direccion del correo no es valida.",
              },
            })}
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
          />
        </div>
        <div className="col-span-6">
          <Input
            fullWidth
            label="Numero de contacto:"
            placeholder="Ej: 0414-1234567"
            type="text"
            {...register("telefono", {
              required: { value: true, message: "Campo requerido" },
              pattern: {
                value: /^(0414|0424|0412|0416|0426)[-][0-9]{7}$/,
                message: "El numero no es valido.",
              },
            })}
            isInvalid={!!errors.telefono}
            errorMessage={errors.telefono?.message}
          />
        </div>
      </div>

      <h2 className="mx-auto my-2 text-xl">Documentos personales</h2>

      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-4">
          <Select
            label="Tipo documento:"
            placeholder="Seleccione una opcion"
            {...register("tipoDocumento", {
              required: {
                message: "Este campo no puede estar vacio",
                value: true,
              },
            })}
            isInvalid={!!errors.tipoDocumento}
            errorMessage={errors.tipoDocumento?.message}
            selectedKeys={jefe.tipoDocumento}
          >
            <SelectItem key={"v"}>Venezolano</SelectItem>
            <SelectItem key={"e"}>Extranjero</SelectItem>
            <SelectItem key={"f"}>Firma</SelectItem>
          </Select>
        </div>
        <div className="col-span-8">
          <Input
            fullWidth
            label="Numero documento:"
            placeholder="Ejemplo: 1234578"
            type="text"
            {...register("numeroDocumento", {
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
            isInvalid={!!errors.numeroDocumento}
            errorMessage={errors.numeroDocumento?.message}
          />
        </div>
        <div className="col-span-6">
          <Input
            fullWidth
            label="Serial Carnet de la patria:"
            placeholder="Escriba el serial del carnet de la patria..."
            type="text"
            {...register("serialCarnetPatria")}
            isInvalid={!!errors.serialCarnetPatria}
            errorMessage={errors.serialCarnetPatria?.message}
          />
        </div>

        <div className="col-span-6">
          <Input
            fullWidth
            label="Codigo del carnet de la patria:"
            placeholder="Escriba el codigo del carnet de la patria..."
            type="text"
            {...register("codCarnetPatria")}
            isInvalid={!!errors.codCarnetPatria}
            errorMessage={errors.codCarnetPatria?.message}
          />
        </div>

        <div className="col-span-12">
          <Textarea
            fullWidth
            label="Observacion:"
            placeholder="Escriba alguna observacion (opcional)"
            {...register("observacion")}
            isInvalid={!!errors.observacion}
            errorMessage={errors.observacion?.message}
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
        className=" my-2 bg-blue-600 hover:bg-blue-800 disabled:bg-gray-500"
      >
        {isSubmitting && (
          <Spinner as={"span"} className="mx-4" color={"secondary"} />
        )}
        Actualizar.
      </Button>
    </form>
  );
};

export default JefeEditForm;
