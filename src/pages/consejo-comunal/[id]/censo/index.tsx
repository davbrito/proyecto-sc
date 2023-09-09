import { LayoutContent } from "~/components/Layout";
import { Card, Container, Link, Row, Text } from "@nextui-org/react";
import { CensoList } from "~/components/censo/CensoList";
import { SearchForm } from "~/components/censo/SearchForm";
import { useState } from "react";
import { type GetServerSidePropsContext } from "next";
import { verifySession } from "~/utils/verifySession";
import { useRouter } from "next/router";

const CensoIndex = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const router = useRouter();

  const consejoComunalId = router.query.id ? router.query.id.toString() : "";

  return (
    <LayoutContent>
      <Container>
        <Row className="my-4 flex-col gap-4 md:flex-row-reverse">
          <Card
            css={{}}
            className="flex flex-row flex-wrap items-center justify-evenly self-stretch"
          >
            <Link
              href={`/consejo-comunal/${consejoComunalId}/censo/create`}
              css={{ my: "1rem" }}
              className=" h-fit w-fit rounded-md bg-green-700 px-4 py-3 text-lg text-white"
            >
              Nuevo censo
            </Link>

            <Link
              href={`/consejo-comunal/${consejoComunalId}/censo/estadisticas`}
              css={{ my: "1rem" }}
              className=" h-fit w-fit rounded-md bg-orange-600 px-4 py-3 text-lg text-white"
            >
              Ver estadisticas
            </Link>
          </Card>
          <SearchForm setSearchValue={setSearchValue} />
        </Row>
        <Card css={{ mb: "16px !important" }}>
          <Card.Body>
            <Text h1 className=" text-center text-4xl font-medium ">
              Datos del Censo
            </Text>

            <Container css={{ mt: "16px" }}>
              <CensoList search={searchValue} consejoId={consejoComunalId} />
            </Container>
          </Card.Body>
        </Card>
      </Container>
    </LayoutContent>
  );
};

export default CensoIndex;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await verifySession(context);
}
