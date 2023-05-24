import { LayoutContent } from "~/components/Layout";
import { Link, Text } from "@nextui-org/react";
import { PersonasList } from "~/components/censo/PersonasList";
import { SearchForm } from "~/components/censo/SearchForm";
import { useRef, useState } from "react";

const CensoIndex = () => {
  const valueSearch = useRef<HTMLInputElement>(null)
  const [searchValue,setSearchValue] = useState<string>("")

  return (
    <LayoutContent>
      <Text h1>Datos del Censo</Text>

      <SearchForm setSearchValue={setSearchValue}/>
    
      <Link
        href="/censo/create"
        css={{ my: "1rem" }}
        className="rounded bg-blue-700 px-2 py-3 text-blue-100"
      >
        Nuevo censo
      </Link>

      <PersonasList search={searchValue}/>
    </LayoutContent>
  );
};

export default CensoIndex;
