import {
    type InferGetServerSidePropsType,
    type GetServerSidePropsContext,
  } from "next";
  
  import React from "react";
  import { LayoutContent } from "~/components/Layout";
import ManzanaInfo from "~/components/lider-calle/ManzanaInfo";
  
  import { generateSSGHelper } from "~/server/helpers/ssgHelper";
  
  export async function getServerSideProps(
    context: GetServerSidePropsContext<{ liderId: string }>
  ) {
    const ssg = generateSSGHelper();
  
    const liderId = context?.params?.liderId;
  
    // if (typeof entregaId !== "string") throw new Error("no entrega Id");
  
    // await ssg.entrega.getById.prefetch({ id: parseInt(entregaId) });
    if (typeof liderId !== "string") throw new Error("no entrega Id");
    return {
      props: {
        title: "Censo por lider de calle",
        content: "Informacion de los censos por lider de calle",
        trpcState: ssg.dehydrate(),
        liderId,
      },
    };
  }
  
  const index = (
    props: InferGetServerSidePropsType<typeof getServerSideProps>
  ) => {
    console.log(props?.liderId)
    return (
      <LayoutContent className=" ">
          <ManzanaInfo liderId={parseInt(props.liderId)}/>
      </LayoutContent>
    );
  };
  
  export default index;
  