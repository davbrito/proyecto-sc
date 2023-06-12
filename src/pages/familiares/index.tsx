import { Container, Text } from "@nextui-org/react";
import { GetServerSidePropsContext } from "next";
import React from "react";
import { LayoutContent } from "~/components/Layout";
import { FamiliarList } from "~/components/familiar/FamiliarList";
import { verifySession } from "~/utils/verifySession";

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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await verifySession(context);
}
