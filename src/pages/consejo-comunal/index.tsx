import { Card, Container, Row, Text, Link } from "@nextui-org/react";
import React from "react";
import { LayoutContent } from "~/components/Layout";
import { ConsejosList } from "~/components/consejo-comunal/consejosList";

const Index = () => {
  return (
    <LayoutContent>
      <Container>
        <Row className="my-4 flex-col gap-4 md:flex-row-reverse">
          <Card
            css={{}}
            className="flex flex-row flex-wrap items-center justify-evenly self-stretch"
          >
            <Link
              href="/consejo-comunal/create"
              css={{ my: "1rem" }}
              className=" h-fit w-fit rounded-md bg-green-700 px-4 py-3 text-lg text-white"
            >
              Nuevo consejo
            </Link>
          </Card>
        </Row>
        <Card css={{ mb: "16px !important" }}>
          <Card.Body>
            <Text h1 className=" text-center text-4xl font-medium ">
              Consejos Comunales
            </Text>

            <Container css={{ mt: "16px" }}>
              <ConsejosList />
            </Container>
          </Card.Body>
        </Card>
      </Container>
    </LayoutContent>
  );
};

export default Index;
