import { Button, Card, CardBody, CardHeader, Spacer } from "@nextui-org/react";
import { LayoutContent } from "~/components/Layout";
import { ConsejosList } from "~/components/consejo-comunal/consejosList";
import NextLink from "next/link";

const Index = () => {
  return (
    <LayoutContent>
      <div className="container mx-auto pt-4">
        <Card shadow="md" className="bg-content2">
          <CardBody>
            <Button
              className="mx-auto bg-green-600 font-medium text-white hover:bg-green-700"
              as={NextLink}
              href="/consejo-comunal/create"
              color="success"
            >
              Nuevo consejo
            </Button>
          </CardBody>
        </Card>
        <Spacer y={4} />
        <Card shadow="md" className="bg-content2">
          <CardHeader className="px-4">
            <h2 className="mx-auto text-center text-3xl font-semibold">
              Consejos Comunales
            </h2>
          </CardHeader>
          <CardBody>
            <ConsejosList />
          </CardBody>
        </Card>
      </div>
    </LayoutContent>
  );
};

export default Index;
