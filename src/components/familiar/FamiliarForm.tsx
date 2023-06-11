import {
  Container,
  Input,
  Grid,
  Card,
  Button,
  Divider,
  Text,
} from "@nextui-org/react";
import React from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { PersonaForm } from "../censo/PersonaForm";
import { DocumentosForm } from "../censo/documentosForm";
import { api } from "~/utils/api";

interface OtrosProps {
  tipoDocumento: string;
  numeroDocumento: string;
  serialCarnetPatria: string;
  codCarnetPatria: string;
  observacion?: string;
}

interface BasicDataProps {
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  fechaNacimiento: string;
  genero: string;
}

interface FormData {
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

const FamiliarForm = () => {
  const {
    register,
    reset,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitted, isLoading },
  } = useForm<FormData>();

  const { data } = api.jefe.getAll.useQuery(undefined, {
    cacheTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
  const { mutate } = api.familia.addNew.useMutation();

  const onSubmit: SubmitHandler<FormData> = (values, event) => {
    event?.preventDefault();
    mutate(
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
        },
      }
    );
  };

  console.log(isSubmitting, isSubmitted, isLoading);
  return (
    <Card as="form" onSubmit={handleSubmit(onSubmit)}>
      <Card.Body>
        <Grid css={{ mx: "auto" }}>
          <PersonaForm register={register} errors={errors} />
          <Divider css={{ my: "$8" }} />

          <DocumentosForm register={register} errors={errors} />

          <Divider css={{ my: "$8" }} />
          <Grid.Container lg={12} gap={1}>
            <Grid lg={6}>
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
          type="submit"
          disabled={isSubmitting}
          css={{ display: "block" }}
          size={"lg"}
        >
          Agregar familiar
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default FamiliarForm;
