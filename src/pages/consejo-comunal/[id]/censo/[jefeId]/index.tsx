import {
  type InferGetServerSidePropsType,
  type GetServerSidePropsContext,
} from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { LayoutContent } from "~/components/Layout";
import { CustomLoading } from "~/components/Loading";
import JefeProfile from "~/components/censo/JefeProfile";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";

//Second
export async function getServerSideProps(
  context: GetServerSidePropsContext<{ jefeId: string; id: string }>
) {
  const ssg = generateSSGHelper();
  const id = context?.params?.jefeId;
  const consejoId = context?.params?.id;

  if (typeof id !== "string" || typeof consejoId !== "string")
    throw new Error("no Id");

  await ssg.jefe.getById.prefetch({ id });

  return {
    props: {
      title: "Consejo Comunal",
      content: "Informacion del consejo comunal",
      trpcState: ssg.dehydrate(),
      id,
    },
  };
}

const IndexJefeCenso = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const { data, status } = useSession();

  const closeHandler = () => {
    setVisible(false);
  };

  if (status === "loading") {
    return (
      <LayoutContent className="flex flex-col items-center justify-center">
        <CustomLoading className="place-content-center" />
      </LayoutContent>
    );
  }

  if (status === "unauthenticated")
    return (
      <LayoutContent className="flex flex-col items-center justify-center">
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
      <JefeProfile id={props.id} role={data?.user?.role_user} />
    </LayoutContent>
  );
};

export default IndexJefeCenso;
