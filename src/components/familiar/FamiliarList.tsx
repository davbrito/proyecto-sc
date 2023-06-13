import { Table } from "@nextui-org/react";
import React from "react";
import { api } from "~/utils/api";
import { CustomLoading } from "../Loading";
import Link from "next/link";
import { getRelativeTime } from "~/utils/dates";

export const FamiliarList = () => {
  const { data, isLoading } = api.familia.getAll.useQuery();

  if (isLoading) return <CustomLoading />;

  if (!data) return null;
  console.log(data);
  return (
    <div>
      <Table bordered lined headerLined>
        <Table.Header>
          <Table.Column align="center">Jefe de Familia</Table.Column>
          <Table.Column align="center">Apellidos</Table.Column>
          <Table.Column align="center">Nombres</Table.Column>
          <Table.Column align="center">Edad</Table.Column>
          <Table.Column align="center">Genero</Table.Column>
          <Table.Column align="center">Observacion</Table.Column>
          <Table.Column align="center">Documento de identidad</Table.Column>
        </Table.Header>
        <Table.Body>
          {data.map(
            ({
              id,
              nombres,
              numeroDocumento,
              apellidos,
              observacion,
              tipoDocumento,
              jefeFamilia,
              genero,
              fechaNacimiento,
            }) => (
              <Table.Row key={id.toString()}>
                <Table.Cell css={{ textAlign: "center" }}>
                  <Link href={`/censo/${jefeFamilia.id.toString()}`}>
                    {jefeFamilia.tipoDocumento.toUpperCase()}-
                    {jefeFamilia.numeroDocumento}
                  </Link>
                </Table.Cell>
                <Table.Cell css={{ textAlign: "center" }}>
                  {apellidos.toUpperCase()}
                </Table.Cell>
                <Table.Cell css={{ textAlign: "center" }}>
                  {nombres.toUpperCase()}
                </Table.Cell>
                <Table.Cell css={{ textAlign: "center" }}>
                  {getRelativeTime(fechaNacimiento)}
                </Table.Cell>
                <Table.Cell css={{ textAlign: "center" }}>
                  {genero.toUpperCase() === "F" ? "Femenino" : "Masculino"}
                </Table.Cell>
                <Table.Cell
                  css={{ textAlign: "center", textTransform: "capitalize" }}
                >
                  {observacion || "No tiene"}.
                </Table.Cell>
                <Table.Cell css={{ textAlign: "center" }}>
                  {tipoDocumento.toUpperCase()}-{numeroDocumento}
                </Table.Cell>
              </Table.Row>
            )
          )}
        </Table.Body>
      </Table>
    </div>
  );
};
