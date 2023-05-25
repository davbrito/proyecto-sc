import { Container } from "@nextui-org/react";
import type { GetServerSidePropsContext, NextPage } from "next";
import { useSession } from "next-auth/react";
import { LayoutContent } from "~/components/Layout";
import { verifySession } from "~/utils/verifySession";

const Home: NextPage = () => {
  const { data } = useSession();

  return (
    <LayoutContent>
      <Container
        css={{
          p: "$10",
          border: "1px solid $gray600",
          borderRadius: "$md",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "520px",
          margin: "0 $5",
          bgColor: "$gray200",
        }}
      >
        <div>
          <h1 className="text-2xl">Proyecto de Censo 2023</h1>
        </div>
        <div>{data && <p>Hola de nuevo, {data.user.name}</p>}</div>
        <Container
          css={{
            display: "flex",
            justifyContent: "center",
            gap: "$4",
            mt: "$8",
          }}
        >
          <button className="inline-block cursor-pointer rounded border bg-blue-700 px-3 py-2 transition-all hover:bg-blue-600">
            Ver datos del censo
          </button>
          <button className="inline-block cursor-pointer rounded border bg-blue-700 px-3 py-2 transition-all hover:bg-blue-600">
            Ver familiares
          </button>
          <button className="inline-block cursor-pointer rounded border bg-blue-700 px-3 py-2 transition-all hover:bg-blue-600">
            Ver casas
          </button>
        </Container>
      </Container>
    </LayoutContent>
  );
};

export default Home;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await verifySession(context);
}
