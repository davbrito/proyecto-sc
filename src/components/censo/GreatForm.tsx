import { Button, Card, Grid, Loading, Text } from "@nextui-org/react";
import React, { useState } from "react";
import { type FieldError, type SubmitHandler, useForm } from "react-hook-form";
import { api } from "~/utils/api";
import { PersonaForm } from "./PersonaForm";
import { CasaForm } from "./CasaForm";
import { DocumentosForm } from "./documentosForm";
import { useRouter } from "next/router";
import { CirclesReference } from "../Circles";

interface CasaProps {
  manzana: string;
  casa: string;
  calle: string;
}

interface OtrosProps {
  tipoDocumento: string;
  numeroDocumento: string;
  serialCarnetPatria: string;
  codCarnetPatria: string;
  observacion?: string;
  condicionEspecial?: string;
}

interface BasicDataProps {
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  fechaNacimiento: string;
  genero: string;
  email: string;
  codigoTelefono: string;
  telefono: string;
}

export interface JefeProps {
  datosBasicos: BasicDataProps;
  documentos: OtrosProps;
  casa: CasaProps;
}

interface Step {
  currentPos: number;
  filled: number;
}

interface Props {
  consejoComunalId: string;
}

export const GreatForm = ({ consejoComunalId }: Props) => {
  const [step, setStep] = useState<Step>({ currentPos: 0, filled: 0 });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    trigger,
    watch,
    setError,
  } = useForm<JefeProps>();
  const router = useRouter();
  const { mutateAsync } = api.jefe.create.useMutation();

  const sections = [
    <PersonaForm register={register} errors={errors} key="personaForm" />,
    <DocumentosForm register={register} errors={errors} key="documentosForm" />,
    <CasaForm
      register={register}
      errors={errors}
      key="casaForm"
      watch={watch}
    />,
  ];

  const onSubmit: SubmitHandler<JefeProps> = async (values) => {
    try {
      await mutateAsync(
        {
          casa: values.casa,
          documentos: values.documentos,
          jefe: {
            primerApellido: values.datosBasicos.primerApellido,
            genero: values.datosBasicos.genero,
            primerNombre: values.datosBasicos.primerNombre,
            segundoNombre: values.datosBasicos.segundoNombre,
            fechaNacimiento: values.datosBasicos.fechaNacimiento,
            segundoApellido: values.datosBasicos.segundoApellido,
            email: values.datosBasicos.email,
            telefono: values.datosBasicos.telefono,
          },
          consejoComunalId: parseInt(consejoComunalId),
        },
        {
          onSuccess(data, variables, context) {
            router.push(`/consejo-comunal/${consejoComunalId}/censo`);
          },
          onError({ data }) {
            setError("root", {
              message: data?.code,
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
    return step.currentPos === 0;
  };

  const handleSteps = async (n: number) => {
    if (n < 0 && step.currentPos !== 0)
      return setStep(({ currentPos, filled }) => ({
        currentPos: currentPos + n,
        filled,
      }));

    if (step.currentPos === sections.length - 1 && n > 0) return;

    let isValid = false;

    switch (step.currentPos) {
      case 0:
        isValid = await trigger("datosBasicos");

        break;
      case 1:
        isValid = await trigger([
          "documentos.tipoDocumento",
          "documentos.serialCarnetPatria",
          "documentos.observacion",
          "documentos.numeroDocumento",
          "documentos.codCarnetPatria",
        ]);

        break;
    }

    if (isValid)
      setStep(({ currentPos, filled }) => ({
        currentPos: currentPos + n,
        filled: filled + 1,
      }));
  };

  return (
    <>
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
                  step.currentPos === index
                    ? "block opacity-100 "
                    : "hidden opacity-0"
                }`}
                key={index}
              >
                {section}
              </section>
            ))}
          </Grid>
        </Card.Body>
        {errors?.root && (
          <Text
            color="error"
            h3
            css={{
              textTransform: "capitalize",
              display: "inline-block",
              backgroundColor: "$red50",
              padding: "4px 0",
              margin: "8px 16px",
              textAlign: "center",
              border: "1px solid",
              borderRadius: "4px",
            }}
          >
            {errors?.root?.message}
          </Text>
        )}
        <Card.Divider />

        <Card.Footer
          css={{ display: "flex", justifyContent: "center", gap: 4 }}
        >
          <Button
            color={"secondary"}
            disabled={isDisabledBackButton()}
            onPress={() => handleSteps(-1)}
          >
            Atras
          </Button>

          <Button
            disabled={isSubmitting}
            type="submit"
            css={{
              display: `${
                step.currentPos !== sections.length - 1 ? "none" : "block"
              }`,
              "&:hover": {
                backgroundColor: "$blue300",
              },
            }}
          >
            Guardar datos
          </Button>

          <Button
            type="button"
            onPress={() => handleSteps(1)}
            css={{
              display: `${
                step.currentPos !== sections.length - 1 ? "block" : "none"
              }`,
              "&:hover": {
                backgroundColor: "$blue300",
              },
            }}
          >
            {isSubmitting && (
              <Loading as="span" color={"secondary"} className="mx-4" />
            )}
            Continuar
          </Button>
        </Card.Footer>

        <CirclesReference
          count={sections.length}
          filled={step.filled}
          current={step.currentPos}
          setStep={setStep}
        />
      </Card>
    </>
  );
};
