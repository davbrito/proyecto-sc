import {
  Button,
  Divider,
  Input,
  Select,
  SelectItem,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import { type Familiar } from "@prisma/client";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { api } from "~/utils/api";
import { CustomLoading } from "../Loading";

interface OtrosProps {
  tipoDocumento: string;
  numeroDocumento: string;
  serialCarnetPatria: string;
  codCarnetPatria: string;
  observacion?: string;
  condicionEspecial?: string;
}

export interface BasicDataProps {
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  fechaNacimiento: string;
  genero: string;
}

export interface FamiliarFormData {
  datosBasicos: BasicDataProps;
  documentos: OtrosProps;
  jefeId: string;
  parentesco: string;
}

const initialValues = {
  documentos: {
    codCarnetPatria: "",
    numeroDocumento: "",
    observacion: "",
    serialCarnetPatria: "",
    tipoDocumento: "v",
  },
  datosBasicos: {
    edad: "",
    fechaNacimiento: "",
    genero: "f",
    primerApellido: "",
    primerNombre: "",
    segundoApellido: "",
    segundoNombre: "",
  },
  jefeId: "",
  parentesco: "",
};

interface FamiliarFormProps {
  jefeId?: bigint;
  familia?: Familiar;
  consejoId: string;
  closeModal?: () => void;
}

const FamiliarForm: NextPage<FamiliarFormProps> = ({
  jefeId,
  familia,
  consejoId,
  closeModal,
}) => {
  const {
    register,
    reset,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FamiliarFormData>({
    defaultValues: !familia
      ? { ...initialValues, jefeId: jefeId ? jefeId.toString() : "" }
      : {
          datosBasicos: {
            fechaNacimiento: familia.fechaNacimiento
              .toISOString()
              .split("T")[0],
            genero: familia.genero,
            primerApellido: familia.apellidos.split(" ")[0],
            primerNombre: familia.nombres.split(" ")[0],
            segundoApellido: familia.apellidos.split(" ")[1],
            segundoNombre: familia.nombres.split(" ")[1],
          },
          documentos: {
            codCarnetPatria: familia.codCarnetPatria,
            numeroDocumento: familia.numeroDocumento,
            observacion: familia.observacion,
            serialCarnetPatria: familia.serialCarnetPatria,
            tipoDocumento: familia.tipoDocumento,
            condicionEspecial: familia.condicionEspecial,
          },
          parentesco: familia.parentesco,
          jefeId: familia.jefeFamiliaId.toString(),
        },
  });

  const router = useRouter();
  const { data, isLoading } = api.jefe.getAll.useQuery(
    { consejoId: parseInt(consejoId) },
    {
      cacheTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
    }
  );
  const addFamiliar = api.familia.addNew.useMutation();
  const editFamiliar = api.familia.update.useMutation();

  const onSubmit: SubmitHandler<FamiliarFormData> = async (values, event) => {
    event?.preventDefault();

    if (!familia) {
      await addFamiliar.mutateAsync(
        {
          documentos: values.documentos,
          familiar: {
            fechaNacimiento: values.datosBasicos.fechaNacimiento,
            genero: values.datosBasicos.genero,
            primerNombre: values.datosBasicos.primerNombre,
            primerApellido: values.datosBasicos.primerApellido,
            segundoApellido: values.datosBasicos.segundoApellido,
            segundoNombre: values.datosBasicos.segundoNombre,
          },
          jefe: {
            jefeId: BigInt(values.jefeId),
            parentesco: values.parentesco,
          },
        },
        {
          onError(error, variables, context) {
            setError("root", { type: "validate", message: error.message });
            reset(initialValues, { keepErrors: true });
          },
          onSuccess(data, variables, context) {
            reset(initialValues, { keepTouched: false, keepDirty: false });
            if (closeModal) closeModal();
            else router.push(`/censo/${data.newFamiliar.jefeFamiliaId}`);
          },
        }
      );
    } else {
      await editFamiliar.mutateAsync(
        {
          documentos: values.documentos,
          familiar: {
            fechaNacimiento: values.datosBasicos.fechaNacimiento,
            genero: values.datosBasicos.genero,
            primerNombre: values.datosBasicos.primerNombre,
            primerApellido: values.datosBasicos.primerApellido,
            segundoApellido: values.datosBasicos.segundoApellido,
            segundoNombre: values.datosBasicos.segundoNombre,
          },
          jefe: {
            jefeId: BigInt(values.jefeId),
            parentesco: values.parentesco,
          },
          id: familia.id,
        },
        {
          onSuccess(data, variables, context) {
            closeModal && closeModal();
          },
          onError(error, variables, context) {
            setError("root", { type: "validate", message: error.message });
          },
        }
      );
    }
  };

  if (isLoading) return <CustomLoading className="place-content-center" />;

  if (!data) return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mx-auto w-fit">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-6">
            <Input
              fullWidth
              label="Primer nombre:"
              placeholder="Ej: pedro"
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
              isInvalid={!!errors?.datosBasicos?.primerNombre}
            />
          </div>

          <div className="col-span-6">
            <Input
              fullWidth
              label="Segundo nombre:"
              placeholder="Ej: jose"
              type="text"
              {...register("datosBasicos.segundoNombre", {
                pattern: {
                  value:
                    /^(?=.{1,40}$)[a-zA-ZáéíóúüñÁÉÍÓÚÑ]+(?:[\s][a-zA-ZáéíóúüñÁÉÍÓÚÑ]+)*$/,
                  message: "El nombre no es valido",
                },
              })}
              errorMessage={errors?.datosBasicos?.segundoNombre?.message}
              isInvalid={!!errors?.datosBasicos?.segundoNombre}
            />
          </div>

          <div className="col-span-6">
            <Input
              fullWidth
              label="Primer apellido:"
              placeholder="Ej: perez"
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
              isInvalid={!!errors?.datosBasicos?.primerApellido}
            />
          </div>

          <div className="col-span-6">
            <Input
              fullWidth
              label="Segundo apellido:"
              placeholder="Ej: jimenez"
              type="text"
              {...register("datosBasicos.segundoApellido", {
                pattern: {
                  value:
                    /^(?=.{1,40}$)[a-zA-ZáéíóúüñÁÉÍÓÚÑ]+(?:[\s][a-zA-ZáéíóúüñÁÉÍÓÚÑ]+)*$/,
                  message: "El apellido no es valido",
                },
              })}
              errorMessage={errors?.datosBasicos?.segundoApellido?.message}
              isInvalid={!!errors?.datosBasicos?.segundoApellido}
            />
          </div>

          <div className="col-span-6">
            <Input
              fullWidth
              label="Fecha de nacimiento:"
              placeholder="Ingrese la fecha de nacimiento..."
              type="date"
              max={new Date().toISOString().split("T")[0]}
              {...register("datosBasicos.fechaNacimiento", {
                required: { value: true, message: "Campo requerido" },
              })}
              errorMessage={errors?.datosBasicos?.fechaNacimiento?.message}
              isInvalid={!!errors?.datosBasicos?.fechaNacimiento}
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
              selectedKeys={familia?.genero}
              errorMessage={errors?.datosBasicos?.genero?.message}
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
        </div>
        <Divider className="my-2" />

        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-4">
            <Select
              label="Tipo documento:"
              className="max-w-xs"
              placeholder="Seleccione una opcion"
              {...register("documentos.tipoDocumento")}
              selectedKeys={familia?.tipoDocumento}
              errorMessage={errors?.documentos?.tipoDocumento?.message}
              isInvalid={!!errors?.documentos?.tipoDocumento}
            >
              <SelectItem value={"v"} key={"v"}>
                Venezolano
              </SelectItem>
              <SelectItem value={"e"} key={"e"}>
                Extranjero
              </SelectItem>
              <SelectItem value={"f"} key={"f"}>
                Firma
              </SelectItem>
            </Select>
          </div>
          <div className="col-span-8">
            <Input
              fullWidth
              label="Cedula:"
              placeholder="Ejemplo: 1234578"
              type="text"
              {...register("documentos.numeroDocumento", {
                pattern: {
                  value: /^[0-9]*$/,
                  message:
                    "Debe escribirlo en el siguiente formato: '12345678'",
                },
              })}
              errorMessage={errors?.documentos?.numeroDocumento?.message}
              isInvalid={!!errors?.documentos?.numeroDocumento}
            />
          </div>
          <div className="col-span-6">
            <Input
              fullWidth
              label="Serial Carnet de la patria:"
              placeholder="Escriba el serial del carnet de la patria..."
              type="text"
              {...register("documentos.serialCarnetPatria")}
              errorMessage={errors?.documentos?.serialCarnetPatria?.message}
              isInvalid={!!errors?.documentos?.serialCarnetPatria}
            />
          </div>

          <div className="col-span-6">
            <Input
              fullWidth
              label="Codigo del carnet de la patria:"
              placeholder="Escriba el codigo del carnet de la patria..."
              type="text"
              {...register("documentos.codCarnetPatria")}
              errorMessage={errors?.documentos?.codCarnetPatria?.message}
              isInvalid={!!errors?.documentos?.codCarnetPatria}
            />
          </div>

          <div className="col-span-12">
            <Textarea
              fullWidth
              label="Observacion:"
              placeholder="Escriba alguna observacion (opcional)"
              {...register("documentos.observacion")}
              errorMessage={errors?.documentos?.observacion?.message}
              isInvalid={!!errors?.documentos?.observacion}
            />
          </div>
        </div>

        <Divider className="my-2" />
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-4">
            <Input
              fullWidth
              label="Parentesco:"
              placeholder="Ej: hijo"
              type="text"
              {...register("parentesco", {
                required: {
                  value: true,
                  message: "El parentesco es requerido",
                },
              })}
              errorMessage={errors.parentesco?.message}
              isInvalid={!!errors.parentesco}
            />
          </div>
          <div className="col-span-8">
            <Select
              fullWidth
              label="Jefe de Familia:"
              {...register("jefeId", {
                required: {
                  value: true,
                  message: "El jefe de familia es requerido",
                },
              })}
              items={data}
              errorMessage={errors?.jefeId?.message}
              isInvalid={!!errors?.jefeId}
              selectedKeys={jefeId?.toString()}
            >
              {({ id, nombres, apellidos, tipoDocumento, numeroDocumento }) => (
                <SelectItem key={id.toString()}>
                  {apellidos.toUpperCase() +
                    ", " +
                    nombres.toUpperCase() +
                    " " +
                    tipoDocumento.toUpperCase() +
                    "-" +
                    numeroDocumento}
                </SelectItem>
              )}
            </Select>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-2 w-fit">
        {errors?.root && (
          <h4 className="inline-block capitalize text-red-600">
            {errors?.root?.message}.
          </h4>
        )}
        <Button
          disabled={isSubmitting}
          type="submit"
          className=" mt-2 bg-blue-600 text-white hover:bg-blue-800 disabled:bg-gray-600"
          size={"lg"}
        >
          {isSubmitting && (
            <Spinner as="span" color={"secondary"} className="mx-4" />
          )}
          {!familia ? "Agregar familiar" : "Actualizar familiar"}
        </Button>
      </div>
    </form>
  );
};

export default FamiliarForm;
