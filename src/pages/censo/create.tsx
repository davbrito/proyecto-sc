import { Container } from "@nextui-org/react";
import React from "react";
import { LayoutContent } from "~/components/Layout";
import { GreatForm } from "~/components/censo/GreatForm";
import { PersonaForm } from "~/components/censo/PersonaForm";

const CreateCenso = () => {
  return (
    <LayoutContent>
      <Container css={{ mw: "680px", my: "2rem" }}>
        <GreatForm />
      </Container>
    </LayoutContent>
  );
};

export default CreateCenso;
