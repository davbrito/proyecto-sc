import { Container } from "@nextui-org/react";
import React from "react";
import {
  type InferGetStaticPropsType,
  type GetStaticProps,
  type GetStaticPropsContext,
} from "next";
import { LayoutContent } from "~/components/Layout";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { prisma } from "~/server/db";
import FamiliarForm from "~/components/familiar/FamiliarForm";

export async function getStaticProps(
  context: GetStaticPropsContext<{ jefeId: string }>
) {
  const ssg = generateSSGHelper();
  const id = context?.params?.jefeId;
  if (typeof id !== "string") throw new Error("no Id");

  await ssg.jefe.getById.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
    revalidate: 1,
  };
}

export const getStaticPaths = async () => {
  const jefes = await prisma.jefeFamilia.findMany();

  const paths = jefes.map((jefe) => ({
    params: { jefeId: jefe.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

const IndexCreateFamiliar = (
  props: InferGetStaticPropsType<GetStaticProps>
) => {
  return (
    <LayoutContent>
      <Container css={{ mw: "680px", my: "2rem" }}>
        <FamiliarForm jefeId={BigInt(props?.id as string)} />
      </Container>
    </LayoutContent>
  );
};

export default IndexCreateFamiliar;
