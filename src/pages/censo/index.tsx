import { LayoutContent } from "~/components/Layout";
import { Container, Link, Table } from "@nextui-org/react";
import { PersonasList } from "~/components/censo/PersonasList";

const CensoIndex = () => {
  return (
    <LayoutContent>
      <h1>Datos</h1>

      <Link href="/censo/create">Nuevo censo</Link>

      <PersonasList />
    </LayoutContent>
  );
};

export default CensoIndex;
