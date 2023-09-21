import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { type GetServerSidePropsContext } from "next";
import React from "react";
import { LayoutContent } from "~/components/Layout";
import { ProfileData } from "~/components/profile/Profile";
import { verifySession } from "~/utils/verifySession";

function Profile() {
  return (
    <LayoutContent>
      <Card className="mx-auto mt-5 max-w-md bg-content2" fullWidth>
        <CardHeader className="justify-center">
          <h2 className="text-center text-2xl font-bold">Datos del perfil</h2>
        </CardHeader>
        <CardBody>
          <ProfileData />
        </CardBody>
      </Card>
    </LayoutContent>
  );
}

export default Profile;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await verifySession(context);
}
