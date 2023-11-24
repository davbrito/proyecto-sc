import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Spinner,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { api } from "~/utils/api";
import { CirclesReference } from "../Circles";
import { CasaForm } from "./CasaForm";
import { PersonaForm } from "./PersonaForm";
import { DocumentosForm } from "./documentosForm";

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
  discapacidad?: string;
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
    formState: { errors, isSubmitting, isValidating },
    trigger,
    watch,
    setError,
    control,
  } = useForm<JefeProps>();
  const router = useRouter();
  const { mutateAsync } = api.jefe.create.useMutation({
    onSuccess() {
      router.push(`/consejo-comunal/${consejoComunalId}/censo`);
    },
    onError(error) {
      setError("root", {
        message: error.data?.code,
        type: "validate",
      });
    },
  });

  const sections = [
    <PersonaForm
      control={control}
      register={register}
      errors={errors}
      key="personaForm"
    />,
    <DocumentosForm register={register} errors={errors} key="documentosForm" />,
    <CasaForm
      register={register}
      errors={errors}
      key="casaForm"
      watch={watch}
    />,
  ];

  const isFirstStep = step.currentPos === 0;
  const isLastStep = step.currentPos === sections.length - 1;

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
        isValid = await trigger("documentos");
        break;
    }

    if (!isValid) return;

    setStep(({ currentPos, filled }) => ({
      currentPos: currentPos + 1,
      filled: filled < currentPos + 1 ? currentPos + 1 : filled,
    }));
  };

  const onSubmit = handleSubmit(async (values) => {
    try {
      await mutateAsync({
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
      });
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <>
      <Card
        as="form"
        onSubmit={(event) => {
          event.preventDefault();
          if (isLastStep) {
            onSubmit(event);
          } else {
            handleSteps(1);
          }
        }}
      >
        <CardHeader>
          <h3 className="mx-auto text-2xl">
            Datos personales del Jefe de Familia
          </h3>
        </CardHeader>

        <Divider />

        <CardBody>
          <div className="mx-auto flex flex-wrap">
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
          </div>
        </CardBody>
        {errors?.root && (
          <h3 className="mx-4 my-2 inline-block rounded-md border border-solid bg-red-50 py-1 text-center capitalize text-red-600">
            {errors?.root?.message}
          </h3>
        )}
        <Divider />

        <CardFooter className="flex justify-center gap-4">
          <Button
            type="button"
            color="secondary"
            isDisabled={isFirstStep}
            onPress={() => handleSteps(-1)}
          >
            Atras
          </Button>

          {isLastStep ? (
            <Button
              disabled={isSubmitting}
              isLoading={isSubmitting}
              color="success"
              type="submit"
            >
              Guardar datos
            </Button>
          ) : (
            <Button
              type="button"
              color="primary"
              onPress={() => handleSteps(1)}
              isLoading={isSubmitting || isValidating}
            >
              Continuar
            </Button>
          )}
        </CardFooter>

        <CirclesReference
          count={sections.length}
          filled={step.filled}
          current={step.currentPos}
          onChangeStep={(step) => {
            setStep((prev) => ({ ...prev, currentPos: step }));
          }}
        />
      </Card>
    </>
  );
};
