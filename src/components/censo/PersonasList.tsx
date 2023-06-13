import { Table, Container, Grid, Text } from "@nextui-org/react";
import React, { useState } from "react";
import { api } from "~/utils/api";
import { CustomLoading } from "../Loading";
import Link from "next/link";
import { formatDate, getRelativeTime } from "~/utils/dates";

export const PersonasList = ({ search }: { search?: string }) => {
  const { data, isLoading } = api.censo.getCensoInfor.useQuery(search);

  if (isLoading) return <CustomLoading />;

  if (!data) return null;

  if (data.length === 0)
    return (
      <Container
        css={{
          border: "1px solid $gray400",
          borderRadius: "$3xl",
          padding: "$10 $6",
          display: "flex",
          justifyContent: "center",
        }}
        className="mx-auto max-w-xl"
      >
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <Text h2 css={{ textAlign: "center" }}>
          {search
            ? `No hay resultados para la busqueda del censo: '${search}'`
            : "Aun no se han registrados censos."}
        </Text>
      </Container>
    );

  return (
    <Table bordered lined headerLined>
      <Table.Header>
        <Table.Column align="center">Codigo</Table.Column>
        <Table.Column align="center">Manzana</Table.Column>
        <Table.Column align="center">Casa</Table.Column>
        <Table.Column align="center">Nombres</Table.Column>
        <Table.Column align="center">Documento</Table.Column>
        <Table.Column align="center">Fecha Nacimiento</Table.Column>
        <Table.Column align="center">Edad</Table.Column>
        <Table.Column align="center">Familia</Table.Column>
        <Table.Column align="center">Genero</Table.Column>
        <Table.Column align="center">Acciones</Table.Column>
      </Table.Header>
      <Table.Body>
        {data.map(({ jefeFamilia, id, casa, tipoFamilia }) => (
          <Table.Row key={id.toString()}>
            <Table.Cell css={{ textAlign: "center", fontSize: "$sm" }}>
              <Link href={`/censo/${jefeFamilia.id.toString()}`}>
                {id.toString().padStart(8, "0")}
              </Link>
            </Table.Cell>
            <Table.Cell css={{ textAlign: "center", fontSize: "$sm" }}>
              {casa.manzana}
            </Table.Cell>
            <Table.Cell css={{ textAlign: "center", fontSize: "$sm" }}>
              {casa.casa.padStart(2, "0")}
            </Table.Cell>
            <Table.Cell css={{ textAlign: "center", fontSize: "$sm" }}>
              {jefeFamilia.apellidos.toUpperCase()},{" "}
              {jefeFamilia.nombres.toUpperCase()}.
            </Table.Cell>
            <Table.Cell css={{ textAlign: "center", fontSize: "$sm" }}>
              {jefeFamilia.tipoDocumento.toUpperCase()}-
              {jefeFamilia.numeroDocumento}
            </Table.Cell>

            <Table.Cell css={{ textAlign: "center", fontSize: "$sm" }}>
              {formatDate(jefeFamilia.fechaNacimiento)}
            </Table.Cell>
            <Table.Cell css={{ textAlign: "center", fontSize: "$sm" }}>
              {getRelativeTime(jefeFamilia.fechaNacimiento)}
            </Table.Cell>
            <Table.Cell css={{ textAlign: "center", fontSize: "$sm" }}>
              {tipoFamilia.toUpperCase()}
            </Table.Cell>
            <Table.Cell css={{ textAlign: "center", fontSize: "$sm" }}>
              {jefeFamilia.genero.toUpperCase() === "F"
                ? "Femenino"
                : "Masculino"}
            </Table.Cell>
            <Table.Cell>
              <Link href={`/familiares/create/${jefeFamilia.id}`}>
                Añadir Pariente
              </Link>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
