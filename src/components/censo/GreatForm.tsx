import { Button, Card, Grid, Text } from "@nextui-org/react";
import React, { useState } from "react";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import { api } from "~/utils/api";
import { PersonaForm } from "./PersonaForm";
import { CasaForm } from "./CasaForm";
import { DocumentosForm } from "./documentosForm";

interface CasaProps {
  manzana: string;
  casa: string;
  calle: string;
  direccion: string;
}

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
  edad: string;
  fechaNacimiento: string;
  genero: string;
}

interface JefeProps {
  datosBasicos: BasicDataProps;
  documentos: OtrosProps;
  casa: CasaProps;
}

interface CirclesProps {
  count: number;
  filled: number;
}

const CirclesReference = ({ count, filled }: CirclesProps) => {
  const renderCircles = () => {
    const circles: Array<JSX.Element> = [];

    for (let i = 0; i < count; i++) {
      circles.push(
        <span
          className={`inline-block h-6 w-6 rounded-full ${
            i <= filled ? "bg-blue-600" : "bg-gray-400"
          }`}
        ></span>
      );
    }
    return circles;
  };

  return (
    <div className="mx-auto flex gap-x-2 p-2 transition-all">
      {renderCircles()}
    </div>
  );
};

export const GreatForm = () => {
  const [step, setStep] = useState(0);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    getFieldState,
    trigger,
    setError,
  } = useForm<JefeProps>();

  const { mutate } = api.persona.createJefeFamilia.useMutation();

  const sections = [
    <PersonaForm register={register} errors={errors} />,
    <DocumentosForm register={register} errors={errors} />,
    <CasaForm register={register} errors={errors} />,
  ];

  const onSubmit: SubmitHandler<JefeProps> = async (values) => {
    try {
      console.log(values);
      mutate(
        {
          casa: values.casa,
          documentos: values.documentos,
          jefe: {
            edad: parseInt(values.datosBasicos.edad),
            primerApellido: values.datosBasicos.primerApellido,
            genero: values.datosBasicos.genero,
            primerNombre: values.datosBasicos.primerNombre,
            segundoNombre: values.datosBasicos.segundoNombre,
            fechaNacimiento: values.datosBasicos.fechaNacimiento,
            segundoApellido: values.datosBasicos.segundoApellido,
          },
        },
        {
          onSuccess(data, variables, context) {
            console.log(data);
          },
          onError(error, variables, context) {
            setError("root", {
              message: "Ocurrio un error",
              type: "validate",
            });
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const isDisabledBackButton = () => {
    return step === 0;
  };

  const handleSteps = async (n: number) => {
    if (step === sections.length - 1 && n > 0) return;

    let state:
      | {
          invalid: boolean;
          isDirty: boolean;
          isTouched: boolean;
          error?: FieldError | undefined;
        }
      | undefined = undefined;

    switch (step) {
      case 0:
        await trigger("datosBasicos");
        state = getFieldState("datosBasicos");
        break;
      case 1:
        await trigger("documentos");
        state = getFieldState("documentos");
        break;
    }

    if (!state?.invalid) setStep((step) => step + n);
  };

  return (
    <Card as="form" onSubmit={handleSubmit(onSubmit)}>
      <Card.Header>
        <Text h3 css={{ mx: "auto" }}>
          Datos personales del Jefe de Familia
        </Text>
      </Card.Header>

      <Card.Divider />

      <Card.Body>
        <Grid css={{ mx: "auto" }}>
          {sections.map((section, index) => (
            <section
              className={`transition-all ${
                step === index ? "block opacity-100 " : "hidden opacity-0"
              }`}
              key={index}
            >
              {section}
            </section>
          ))}
        </Grid>
        {errors?.root && (
          <Text
            color="error"
            h3
            css={{ textTransform: "capitalize", display: "inline-block" }}
          >
            {errors?.root?.message}
          </Text>
        )}
      </Card.Body>

      <Card.Divider />

      <Card.Footer css={{ display: "flex", justifyContent: "center", gap: 4 }}>
        <Button
          color={"secondary"}
          disabled={isDisabledBackButton()}
          onPress={() => handleSteps(-1)}
        >
          Atras
        </Button>
        {step === sections.length - 1 ? (
          <Button type="submit" disabled={isSubmitting}>
            Guardar datos
          </Button>
        ) : (
          <Button type="button" onPress={() => handleSteps(1)}>
            Continuar
          </Button>
        )}
      </Card.Footer>

      <CirclesReference count={sections.length} filled={step} />
    </Card>
  );
};
