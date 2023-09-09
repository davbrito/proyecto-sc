import { Card, Text } from "@nextui-org/react";
import {
  type InferGetStaticPropsType,
  type GetStaticProps,
  type GetStaticPropsContext,
} from "next";
import React from "react";
import { LayoutContent } from "~/components/Layout";
import { ConsejoInfor } from "~/components/consejo-comunal/ConsejoInfor";
import { prisma } from "~/server/db";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";

export async function getStaticProps(
  context: GetStaticPropsContext<{ id: string }>
) {
  const ssg = generateSSGHelper();
  const id = context?.params?.id;

  if (typeof id !== "string") throw new Error("no Id");

  await ssg.consejo.getById.prefetch({ id: parseInt(id) });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
    revalidate: 1,
  };
}

export const getStaticPaths = async () => {
  const consejos = await prisma.consejoComunal.findMany();

  const paths = consejos.map((consejo) => ({
    params: { id: consejo.id.toString() },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

const Index = (props: InferGetStaticPropsType<GetStaticProps>) => {
  return (
    <LayoutContent className="flex flex-col  ">
      <ConsejoInfor consejoId={props?.id} />
    </LayoutContent>
  );
};

export default Index;
