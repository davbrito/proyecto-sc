import { Card, Container, Grid, Link, Text } from "@nextui-org/react";
import { type GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";
import React, { useContext } from "react";
import { LayoutContent } from "~/components/Layout";
import { CasaList } from "~/components/censo/CasaList";
import { api } from "~/utils/api";
import { verifySession } from "~/utils/verifySession";

const CasaIndex = () => {
  return (
    <LayoutContent>
      <Container className="my-5 place-content-center">
        <Card>
          <Card.Body>
            <Text h1 className="mb-6 text-center text-4xl font-light">
              Casas registradas
            </Text>
            <Container>
              <CasaList />
            </Container>
          </Card.Body>
        </Card>
      </Container>
    </LayoutContent>
  );
};

export default CasaIndex;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await verifySession(context);
}
