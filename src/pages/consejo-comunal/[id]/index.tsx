import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next";
import { LayoutContent } from "~/components/Layout";
import { ConsejoInfor } from "~/components/consejo-comunal/ConsejoInfor";
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
      trpcState: ssg.dehydrate(),
      id,
    },
    revalidate: 1,
  };
}

const Index = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  return (
    <LayoutContent className="flex flex-col  ">
      <ConsejoInfor consejoId={props.id} />
    </LayoutContent>
  );
};

export default Index;
