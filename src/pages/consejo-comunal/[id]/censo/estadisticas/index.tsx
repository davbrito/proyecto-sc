import { Card, CardBody, CardHeader } from "@nextui-org/react";
import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next";
import { LayoutContent } from "~/components/Layout";
import { EstadisticaTable } from "~/components/estadisticas/EstadisticaTable";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { api } from "~/utils/api";

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
  const { data } = api.consejo.getById.useQuery({ id: parseInt(props.id) });

  return (
    <LayoutContent className="flex-col  ">
      <div className="container mx-auto">
        <Card className="my-4">
          <CardHeader>
            <h1 className="mx-auto text-3xl">
              Estadisticas de cajas Clap {data?.nombre_clap.toUpperCase()}
            </h1>
          </CardHeader>
          <CardBody>
            <EstadisticaTable consejoId={parseInt(props.id)} />
          </CardBody>
        </Card>
      </div>
    </LayoutContent>
  );
};

export default Index;
