import {
  type InferGetServerSidePropsType,
  type GetServerSidePropsContext,
} from "next";

import React from "react";
import { LayoutContent } from "~/components/Layout";
import EntregaInfor from "~/components/entrega-clap/EntregaInfor";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ entregaId: string }>
) {
  const ssg = generateSSGHelper();

  const entregaId = context?.params?.entregaId;

  if (typeof entregaId !== "string") throw new Error("no entrega Id");

  await ssg.entrega.getById.prefetch({ id: parseInt(entregaId) });

  return {
    props: {
      title: "Entrega de cajas CLAP",
      content: "Informacion de la entrega realizada",
      trpcState: ssg.dehydrate(),
      entregaId,
    },
  };
}

const index = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  return (
    <LayoutContent className=" ">
      <EntregaInfor entregaId={parseInt(props.entregaId)} />
    </LayoutContent>
  );
};

export default index;
