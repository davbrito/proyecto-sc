import {
  Button,
  Checkbox,
  Container,
  Input,
  Modal,
  Row,
  Text,
} from "@nextui-org/react";
import {
  type GetStaticProps,
  type GetStaticPropsContext,
  type InferGetStaticPropsType,
} from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { LayoutContent } from "~/components/Layout";
import { CustomLoading } from "~/components/Loading";
import JefeProfile from "~/components/censo/JefeProfile";
import FamiliarForm from "~/components/familiar/FamiliarForm";
import { prisma } from "~/server/db";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";

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
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const { status } = useSession();

  const closeHandler = () => {
    setVisible(false);
  };

  if (status === "loading") {
    return (
      <LayoutContent>
        <CustomLoading />
      </LayoutContent>
    );
  }

  if (status === "unauthenticated")
    return (
      <LayoutContent>
        <Link
          href={"/login"}
          className="rounded-md bg-gray-400 px-4 py-5 shadow-md dark:bg-slate-700 "
        >
          Go Back! This does not belong to you
        </Link>
      </LayoutContent>
    );

  return (
    <LayoutContent>
      <JefeProfile id={props.id} />
    </LayoutContent>
  );
};

export default IndexJefeCenso;
