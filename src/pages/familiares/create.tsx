import { Container, Text } from "@nextui-org/react";
import React from "react";
import { LayoutContent } from "~/components/Layout";
import FamiliarForm from "~/components/familiar/FamiliarForm";

const CreateFamiliar = () => {
  return (
    <LayoutContent>
      <Text h1>Nuevo Familiar</Text>
      <Container css={{ mw: "680px", p: "2rem" }}>
        <FamiliarForm />
      </Container>
    </LayoutContent>
  );
};

export default CreateFamiliar;
