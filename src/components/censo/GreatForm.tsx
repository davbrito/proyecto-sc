import {
  Button,
  Card,
  Divider,
  Grid,
  Input,
  Text,
  Textarea,
} from "@nextui-org/react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
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
  datosBasicosJefe: BasicDataProps;
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
    formState: { errors, isValidating, isValid },
    trigger,
    setError,
    getFieldState,
    getValues,
    watch,
  } = useForm<JefeProps>();

  const sections = [
    <PersonaForm register={register} errors={errors} />,
    <DocumentosForm register={register} errors={errors} />,
    <CasaForm register={register} errors={errors} />,
  ];

  const persona = api.persona.createJefeFamilia.useMutation();

  const onSubmit: SubmitHandler<JefeProps> = async (values) => {
    try {
      // Guardar Casa
      console.log(values);
    } catch (error) {
      console.error(error);
    }
  };

  const isDisabled = () => {
    return step === 0;
  };

  const handleSteps = async (n: number) => {
    if (step === sections.length - 1 && n > 0) return;

    const campos = Object.keys(getValues());
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
        <Grid css={{ mx: "auto" }}>{sections[step]}</Grid>
      </Card.Body>

      <span></span>
      <Card.Divider />

      <Card.Footer css={{ display: "flex", justifyContent: "center", gap: 4 }}>
        <Button
          color={"secondary"}
          disabled={isDisabled()}
          onPress={() => handleSteps(-1)}
        >
          Atras
        </Button>
        {step === sections.length - 1 ? (
          <Button type="submit">Guardar datos</Button>
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
