import { Container, Link } from "@nextui-org/react";
import { GetServerSidePropsContext } from "next";
import React, { useContext } from "react";
import { LayoutContent } from "~/components/Layout";
import { CasaList } from "~/components/censo/CasaList";
import { api } from "~/utils/api";
import { verifySession } from "~/utils/verifySession";

const CasaIndex = () => {
  const { isLoading, data } = api.casa.getAllCasas.useQuery();

  console.log(data);
  return (
    <LayoutContent>
      <Container>
        <h1>Casas</h1>
        <Link
          href="/casas/create"
          css={{ my: "1rem" }}
          className="rounded bg-blue-700 px-2 py-3 text-blue-100"
        >
          Nueva casa
        </Link>
        <CasaList />
      </Container>
    </LayoutContent>
  );
};

export default CasaIndex;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await verifySession(context);
}
