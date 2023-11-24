import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import type { GetServerSidePropsContext, NextPage } from "next";
import { useSession } from "next-auth/react";
import { LayoutContent } from "~/components/Layout";
import { verifySession } from "~/utils/verifySession";
import NextImage from "next/image";

const Home: NextPage = () => {
  const { data } = useSession();

  if (data?.user.role_user === "LIDER_CALLE") {
  }

  return (
    <LayoutContent className="flex flex-col items-center justify-center">
      <Card className="p-5">
        <CardHeader className="flex flex-col">
          <div className="mx-auto ">
            <Image
              src="/img/clap.jpeg"
              width={600}
              alt="fondo"
              isBlurred
              height={200}
              as={NextImage}
            />
          </div>
          <h1 className="my-3 block text-3xl font-normal ">
            Proyecto de Censo 2023
          </h1>
        </CardHeader>
        <CardBody>
          {data && (
            <p className="text-center text-lg">
              Hola de nuevo,{" "}
              <span className="text-xl font-semibold uppercase">
                {data.user.name}
              </span>
              .
            </p>
          )}
          {data?.user.role_user === "LIDER_CALLE" && (
            <div>
              <h3>Eres Lider de calle</h3>
            </div>
          )}

          {data?.user.role_user === "ADMIN" && (
            <div>
              <h3>Eres admin</h3>
            </div>
          )}

          {data?.user.role_user === "LIDER_COMUNIDAD" && (
            <div>
              <h3>Eres Lider de comunidad</h3>
            </div>
          )}
        </CardBody>
      </Card>
    </LayoutContent>
  );
};

export default Home;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await verifySession(context);
}
