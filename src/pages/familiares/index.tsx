import { Card, Container, Text } from "@nextui-org/react";
import { type GetServerSidePropsContext } from "next";
import React from "react";
import { LayoutContent } from "~/components/Layout";
import { FamiliarList } from "~/components/familiar/FamiliarList";
import { verifySession } from "~/utils/verifySession";

const Index = () => {
  return (
    <LayoutContent>
      <Container className="my-5 place-content-center">
        <Card>
          <Card.Body>
            <Text h1 className="mb-6 text-center text-4xl font-light">
              Lista de familiares agregados
            </Text>
            <Container>
              <FamiliarList />
            </Container>
          </Card.Body>
        </Card>
      </Container>
    </LayoutContent>
  );
};

export default Index;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await verifySession(context);
}
