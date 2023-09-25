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
            color={"secondary"}
            className="text-white hover:bg-purple-800  disabled:bg-purple-950"
            disabled={isDisabledBackButton()}
            onPress={() => handleSteps(-1)}
          >
            Atras
          </Button>

          <Button
            type="button"
            onPress={() => handleSteps(1)}
            className="bg-blue-600 text-white  hover:bg-blue-800 disabled:bg-gray-600"
            style={{
              display:
                step.currentPos !== sections.length - 1 ? "block" : "none",
            }}
          >
            {isSubmitting && (
              <Spinner as="span" color={"secondary"} className="mx-4" />
            )}
            Continuar
          </Button>
          <Button
            disabled={isSubmitting}
            className="bg-blue-600 text-white  hover:bg-blue-800 disabled:bg-gray-600"
            type="submit"
            style={{
              display:
                step.currentPos !== sections.length - 1 ? "none" : "block",
            }}
          >
            Guardar datos
          </Button>
        </CardFooter>

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
