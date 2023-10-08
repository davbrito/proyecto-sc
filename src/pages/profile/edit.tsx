import { type GetServerSidePropsContext } from "next";
import { EditForm } from "../../components/profile/editForm";
import { verifySession } from "~/utils/verifySession";
import { LayoutContent } from "~/components/Layout";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { CustomLoading } from "~/components/Loading";

export default function Editar() {
  const { data, status } = useSession();

  if (status === "loading") return <CustomLoading />;

  if (!data) return null;

  return (
    <LayoutContent className="flex flex-col items-center justify-center">
      <div className="container">
        <Card className="mx-auto max-w-lg">
          <CardHeader>
            <h2 className=" mx-auto  text-2xl font-bold">
              Actualizar Informacion
            </h2>
          </CardHeader>
          <CardBody>
            <EditForm username={data?.user?.username} />
          </CardBody>
        </Card>
      </div>
    </LayoutContent>
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await verifySession(context);
}
