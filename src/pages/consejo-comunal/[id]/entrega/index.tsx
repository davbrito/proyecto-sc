import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useRouter } from "next/router";
import React from "react";
import { LayoutContent } from "~/components/Layout";
import { EntregaList } from "~/components/entrega-clap/EntregaList";

const Index = () => {
  const router = useRouter();
  const consejoComunalId = router.query.id ? router.query.id.toString() : "";
  return (
    <LayoutContent className=" ">
      <Card className="container mx-auto mt-4">
        <CardHeader className="">
          <h1 className="mx-auto text-center text-2xl font-medium">
            Entregas realizadas en el Consejo Comunal
          </h1>
        </CardHeader>
        <CardBody>
          <EntregaList consejoComunalId={parseInt(consejoComunalId)} />
        </CardBody>
      </Card>
    </LayoutContent>
  );
};

export default Index;
