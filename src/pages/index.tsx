import { Container, Text } from "@nextui-org/react";
import type { GetServerSidePropsContext, NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { LayoutContent } from "~/components/Layout";
import { verifySession } from "~/utils/verifySession";

const Home: NextPage = () => {
  const { data } = useSession();

  return (
    <LayoutContent className="flex flex-col items-center justify-center">
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
          <Text className="text-4xl font-medium" h1>
            Proyecto de Censo 2023
          </Text>
        </div>
        <div>
          {data && (
            <p className="text-lg">
              Hola de nuevo,{" "}
              <span className="font-semibold uppercase">{data.user.name}</span>.
            </p>
          )}
        </div>
        <Container
          css={{
            display: "flex",
            justifyContent: "center",
            gap: "$4",
            mt: "$8",
          }}
        >
          <Link
            href={"/censo"}
            className="inline-block cursor-pointer rounded  border bg-blue-600 px-3 py-2 text-white transition-all hover:bg-blue-900"
          >
            Ver datos del censo
          </Link>
          <Link
            href={"/familiares"}
            className="inline-block cursor-pointer rounded  border bg-blue-600 px-3 py-2 text-white transition-all hover:bg-blue-900"
          >
            Ver familiares
          </Link>
          <Link
            href={"/casas"}
            className="inline-block cursor-pointer rounded  border bg-blue-600 px-3 py-2 text-white transition-all hover:bg-blue-900"
          >
            Ver casas
          </Link>
        </Container>
      </Container>
    </LayoutContent>
  );
};

export default Home;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await verifySession(context);
}
