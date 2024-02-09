import { Card, CardBody, Link } from "@nextui-org/react";
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
      <div className="container mx-auto my-5 place-content-center">
        <Card>
          <CardBody>
            <h3 className="mb-6 text-center text-4xl font-light">
              Casas registradas
            </h3>
            <div className="container">
              <CasaList />
            </div>
          </CardBody>
        </Card>
      </div>
    </LayoutContent>
  );
};

export default CasaIndex;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await verifySession(context);
}
