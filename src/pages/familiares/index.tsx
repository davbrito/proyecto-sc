import { Card, CardBody } from "@nextui-org/react";
import { type GetServerSidePropsContext } from "next";
import { LayoutContent } from "~/components/Layout";
import { FamiliarList } from "~/components/familiar/FamiliarList";
import { verifySession } from "~/utils/verifySession";

const Index = () => {
  return (
    <LayoutContent>
      <div className="container mx-auto my-5 place-content-center">
        <Card className="">
          <CardBody>
            <h3 className="mb-6 text-center text-4xl font-light">
              Lista de familiares agregados
            </h3>
            <div className="container">
              <FamiliarList />
            </div>
          </CardBody>
        </Card>
      </div>
    </LayoutContent>
  );
};

export default Index;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await verifySession(context);
}
