import {
    type InferGetServerSidePropsType,
    type GetServerSidePropsContext,
  } from "next";
  
  import React from "react";
import CasaInfor from "~/components/censo/CasaInfor";
  import { LayoutContent } from "~/components/Layout";
import ManzanaInfo from "~/components/lider-calle/ManzanaInfo";
  
  import { generateSSGHelper } from "~/server/helpers/ssgHelper";
  
  export async function getServerSideProps(
    context: GetServerSidePropsContext<{ casaId: string }>
  ) {
    const ssg = generateSSGHelper();
  
    const casaId = context?.params?.casaId;
  
    // if (typeof entregaId !== "string") throw new Error("no entrega Id");
  
    // await ssg.entrega.getById.prefetch({ id: parseInt(entregaId) });
    if (typeof casaId !== "string") throw new Error("no entrega Id");
    return {
      props: {
        title: "Censo por lider de calle",
        content: "Informacion de los censos por lider de calle",
        trpcState: ssg.dehydrate(),
        casaId,
      },
    };
  }
  
  const index = (
    props: InferGetServerSidePropsType<typeof getServerSideProps>
  ) => {
    console.log(props?.casaId)
    return (
      <LayoutContent className=" ">
          <CasaInfor casaId={parseInt(props?.casaId)}/>
      </LayoutContent>
    );
  };
  
  export default index;
  