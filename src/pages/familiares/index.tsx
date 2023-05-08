import { Container, Text } from "@nextui-org/react";
import React from "react";
import { LayoutContent } from "~/components/Layout";
import { FamiliarList } from "~/components/familiar/FamiliarList";

const Index = () => {
  return (
    <LayoutContent>
      <Container>
        <Text h1>Lista de familiares agregados</Text>
        <FamiliarList />
      </Container>
    </LayoutContent>
  );
};

export default Index;
