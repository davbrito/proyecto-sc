import { Card, Container, Text } from "@nextui-org/react";
import { type GetServerSidePropsContext } from "next";
import React from "react";
import { LayoutContent } from "~/components/Layout";
import { ProfileData } from "~/components/profile/Profile";
import { verifySession } from "~/utils/verifySession";

function Profile() {
  return (
    <LayoutContent>
      <Container className="my-5 place-content-center">
        <Card css={{ padding: "8px 16px" }} className="mx-auto w-fit">
          <Card.Body>
            <Text h1 className="mb-4 text-center text-4xl font-light">
              Datos del perfil
            </Text>
            <Container>
              <ProfileData />
            </Container>
          </Card.Body>
        </Card>
      </Container>
    </LayoutContent>
  );
}

export default Profile;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await verifySession(context);
}
