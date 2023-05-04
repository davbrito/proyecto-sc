import { Table } from "@nextui-org/react";
import React from "react";
import { api } from "~/utils/api";
import { Loading } from "../Loading";

export const PersonasList = () => {
  const { data, isLoading } = api.persona.getJefesFamilias.useQuery();

  if (isLoading) return <Loading />;

  if (!data) return null;

  return (
    <div>
      <Table css={{ minWidth: "768px" }}>
        <Table.Header>
          <Table.Column align="center">Codigo</Table.Column>
          <Table.Column align="center">Nombres</Table.Column>
          <Table.Column align="center">Documento</Table.Column>
          <Table.Column align="center">Casa</Table.Column>
        </Table.Header>
        <Table.Body>
          {data.map(({ apellidos, nombres, cod, numeroDocumento }) => (
            <Table.Row key={cod.toString()}>
              <Table.Cell css={{ textAlign: "center" }}>
                {cod.toString().padStart(8, "0")}
              </Table.Cell>
              <Table.Cell css={{ textAlign: "center" }}>
                {apellidos}, {nombres}.
              </Table.Cell>
              <Table.Cell css={{ textAlign: "center" }}>
                {numeroDocumento}
              </Table.Cell>
              <Table.Cell css={{ textAlign: "center" }}>1</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};
