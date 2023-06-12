import { Container, Text } from "@nextui-org/react";
import { GetServerSidePropsContext } from "next";
import React from "react";
import { LayoutContent } from "~/components/Layout";
import FamiliarForm from "~/components/familiar/FamiliarForm";
import { verifySession } from "~/utils/verifySession";

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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await verifySession(context);
}
