import { type GetServerSidePropsContext } from "next";
import React from "react";
import { LayoutContent } from "~/components/Layout";
import { CasaForm } from "~/components/censo/CasaForm";
import { verifySession } from "~/utils/verifySession";

const CreateCasa = () => {
  return (
    <LayoutContent>
      <div className="container">{/* <CasaForm /> */}</div>
    </LayoutContent>
  );
};

export default CreateCasa;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await verifySession(context);
}
