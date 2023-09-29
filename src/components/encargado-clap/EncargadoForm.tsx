import {
  Button,
  Divider,
  Input,
  Select,
  SelectItem,
  Spinner,
} from "@nextui-org/react";
import React from "react";
import { useForm } from "react-hook-form";
import { api } from "~/utils/api";

interface EncargadoData {
  cargo: string;
  primerNombre: string;
  segundoNombre: string;

  primerApellido: string;
  segundoApellido: string;

  tipoDocumento: string;
  numeroDocumento: string;

  codigoTelefono: string;
  telefono: string;
  profesion: string;
  email: string;
}

interface Props {
  consejoId: number;
  oldData?: {
    apellidos: string;
    cargo: string;
    cedula: string;
    id: number;
    email: string;
    profesion: string;
    telefono: string;
    nombres: string;
  };
  closeModal?: () => void;
}

const initialValues = {
  cargo: "",
  codigoTelefono: "",
  telefono: "",
  email: "",
  tipoDocumento: "",
  numeroDocumento: "",
  primerApellido: "",
  primerNombre: "",
  profesion: "",
  segundoApellido: "",
  segundoNombre: "",
};

const item = [
  { key: "0412" },
  { key: "0414" },
  { key: "0416" },
  { key: "0424" },
  { key: "0426" },
];

