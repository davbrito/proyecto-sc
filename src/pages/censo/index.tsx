import { LayoutContent } from "~/components/Layout";
import { Container, Link, Table, Text } from "@nextui-org/react";
import { PersonasList } from "~/components/censo/PersonasList";

const CensoIndex = () => {
  return (
    <LayoutContent>
      <Text h1>Datos del Censo</Text>

      <Link
        href="/censo/create"
        css={{ my: "1rem" }}
        className="rounded bg-blue-700 px-2 py-3 text-blue-100"
      >
        Nuevo censo
      </Link>

      <PersonasList />
    </LayoutContent>
  );
};

export default CensoIndex;
