import {
  Container,
  Input,
  Grid,
  Card,
  Button,
  Divider,
  Text,
  Textarea,
  Loading,
} from "@nextui-org/react";
import React from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { api } from "~/utils/api";
import { NextPage } from "next";
import { CustomLoading } from "../Loading";
import { useRouter } from "next/router";
import { Familiar } from "@prisma/client";

interface OtrosProps {
  tipoDocumento: string;
  numeroDocumento: string;
  serialCarnetPatria: string;
  codCarnetPatria: string;
  observacion?: string;
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
  jefeId: bigint;
  familia?: Familiar;
  closeModal?: () => void;
}

const FamiliarForm: NextPage<FamiliarFormProps> = ({
  jefeId,
  familia,
  closeModal,
}) => {
  const {
    register,
    reset,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FamiliarFormData>({
    defaultValues: !familia
      ? { ...initialValues, jefeId: jefeId.toString() }
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
          },
          parentesco: familia.parentesco,
          jefeId: familia.jefeFamiliaId.toString(),
        },
  });

  const router = useRouter();
  const { data, isLoading } = api.jefe.getAll.useQuery(undefined, {
    cacheTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
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
            router.push(`/censo/${data.newCenso.jefeFamiliaId}`);
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

  if (isLoading) return <CustomLoading />;

  if (!data) return null;

  console.log(jefeId, data);
  return (
    <Card as="form" onSubmit={handleSubmit(onSubmit)}>
      <Card.Body>
        <Grid css={{ mx: "auto" }}>
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
          </Grid.Container>
          <Divider css={{ my: "$8" }} />

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
                    message:
                      "Debe escribirlo en el siguiente formato: '12345678'",
                  },
                })}
                helperText={errors?.documentos?.numeroDocumento?.message}
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
                {...register("documentos.serialCarnetPatria")}
                helperText={errors?.documentos?.serialCarnetPatria?.message}
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
                {...register("documentos.codCarnetPatria")}
                helperText={errors?.documentos?.codCarnetPatria?.message}
                helperColor="error"
              />
            </Grid>

            <Grid xs={12}>
              <Textarea
                fullWidth
                label="Observacion:"
                placeholder="Escriba alguna observacion (opcional)"
                bordered
                {...register("documentos.observacion")}
                helperText={errors?.documentos?.observacion?.message}
                helperColor="error"
              />
            </Grid>
          </Grid.Container>

          <Divider css={{ my: "$8" }} />
          <Grid.Container lg={12} gap={1}>
            <Grid lg={8}>
              <Input
                fullWidth
                bordered
                label="Parentesco:"
                placeholder="Ej: hijo"
                type="text"
                {...register("parentesco", {
                  required: {
                    value: true,
                    message: "El parentesco es requerido",
                  },
                })}
                helperColor="error"
                helperText={errors.parentesco?.message}
              />
            </Grid>
            <Grid lg={8}>
              <label className="mb-2 block text-sm font-medium text-gray-50 dark:text-white">
                Jefe de Familia:
              </label>

              <select
                {...register("jefeId", {
                  required: {
                    value: true,
                    message: "El jefe de familia es requerido",
                  },
                })}
                className="select-form"
              >
                <option value="">Seleccione una opcion porfavor</option>
                {data?.map(
                  ({
                    id,
                    nombres,
                    apellidos,
                    tipoDocumento,
                    numeroDocumento,
                  }) => (
                    <option value={id.toString()} key={id.toString()}>
                      {apellidos.toUpperCase()}, {nombres.toUpperCase()}.{" "}
                      {tipoDocumento.toUpperCase()}-{numeroDocumento}
                    </option>
                  )
                )}
              </select>
            </Grid>
          </Grid.Container>
        </Grid>
      </Card.Body>

      <Card.Footer css={{ flexDirection: "column", pt: 0 }}>
        {errors?.root && (
          <Text
            color="error"
            h4
            css={{ textTransform: "capitalize", display: "inline-block" }}
          >
            {errors?.root?.message}.
          </Text>
        )}
        <Button
          disabled={isSubmitting}
          type="submit"
          css={{
            display: "block",
            "&:hover": {
              backgroundColor: "$blue300",
            },
          }}
          size={"lg"}
        >
          {isSubmitting && (
            <Loading as="span" color={"secondary"} className="mx-4" />
          )}
          {!familia ? "Agregar familiar." : "Actualizar familiar."}
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default FamiliarForm;
