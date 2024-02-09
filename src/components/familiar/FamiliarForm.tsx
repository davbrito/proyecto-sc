import {
  Button,
  Divider,
  Input,
  Select,
  SelectItem,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import { ESTADO_TRABAJO, ESTADO_CIVIL, type Familiar } from "@prisma/client";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import { api } from "~/utils/api";
import { CustomLoading } from "../Loading";
import { z } from "zod";
import { Checkbox } from "../Checkbox";

interface OtrosProps {
  tipoDocumento: string;
  numeroDocumento: string;
  serialCarnetPatria: string;
  codCarnetPatria: string;
  observacion?: string;
  discapacidad?: string;

  enfermedad_cronica: string;
  recibe_pension: boolean;
  vacuna_covid: boolean;
}

export interface BasicDataProps {
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  fechaNacimiento: string;
  genero: string;
  telefono: string;
  email: string;
  estado_civil: ESTADO_CIVIL;
}

export interface TrabajoProps {
  profesion: string;
  ocupacion: string;
  trabaja: ESTADO_TRABAJO;
  nivel_educativo: string;
  estudiando: string;
  deporte: string;
}

export interface FamiliarFormData {
  datosBasicos: BasicDataProps;
  documentos: OtrosProps;
  trabajo: TrabajoProps;
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
    discapacidad: "",
    enfermedad_cronica: "",
    recibe_pension: false,
    vacuna_covid: false,
  },
  datosBasicos: {
    edad: "",
    fechaNacimiento: "",
    genero: "f",
    primerApellido: "",
    primerNombre: "",
    segundoApellido: "",
    segundoNombre: "",
    email: "",
    estado_civil: ESTADO_CIVIL.Soltero,
    telefono: "",
  },
  trabajo: {
    deporte: "",
    estudiando: "",
    nivel_educativo: "",
    ocupacion: "",
    profesion: "",
    trabaja: ESTADO_TRABAJO.NO_TRABAJA,
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

const estado_trabajo = Object.keys(ESTADO_TRABAJO).map((trabajo) => ({
  label: trabajo.replace("_", " "),
  key: trabajo,
}));

const FamiliarForm: NextPage<FamiliarFormProps> = ({
  jefeId,
  familia,
  consejoId,
  closeModal,
}) => {
  console.log(familia, "error");
  const {
    register,
    reset,
    handleSubmit,
    setError,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FamiliarFormData>({
    defaultValues: !familia
      ? {
          ...initialValues,
          jefeId: jefeId ? jefeId.toString() : "",
        }
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
            email: familia.email,
            estado_civil: familia.estado_civil,
            telefono: familia.telefono,
          },
          documentos: {
            codCarnetPatria: familia.codCarnetPatria,
            discapacidad: familia.discapacidad,
            enfermedad_cronica: familia.enfermedad_cronica,
            numeroDocumento: familia.numeroDocumento,
            observacion: familia.observacion,
            recibe_pension: familia.recibe_pension,
            serialCarnetPatria: familia.serialCarnetPatria,
            tipoDocumento: familia.tipoDocumento,
            vacuna_covid: familia.vacuna_covid,
          },
          trabajo: {
            deporte: familia.deporte,
            estudiando: familia.estudiando,
            nivel_educativo: familia.nivel_educativo,
            ocupacion: familia.ocupacion,
            profesion: familia.profesion,
            trabaja: familia.trabaja,
          },
          parentesco: familia.parentesco,
          jefeId: jefeId ? jefeId.toString() : "",
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

  console.log(watch("datosBasicos.primerNombre"));
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
            email: values.datosBasicos.email,
            estado_civil: values.datosBasicos.estado_civil,
            telefono: values.datosBasicos.telefono,
          },
          trabajo: values.trabajo,
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
            email: values.datosBasicos.email,
            estado_civil: values.datosBasicos.estado_civil,
            telefono: values.datosBasicos.telefono,
          },
          trabajo: values.trabajo,
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
            <Controller
              name="datosBasicos.primerNombre"
              control={control}
              rules={{
                required: "El nombre es requerido",
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
                  isInvalid={fieldState.invalid}
                />
              )}
            />
          </div>

          <div className="col-span-6">
            <Controller
              name="datosBasicos.segundoNombre"
              control={control}
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
                  type="text"
                  {...field}
                  variant="bordered"
                  errorMessage={fieldState.error?.message}
                  isInvalid={!!fieldState.error}
                />
              )}
            />
          </div>

          <div className="col-span-6">
            <Controller
              name="datosBasicos.primerApellido"
              control={control}
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
                  type="text"
                  variant="bordered"
                  {...field}
                  errorMessage={fieldState.error?.message}
                  isInvalid={!!fieldState.error}
                />
              )}
            />
          </div>

          <div className="col-span-6">
            <Controller
              name="datosBasicos.segundoApellido"
              control={control}
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
                  type="text"
                  variant="bordered"
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
              name="datosBasicos.fechaNacimiento"
              rules={{
                required: { value: true, message: "Campo requerido" },
              }}
              render={({ field, fieldState }) => (
                <Input
                  fullWidth
                  label="Fecha de nacimiento:"
                  placeholder="Ingrese la fecha de nacimiento..."
                  type="date"
                  variant="bordered"
                  max={new Date().toISOString().split("T")[0]}
                  {...field}
                  errorMessage={fieldState.error?.message}
                  isInvalid={!!fieldState.error}
                />
              )}
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

          <div className="col-span-4">
            <Controller
              control={control}
              name="datosBasicos.email"
              rules={{
                validate(value) {
                  if (z.string().email().safeParse(value).success) return true;
                  return "La direccion del correo no es valida.";
                },
              }}
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
              name="datosBasicos.telefono"
              rules={{
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

          <div className="col-span-4">
            <Controller
              control={control}
              name="datosBasicos.estado_civil"
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
                  errorMessage={fieldState.error?.message}
                  isInvalid={!!fieldState.error}
                  selectedKeys={[field.value]}
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
              )}
            />
          </div>
        </div>
        <Divider className="my-2" />

        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-4">
            <Controller
              control={control}
              name="documentos.tipoDocumento"
              render={({ field, fieldState }) => (
                <Select
                  label="Tipo documento:"
                  className="max-w-xs"
                  placeholder="Seleccione una opcion"
                  {...field}
                  selectedKeys={familia?.tipoDocumento}
                  errorMessage={fieldState.error?.message}
                  isInvalid={!!fieldState.error}
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
              )}
            />
          </div>
          <div className="col-span-8">
            <Controller
              control={control}
              name="documentos.numeroDocumento"
              rules={{
                pattern: {
                  value: /^[0-9]*$/,
                  message:
                    "Debe escribirlo en el siguiente formato: '12345678'",
                },
              }}
              render={({ field, fieldState }) => (
                <Input
                  variant="bordered"
                  fullWidth
                  label="Cedula:"
                  placeholder="Ejemplo: 1234578"
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
              name="documentos.serialCarnetPatria"
              render={({ field, fieldState }) => (
                <Input
                  fullWidth
                  label="Serial Carnet de la patria:"
                  placeholder="Escriba el serial del carnet de la patria..."
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
              name="documentos.codCarnetPatria"
              render={({ field, fieldState }) => (
                <Input
                  fullWidth
                  label="Codigo del carnet de la patria:"
                  placeholder="Escriba el codigo del carnet de la patria..."
                  type="text"
                  {...field}
                  errorMessage={fieldState.error?.message}
                  isInvalid={!!fieldState.error}
                />
              )}
            />
          </div>

          <div className="col-span-8">
            <Controller
              control={control}
              name="documentos.observacion"
              render={({ field, fieldState }) => (
                <Textarea
                  fullWidth
                  label="Observacion:"
                  placeholder="Escriba alguna observacion (opcional)"
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
              name="documentos.discapacidad"
              render={({ field, fieldState }) => (
                <Textarea
                  fullWidth
                  label="Condicion:"
                  placeholder="Escriba si tiene alguna condicion especial"
                  {...field}
                  isInvalid={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />
          </div>
          <div className="col-span-12">
            <Controller
              control={control}
              name="documentos.enfermedad_cronica"
              render={({ field, fieldState }) => (
                <Textarea
                  fullWidth
                  label="Sufre enfermedad cronica? (especifique):"
                  placeholder="Escriba si tiene alguna enfermedad cronica"
                  {...field}
                  isInvalid={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />
          </div>

          <div className="col-span-12 grid grid-cols-12  place-content-center  gap-4">
            <div className="col-span-4">
              <Checkbox
                label="¿Posee Carnet CONAPDIS?"
                name="documentos.carnet_conapdis"
                register={register}
              />
            </div>
            <div className="col-span-4">
              <Checkbox
                label="Vacuna COVID"
                name="documentos.vacuna_covid"
                register={register}
              />
            </div>
            <div className="col-span-4">
              <Checkbox
                label="¿Recibe pension?"
                name="documentos.recibe_pension"
                register={register}
              />
            </div>
          </div>
        </div>
        <Divider className="my-2" />

        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-4">
            <Controller
              control={control}
              name="trabajo.nivel_educativo"
              rules={{ required: "Este campo es obligatorio" }}
              render={({ field, fieldState }) => (
                <Input
                  fullWidth
                  variant="bordered"
                  label="Nivel educativo: "
                  placeholder="Escriba el nivel educativo."
                  type="text"
                  {...field}
                  isInvalid={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />
          </div>
          <div className="col-span-8">
            <Controller
              control={control}
              name="trabajo.profesion"
              render={({ field, fieldState }) => (
                <Input
                  variant="bordered"
                  fullWidth
                  label="Profesion:"
                  placeholder="Describa lo que estudio."
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
              name="trabajo.ocupacion"
              rules={{
                required: "Este campo es obligatorio",
              }}
              render={({ field, fieldState }) => (
                <Input
                  variant="bordered"
                  fullWidth
                  label="Ocupacion:"
                  placeholder="Describa lo que hace."
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
              name="trabajo.estudiando"
              rules={{
                required: "Este campo es obligatorio",
              }}
              render={({ field, fieldState }) => (
                <Input
                  variant="bordered"
                  fullWidth
                  label="¿Estudia? (describa en caso de si):"
                  placeholder="Describa lo que estudio."
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
              name="trabajo.deporte"
              render={({ field, fieldState }) => (
                <Input
                  variant="bordered"
                  fullWidth
                  label="Realiza deporte? (describa en caso de si):"
                  placeholder="Describa el deporte."
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
              name="trabajo.trabaja"
              rules={{
                required: {
                  message: "Este campo es requerido",
                  value: true,
                },
              }}
              render={({ field, fieldState }) => (
                <Select
                  {...field}
                  items={estado_trabajo}
                  label="Sector de trabajo:"
                  errorMessage={fieldState.error?.message}
                  selectedKeys={[field.value]}
                >
                  {({ key, label }) => (
                    <SelectItem key={key}>{label}</SelectItem>
                  )}
                </Select>
              )}
            />
          </div>
        </div>

        <Divider className="my-2" />
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-4">
            <Controller
              control={control}
              name="parentesco"
              rules={{
                required: {
                  value: true,
                  message: "El parentesco es requerido",
                },
              }}
              render={({ field, fieldState }) => (
                <Input
                  variant="bordered"
                  fullWidth
                  label="Parentesco:"
                  placeholder="Ej: hijo"
                  type="text"
                  {...field}
                  errorMessage={fieldState.error?.message}
                  isInvalid={!!fieldState.error}
                />
              )}
            />
          </div>
          <div className="col-span-8">
            <Controller
              control={control}
              name="jefeId"
              rules={{
                required: {
                  value: true,
                  message: "El jefe de familia es requerido",
                },
              }}
              render={({ field, fieldState }) => (
                <Select
                  fullWidth
                  label="Jefe de Familia:"
                  {...field}
                  items={data}
                  errorMessage={fieldState.error?.message}
                  isInvalid={!!fieldState.error}
                  selectedKeys={jefeId?.toString()}
                >
                  {({
                    id,
                    nombres,
                    apellidos,
                    tipoDocumento,
                    numeroDocumento,
                  }) => (
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
              )}
            />
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
