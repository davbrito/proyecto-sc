import { Text } from "@nextui-org/react";
import { GetServerSidePropsContext } from "next";
import React from "react";
import { ProfileData } from "~/components/profile/Profile";
import { verifySession } from "~/utils/verifySession";

function Profile() {
  return (
    <div>
      <ProfileData />
    </div>
  );
}

export default Profile;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await verifySession(context);
}
