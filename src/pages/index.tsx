import type { GetServerSidePropsContext, NextPage } from "next";
import { useSession } from "next-auth/react";
import { LayoutContent } from "~/components/Layout";
import { verifySession } from "~/utils/verifySession";

const Home: NextPage = () => {
  const { data } = useSession();

  return (
    <LayoutContent>
      <div>
        <h1 className="text-2xl">Proyecto de Censo 2023</h1>
      </div>
      <div>{data && <p>Hola de nuevo, {data.user.name}</p>}</div>
    </LayoutContent>
  );
};

export default Home;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await verifySession(context);
}
