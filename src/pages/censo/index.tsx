import { LayoutContent } from "~/components/Layout";
import { Container, Link, Text } from "@nextui-org/react";
import { PersonasList } from "~/components/censo/PersonasList";
import { SearchForm } from "~/components/censo/SearchForm";
import { useRef, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { verifySession } from "~/utils/verifySession";

const CensoIndex = () => {
  const valueSearch = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <LayoutContent>
      <Container>
        <Text h1>Datos del Censo</Text>
        <Container css={{ display: "flex", justifyContent: "space-evenly" }}>
          <div className="flex items-center justify-center">
            <Link
              href="/censo/create"
              css={{ my: "1rem" }}
              className="mx-auto h-fit w-fit rounded bg-blue-700 px-2 py-3 text-blue-100"
            >
              Nuevo censo
            </Link>
          </div>
          <SearchForm setSearchValue={setSearchValue} />
        </Container>
        <Container>
          <PersonasList search={searchValue} />
        </Container>
      </Container>
    </LayoutContent>
  );
};

export default CensoIndex;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await verifySession(context);
}
