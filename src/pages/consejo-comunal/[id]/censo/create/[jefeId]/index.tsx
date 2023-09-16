import { Container } from "@nextui-org/react";
import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { LayoutContent } from "~/components/Layout";
import { CustomLoading } from "~/components/Loading";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ jefeId: string }>
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

const IndexCreateFamiliar = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { status } = useSession();

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
      <Container css={{ mw: "680px", my: "2rem" }}>hola</Container>
    </LayoutContent>
  );
};

export default IndexCreateFamiliar;
