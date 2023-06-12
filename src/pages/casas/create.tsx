import { Container } from "@nextui-org/react";
import { GetServerSidePropsContext } from "next";
import React from "react";
import { LayoutContent } from "~/components/Layout";
import { CasaForm } from "~/components/censo/CasaForm";
import { verifySession } from "~/utils/verifySession";

const CreateCasa = () => {
  return (
    <LayoutContent>
      <Container>{/* <CasaForm /> */}</Container>
    </LayoutContent>
  );
};

export default CreateCasa;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await verifySession(context);
}