export const EncargadoForm = ({ consejoId, oldData, closeModal }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, defaultValues },
    setError,
    watch,
  } = useForm<EncargadoData>({
    defaultValues: !oldData
      ? initialValues
      : {
          cargo: oldData?.cargo,
          codigoTelefono: oldData?.telefono.slice(0, 4),
          telefono: oldData?.telefono.slice(4),
          email: oldData?.email,
          tipoDocumento: oldData?.cedula.slice(0, 1),
          numeroDocumento: oldData?.cedula.slice(1),
          primerApellido: oldData?.apellidos.split(" ")[0],
          primerNombre: oldData?.nombres.split(" ")[0],
          profesion: oldData?.profesion,
          segundoApellido: oldData?.apellidos.split(" ")[1],
          segundoNombre: oldData?.nombres.split(" ")[1],
        },
  });

  const { mutate, isLoading } = api.encargados.create.useMutation();
  const editEncargado = api.encargados.update.useMutation();

  const onSubmit = handleSubmit(async (data, event) => {
    event?.preventDefault();
    if (!oldData) {
      mutate(
        {
          apellidos: data.primerApellido + " " + data.segundoApellido,
          cargo: data.cargo,
          cedula: data.tipoDocumento + data.numeroDocumento,
          consejoComunalId: consejoId,
          email: data.email,
          nombres: data.primerNombre + " " + data.segundoNombre,
          profesion: data.profesion,
          telefono: data.codigoTelefono + data.telefono,
        },
        {
          onSuccess(data, variables, context) {
            closeModal && closeModal();
          },
          onError(error, variables, context) {
            if (typeof error === "string") {
              setError("root", { message: error });
            } else if (error instanceof Error) {
              setError("root", { message: error.message });
            }
          },
        }
      );
    } else {
      try {
        await editEncargado.mutateAsync({
          id: oldData.id,
          newInfo: {
            apellidos: data.primerApellido + " " + data.segundoApellido,
            cargo: data.cargo,
            cedula: data.tipoDocumento + data.numeroDocumento,
            email: data.email,
            nombres: data.primerNombre + " " + data.segundoNombre,
            profesion: data.profesion,
            telefono: data.codigoTelefono + data.telefono,
          },
        });
        closeModal && closeModal();
      } catch (error) {
        if (typeof error === "string") {
          setError("root", { message: error });
        } else if (error instanceof Error) {
          setError("root", { message: error.message });
        }
      }
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-6">
          <Input
            type="text"
            label="Primer nombre:"
            placeholder="Ej:pedro"
            {...register("primerNombre", {
              required: {
                value: true,
                message: "El nombre es requerido",
              },
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
            label="Segundo nombre:"
            placeholder="Ej:jose"
            {...register("segundoNombre", {
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
            label="Primer Apellido:"
            placeholder="Ej:perez"
            {...register("primerApellido", {
              required: {
                value: true,
                message: "El apellido es requerido",
              },
              pattern: {
                value:
                  /^(?=.{1,40}$)[a-zA-ZáéíóúüñÁÉÍÓÚÑ]+(?:[\s][a-zA-ZáéíóúüñÁÉÍÓÚÑ]+)*$/,
                message: "El nombre no es valido",
              },
            })}
            isInvalid={!!errors.primerApellido}
            errorMessage={errors.primerApellido?.message}
          />
        </div>
        <div className="col-span-6">
          <Input
            label="Segundo apellido:"
            placeholder="Ej:bolivar"
            {...register("segundoApellido", {
              pattern: {
                value:
                  /^(?=.{1,40}$)[a-zA-ZáéíóúüñÁÉÍÓÚÑ]+(?:[\s][a-zA-ZáéíóúüñÁÉÍÓÚÑ]+)*$/,
                message: "El nombre no es valido",
              },
            })}
            isInvalid={!!errors.segundoApellido}
            errorMessage={errors.segundoApellido?.message}
          />
        </div>
      </div>
      <Divider className="my-2" />
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-2">
          <Select
            label="Tipo:"
            placeholder="Ej: v"
            {...register("tipoDocumento", {
              required: { value: true, message: "Es requerido" },
            })}
            isInvalid={!!errors.tipoDocumento}
            errorMessage={errors.tipoDocumento?.message}
            selectedKeys={oldData?.cedula[0]}
          >
            <SelectItem key={"v"}>V</SelectItem>
            <SelectItem key={"e"}>E</SelectItem>
            <SelectItem key={"p"}>P</SelectItem>
            <SelectItem key={"j"}>J</SelectItem>
            <SelectItem key={"g"}>G</SelectItem>
          </Select>
        </div>
        <div className="col-span-4">
          <Input
            label="Numero documento:"
            placeholder="Ej: 1234567"
            {...register("numeroDocumento", {
              required: {
                value: true,
                message: "El numero documento es requerido",
              },
            })}
            isInvalid={!!errors.numeroDocumento}
            errorMessage={errors.numeroDocumento?.message}
          />
        </div>
        <div className="col-span-2">
          <Select
            label="Codigo:"
            placeholder="Ej: 0414"
            {...register("codigoTelefono", {
              required: {
                value: true,
                message: "El codigo es requerido",
              },
            })}
            items={item}
            isInvalid={!!errors.codigoTelefono}
            errorMessage={errors.codigoTelefono?.message}
            selectedKeys={[watch("codigoTelefono")]}
          >
            {(item) => <SelectItem key={item.key}>{item.key}</SelectItem>}
          </Select>
        </div>
        <div className="col-span-4">
          <Input
            label="Telefono:"
            placeholder="Ej:1234567"
            {...register("telefono", {
              required: {
                value: true,
                message: "El numero de telefono es requerido",
              },
              pattern: {
                value: /[0-9]{7}$/,
                message: "El numero no es valido.",
              },
            })}
            isInvalid={!!errors.telefono}
            errorMessage={errors.telefono?.message}
          />
        </div>
        <div className="col-span-4">
          <Input
            label="Cargo:"
            placeholder="Ej: director"
            {...register("cargo", {
              required: {
                value: true,
                message: "El cargo es requerida",
              },
              pattern: {
                value:
                  /^(?=.{1,40}$)[a-zA-ZáéíóúüñÁÉÍÓÚÑ]+(?:[\s][a-zA-ZáéíóúüñÁÉÍÓÚÑ]+)*$/,
                message: "El nombre no es valido",
              },
            })}
            isInvalid={!!errors.cargo}
            errorMessage={errors.cargo?.message}
          />
        </div>
        <div className="col-span-4">
          <Input
            label="Profesion:"
            placeholder="Ej: licenciado"
            {...register("profesion", {
              required: {
                value: true,
                message: "La profesion es requerida",
              },
              pattern: {
                value:
                  /^(?=.{1,40}$)[a-zA-ZáéíóúüñÁÉÍÓÚÑ]+(?:[\s][a-zA-ZáéíóúüñÁÉÍÓÚÑ]+)*$/,
                message: "El nombre no es valido",
              },
            })}
            isInvalid={!!errors.profesion}
            errorMessage={errors.profesion?.message}
          />
        </div>
        <div className="col-span-4">
          <Input
            label="Email:"
            placeholder="Ej: pedro@gmail.com"
            {...register("email", {
              required: {
                value: true,
                message: "La profesion es requerida",
              },
              pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: "La direccion del correo no es valida.",
              },
            })}
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
          />
        </div>
      </div>
      <div>
        {errors?.root && (
          <h4 className="mx-auto inline-block text-sm capitalize italic text-red-600">
            {errors?.root?.message}.
          </h4>
        )}
        <Button
          disabled={isLoading || editEncargado.isLoading}
          fullWidth
          type="submit"
          className="my-2 bg-blue-600  font-semibold text-white hover:bg-blue-800 disabled:bg-blue-950"
        >
          {isLoading && (
            <Spinner as="span" color={"secondary"} className="mx-4" />
          )}{" "}
          {editEncargado.isLoading && (
            <Spinner as="span" color={"secondary"} className="mx-4" />
          )}{" "}
          {!oldData ? "Crear" : "Actualizar"}
        </Button>
      </div>
    </form>
  );
};
