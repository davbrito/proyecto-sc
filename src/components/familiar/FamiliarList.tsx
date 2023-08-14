import { Table, Grid, Text } from "@nextui-org/react";
import React from "react";
import { api } from "~/utils/api";
import { CustomLoading } from "../Loading";
import Link from "next/link";
import { getRelativeTime } from "~/utils/dates";

export const FamiliarList = () => {
  const { data, isLoading } = api.familia.getAll.useQuery();

  if (isLoading) return <CustomLoading className="place-content-center" />;

  if (!data) return null;

  if (data.length === 0)
    return (
      <Grid.Container
        css={{
          border: "1px solid $gray400",
          borderRadius: "$3xl",
          padding: "$10 $6",
        }}
        className="mx-auto min-h-[40vh] w-full place-content-center"
      >
        <Text h2 className="text-2xl font-light" css={{ textAlign: "center" }}>
          Aun no se han registrados familiares.
        </Text>
      </Grid.Container>
    );

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
                  <Link
                    href={`/censo/${jefeFamilia.id.toString()}`}
                    className="transition-all hover:text-blue-800  "
                  >
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
                  {numeroDocumento
                    ? `${tipoDocumento.toUpperCase()}-${numeroDocumento}`
                    : "NO POSEE"}
                </Table.Cell>
              </Table.Row>
            )
          )}
        </Table.Body>
      </Table>
    </div>
  );
};
