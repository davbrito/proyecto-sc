import { LayoutContent } from "~/components/Layout";
import { Container, Link, Text } from "@nextui-org/react";
import { PersonasList } from "~/components/censo/PersonasList";
import { SearchForm } from "~/components/censo/SearchForm";
import { useRef, useState } from "react";

const CensoIndex = () => {
  const valueSearch = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <Container>
      <Text h1>Datos del Censo</Text>
      <Container css={{display:"flex",justifyContent:"space-evenly"}} >
        <div className="flex justify-center items-center">
          <Link
            href="/censo/create"
            css={{ my: "1rem" }}
            className="rounded bg-blue-700 px-2 py-3 text-blue-100 mx-auto w-fit h-fit"
          >
            Nuevo censo
          </Link>
        </div>
        <SearchForm setSearchValue={setSearchValue} />

      </Container>

      <PersonasList search={searchValue} />
    </Container>
  );
};

export default CensoIndex;
