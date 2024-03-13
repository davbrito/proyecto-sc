import { type ROLE } from "@prisma/client";
import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next";
import { useSession } from "next-auth/react";
import { LayoutContent } from "~/components/Layout";
import { ConsejoInfor } from "~/components/consejo-comunal/ConsejoInfor";
import { EncargadosInfor } from "~/components/encargado-clap/EncargadosInfor";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ id: string }>
) {
  const ssg = generateSSGHelper();
  const id = context?.params?.id;

  if (typeof id !== "string") throw new Error("no Id");

  await ssg.consejo.getById.prefetch({ id: parseInt(id) });

  return {
    props: {
      title: "Consejo Comunal",
      content: "Informacion del consejo comunal",
      trpcState: ssg.dehydrate(),
      id,
    },
  };
}

const Index = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { data } = useSession();
  return (
    <LayoutContent className="flex-col  ">
      <ConsejoInfor consejoId={props.id} role={data?.user.role_user as ROLE} />
      <EncargadosInfor
        consejoId={parseInt(props.id)}
        role={data?.user.role_user}
      />
    </LayoutContent>
  );
};

export default Index;
