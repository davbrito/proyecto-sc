import { LayoutContent } from "~/components/Layout";

import { PersonaForm } from "~/components/censo/PersonaForm";
import { Container, Link, Table } from "@nextui-org/react";

const CensoIndex = () => {
  return (
    <LayoutContent>
      <h1>Datos</h1>

      <Link href="/censo/create">Nuevo censo</Link>

      <Table>
        <Table.Header>
          <Table.Column>Tabla</Table.Column>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>akljaskljd</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </LayoutContent>
  );
};

export default CensoIndex;
