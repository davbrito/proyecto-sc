import { Table, Text, Button, Card, Container } from "@nextui-org/react";
import {
  type GetStaticProps,
  type GetStaticPropsContext,
  type InferGetStaticPropsType,
} from "next";
import { getSession, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { LayoutContent } from "~/components/Layout";
import { CustomLoading } from "~/components/Loading";
import JefeProfile from "~/components/censo/JefeProfile";
import { prisma } from "~/server/db";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { api } from "~/utils/api";
import { getRelativeTime } from "~/utils/dates";

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
    fallback: "blocking",
  };
};

const IndexJefeCenso = (props: InferGetStaticPropsType<GetStaticProps>) => {
  return (
    <LayoutContent>
      <JefeProfile id={props.id} />
    </LayoutContent>
  );
};

export default IndexJefeCenso;
