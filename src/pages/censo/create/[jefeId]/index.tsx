import { Container } from "@nextui-org/react";
import React from "react";
import {
  type InferGetStaticPropsType,
  type GetStaticProps,
  type GetStaticPropsContext,
} from "next";
import { LayoutContent } from "~/components/Layout";
import { GreatForm } from "~/components/censo/GreatForm";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";

export async function getStaticProps(
  context: GetStaticPropsContext<{ jefeId: string }>
) {
  const ssg = generateSSGHelper();
  const id = context?.params?.jefeId;
  if (typeof id !== "string") throw new Error("no Id");

  await ssg.jefe.getById.prefetch({ id });
  console.log(id);
  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
    revalidate: 1,
  };
}

const IndexCreateFamiliar = (
  props: InferGetStaticPropsType<GetStaticProps>
) => {
  return (
    <LayoutContent>
      <Container css={{ mw: "680px", my: "2rem" }}>hola</Container>
    </LayoutContent>
  );
};

export default IndexCreateFamiliar;
