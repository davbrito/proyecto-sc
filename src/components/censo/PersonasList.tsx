import { Table } from "@nextui-org/react";
import React from "react";
import { api } from "~/utils/api";
import { CustomLoading } from "../Loading";
import Link from "next/link";

export const PersonasList = () => {
  const { data, isLoading } = api.persona.getCensoInfor.useQuery();

  if (isLoading) return <CustomLoading />;

  if (!data) return null;

  return (
    <div>
      <Table bordered lined headerLined>
        <Table.Header>
          <Table.Column align="center">Codigo</Table.Column>
          <Table.Column align="center">Manzana</Table.Column>
          <Table.Column align="center">Casa</Table.Column>
          <Table.Column align="center">Nombres</Table.Column>
          <Table.Column align="center">Documento</Table.Column>
          <Table.Column align="center">Casa</Table.Column>
          <Table.Column align="center">Fecha</Table.Column>
          <Table.Column align="center">Familia</Table.Column>
          <Table.Column align="center">Genero</Table.Column>
          <Table.Column align="center">Acciones</Table.Column>
        </Table.Header>
        <Table.Body>
          {data.map(({ jefeFamilia, id, casa, tipoFamilia }) => (
            <Table.Row key={id.toString()}>
              <Table.Cell css={{ textAlign: "center" }}>
                {id.toString().padStart(8, "0")}
              </Table.Cell>
              <Table.Cell css={{ textAlign: "center" }}>
                {casa.manzana}
              </Table.Cell>
              <Table.Cell css={{ textAlign: "center" }}>
                {casa.casa.padStart(2, "0")}
              </Table.Cell>
              <Table.Cell css={{ textAlign: "center" }}>
                {jefeFamilia.apellidos.toUpperCase()},{" "}
                {jefeFamilia.nombres.toUpperCase()}.
              </Table.Cell>
              <Table.Cell css={{ textAlign: "center" }}>
                {jefeFamilia.tipoDocumento.toUpperCase()}-
                {jefeFamilia.numeroDocumento}
              </Table.Cell>
              <Table.Cell css={{ textAlign: "center" }}>
                {jefeFamilia.genero}
              </Table.Cell>
              <Table.Cell css={{ textAlign: "center" }}>
                {jefeFamilia.fechaNacimiento.toLocaleString()}
              </Table.Cell>
              <Table.Cell css={{ textAlign: "center" }}>
                {tipoFamilia.toUpperCase()}
              </Table.Cell>
              <Table.Cell css={{ textAlign: "center" }}>
                {jefeFamilia.genero.toUpperCase() === "F"
                  ? "Femenino"
                  : "Masculino"}
              </Table.Cell>
              <Table.Cell>
                <Link href={"/familiares/create"}>Añadir Pariente</Link>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};
