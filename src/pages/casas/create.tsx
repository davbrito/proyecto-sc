import { Container } from "@nextui-org/react";
import React from "react";
import { LayoutContent } from "~/components/Layout";
import { CasaForm } from "~/components/censo/CasaForm";

const CreateCasa = () => {
  return (
    <LayoutContent>
      <Container>
        {/* @ts-expect-error */}
        <CasaForm />
      </Container>
    </LayoutContent>
  );
};

export default CreateCasa;
