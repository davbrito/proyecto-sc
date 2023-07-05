import { LayoutContent } from "~/components/Layout";
import { Card, Container, Link, Text } from "@nextui-org/react";
import { PersonasList } from "~/components/censo/PersonasList";
import { SearchForm } from "~/components/censo/SearchForm";
import { useState } from "react";
import { type GetServerSidePropsContext } from "next";
import { verifySession } from "~/utils/verifySession";

const CensoIndex = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <LayoutContent>
      <Container>
        <Card>
          <Card.Body>
            <Text h1>Datos del Censo</Text>
            <Container
              css={{ display: "flex", justifyContent: "space-evenly" }}
            >
              <div className="flex items-center justify-center">
                <Link
                  href="/censo/create"
                  css={{ my: "1rem" }}
                  className="mx-auto h-fit w-fit rounded bg-blue-700 px-2 py-3 text-blue-100"
                >
                  Nuevo censo.
                </Link>

                <Link
                  href="/censo/estadisticas"
                  css={{ my: "1rem" }}
                  className="mx-auto h-fit w-fit rounded bg-orange-700 px-2 py-3 text-blue-100"
                >
                  Ver estadisticas.
                </Link>
              </div>
              <SearchForm setSearchValue={setSearchValue} />
            </Container>
            <Container>
              <PersonasList search={searchValue} />
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
