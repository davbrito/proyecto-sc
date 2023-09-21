import type { GetServerSidePropsContext, NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { LayoutContent } from "~/components/Layout";
import { verifySession } from "~/utils/verifySession";

const Home: NextPage = () => {
  const { data } = useSession();

  return (
    <LayoutContent className="flex flex-col items-center justify-center">
      <div className="max-w-lg rounded-medium border border-solid border-content3-foreground bg-content3 p-10 text-content3-foreground shadow-medium">
        <h1 className="text-4xl font-medium">Proyecto de Censo 2023</h1>
        {data && (
          <p className="text-lg">
            Hola de nuevo,{" "}
            <strong className="text-xl font-bold uppercase">
              {data.user.name}
            </strong>
            .
          </p>
        )}
      </div>
    </LayoutContent>
  );
};

export default Home;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await verifySession(context);
}
