import { Container, Link, Text } from "@nextui-org/react";
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
      <Text h1>Casas</Text>
      <CasaList />
    </LayoutContent>
  );
};

export default CasaIndex;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await verifySession(context);
}
