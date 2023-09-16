import {
  Button,
  Card,
  Container,
  Grid,
  Link,
  Table,
  Text,
} from "@nextui-org/react";
import React from "react";
import { api } from "~/utils/api";
import { CustomLoading } from "../Loading";

interface Props {
  consejoId: string;
}
export const ConsejoInfor = ({ consejoId }: Props) => {
  const { data, error, isLoading } = api.consejo.getById.useQuery({
    id: parseInt(consejoId),
  });

  if (isLoading) return <CustomLoading className="place-content-center" />;
  if (!data) return <div>Error</div>;

  return (
    <Container>
      <Card css={{ mt: "$10" }}>
        <Card.Body>
          <Text h1 className="text-center text-lg font-medium uppercase">
            Sistema Popular de Distribucion de Alimentos Comites Locales de
            Abastecimiento y Produccion Socialista
          </Text>
          <Text h2 className="text-center text-lg uppercase">
            Estado Bolivar
          </Text>
        </Card.Body>
      </Card>

      <Card css={{ mt: "$10" }}>
        <Card.Body>
          <Container
            css={{
              display: "flex",
              justifyContent: "center",
              gap: "$4",
              mt: "$8",
            }}
          >
            <Link
              href={`/consejo-comunal/${consejoId}/censo`}
              className="inline-block cursor-pointer rounded  border bg-blue-600 px-3 py-2 text-white transition-all hover:bg-blue-900"
            >
              Ver datos del censo
            </Link>
            <Link
              href={"/familiares"}
              className="inline-block cursor-pointer rounded  border bg-blue-600 px-3 py-2 text-white transition-all hover:bg-blue-900"
            >
              Ver familiares
            </Link>
            <Link
              href={"/casas"}
              className="inline-block cursor-pointer rounded  border bg-blue-600 px-3 py-2 text-white transition-all hover:bg-blue-900"
            >
              Ver casas
            </Link>
          </Container>
        </Card.Body>
      </Card>

      <Card css={{ mt: "$10" }}>
        <Card.Header>
          <Text h1 className="mx-auto text-center text-2xl font-medium">
            Identificacion del CLAP
          </Text>
        </Card.Header>
        <Card.Body>
          <Grid.Container className="grid  grid-cols-2 gap-1  lg:grid-cols-3  lg:text-base">
            <Grid.Container className="grid grid-cols-2 gap-3 border border-gray-500   px-3 py-2 lg:gap-0 lg:border-solid">
              <div className=" font-semibold">Municipio:</div>
              <div className="text-right uppercase">{data.municipio}</div>
            </Grid.Container>
            <Grid.Container className="grid  grid-cols-2 gap-3 border border-gray-500  px-3 py-2 lg:gap-0 lg:border-solid">
              <div className=" font-semibold">Parroquia:</div>
              <div className="text-right uppercase">{data.parroquia}</div>
            </Grid.Container>
            <Grid.Container className="grid grid-cols-2 gap-3 border border-gray-500  px-3 py-2 lg:gap-0 lg:border-solid">
              <div className=" font-semibold">Nombre CLAP:</div>
              <div className="text-right capitalize">{data.nombre_clap}</div>
            </Grid.Container>
          </Grid.Container>

          <Grid.Container
            gap={2}
            className="mt-1 grid  grid-cols-2 gap-1  lg:grid-cols-3  lg:text-base"
          >
            <Grid.Container className="grid grid-cols-2 gap-3 rounded-lg  border border-gray-500   px-3 py-2 lg:gap-0 lg:border-solid">
              <div className="  font-semibold">Consejo Comunal:</div>
              <div className="text-right uppercase">{data.nombre_consejo}</div>
            </Grid.Container>
            <Grid.Container className="grid  grid-cols-2 gap-3 border border-gray-500  px-3 py-2 lg:gap-0 lg:border-solid">
              <div className=" font-semibold">RIF:</div>
              <div className="text-right uppercase">{data.rif}</div>
            </Grid.Container>
            <Grid.Container className="grid grid-cols-2 gap-3 border border-gray-500  px-3 py-2 lg:gap-0 lg:border-solid">
              <div className=" font-semibold">Circuito:</div>
              <div className="text-right uppercase">{data.circuito}</div>
            </Grid.Container>
          </Grid.Container>

          <Grid.Container
            gap={2}
            className="mt-1 grid gap-1 border  lg:grid-cols-2  lg:text-base"
          >
            <Grid.Container className="grid grid-cols-2 gap-3 border border-gray-500 px-3 py-2 lg:gap-0 lg:border-solid">
              <div className=" font-semibold">Cantidad de familias:</div>
              <div className="text-right uppercase">
                {data.cantidad_familias}
              </div>
            </Grid.Container>
            <Grid.Container className="grid  grid-cols-2 gap-3 border border-gray-500 px-3 py-2 lg:gap-0 lg:border-solid">
              <div className=" font-semibold">Cantidad de Combos:</div>
              <div className="text-right uppercase">{data.cantidad_combos}</div>
            </Grid.Container>
          </Grid.Container>
        </Card.Body>
        <Card.Footer>
          <Link
            href={`/consejo-comunal/${consejoId}/censo`}
            className="mx-auto h-fit w-fit rounded-md bg-blue-600 px-4 py-3 text-white transition-colors hover:bg-blue-700"
          >
            Ver Censados
          </Link>
        </Card.Footer>
      </Card>

      <Card css={{ mb: "$10" }}>
        <Card.Header css={{ position: "relative" }}>
          <Text
            h1
            className="mx-auto flex-shrink text-center text-2xl font-medium"
          >
            Ficha General del CLAP
          </Text>
          <button className=" h-fit w-fit rounded-md border-none bg-green-700 px-3 py-2 text-sm text-white transition-colors hover:bg-green-600">
            Añadir
          </button>
        </Card.Header>
        <Card.Body>
          <Table bordered lined headerLined striped>
            <Table.Header>
              <Table.Column>Estructura</Table.Column>
              <Table.Column>Nombres y Apellidos</Table.Column>
              <Table.Column>Cedula</Table.Column>
              <Table.Column>Telefono</Table.Column>
              <Table.Column>Profesion</Table.Column>
              <Table.Column>Correo Electronico</Table.Column>
              <Table.Column>Direccion</Table.Column>
            </Table.Header>
            <Table.Body>
              <Table.Row key={1}>
                <Table.Cell>LIDER DE COMUNIDAD:</Table.Cell>
                <Table.Cell>YESSICA GONZÁLEZ GÓMEZ</Table.Cell>
                <Table.Cell>10184914</Table.Cell>
                <Table.Cell>04249033196</Table.Cell>
                <Table.Cell>LIC. GESTIÓN SOCIAL </Table.Cell>
                <Table.Cell>yessigonza@gmail.com</Table.Cell>
                <Table.Cell>C. KAVANAYEN, MZNA 13, # 9</Table.Cell>
              </Table.Row>
              <Table.Row key={2}>
                <Table.Cell>LIDER DE COMUNIDAD:</Table.Cell>
                <Table.Cell>YESSICA GONZÁLEZ GÓMEZ</Table.Cell>
                <Table.Cell>10184914</Table.Cell>
                <Table.Cell>04249033196</Table.Cell>
                <Table.Cell>LIC. GESTIÓN SOCIAL </Table.Cell>
                <Table.Cell>yessigonza@gmail.com</Table.Cell>
                <Table.Cell>C. KAVANAYEN, MZNA 13, # 9</Table.Cell>
              </Table.Row>
              <Table.Row key={3}>
                <Table.Cell>LIDER DE COMUNIDAD:</Table.Cell>
                <Table.Cell>YESSICA GONZÁLEZ GÓMEZ</Table.Cell>
                <Table.Cell>10184914</Table.Cell>
                <Table.Cell>04249033196</Table.Cell>
                <Table.Cell>LIC. GESTIÓN SOCIAL </Table.Cell>
                <Table.Cell>yessigonza@gmail.com</Table.Cell>
                <Table.Cell>C. KAVANAYEN, MZNA 13, # 9</Table.Cell>
              </Table.Row>
              <Table.Row key={4}>
                <Table.Cell>LIDER DE COMUNIDAD:</Table.Cell>
                <Table.Cell>YESSICA GONZÁLEZ GÓMEZ</Table.Cell>
                <Table.Cell>10184914</Table.Cell>
                <Table.Cell>04249033196</Table.Cell>
                <Table.Cell>LIC. GESTIÓN SOCIAL </Table.Cell>
                <Table.Cell>yessigonza@gmail.com</Table.Cell>
                <Table.Cell>C. KAVANAYEN, MZNA 13, # 9</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Card.Body>
      </Card>

      <Card css={{ mb: "$10" }}>
        <Card.Header css={{ position: "relative" }}>
          <Text
            h1
            className="mx-auto flex-shrink text-center text-2xl font-medium"
          >
            Lideres de calle
          </Text>
          <button className=" h-fit w-fit rounded-md border-none bg-green-700 px-3 py-2 text-sm text-white transition-colors hover:bg-green-600">
            Añadir
          </button>
        </Card.Header>
        <Card.Body>
          <Table bordered lined headerLined striped>
            <Table.Header>
              <Table.Column align="center">N#</Table.Column>
              <Table.Column align="center">Cedula</Table.Column>
              <Table.Column align="center">Nacionalidad</Table.Column>
              <Table.Column align="center" css={{ width: "max-content" }}>
                Fecha de nacimiento
              </Table.Column>
              <Table.Column align="center">Genero</Table.Column>
              <Table.Column align="center">Profesion</Table.Column>
              <Table.Column align="center">Nombres y Apellidos</Table.Column>
              <Table.Column align="center">Familias</Table.Column>
              <Table.Column align="center">Combos</Table.Column>
              <Table.Column align="center">Telefono</Table.Column>
              <Table.Column align="center">Correo Electronico</Table.Column>
              <Table.Column align="center">Direccion</Table.Column>
            </Table.Header>
            <Table.Body>
              <Table.Row key={1}>
                <Table.Cell>1</Table.Cell>
                <Table.Cell>17339263</Table.Cell>
                <Table.Cell>V</Table.Cell>
                <Table.Cell>3/6/1985</Table.Cell>
                <Table.Cell>F</Table.Cell>
                <Table.Cell>AMA DE CASA</Table.Cell>
                <Table.Cell>YHANEDDY RIVAS</Table.Cell>
                <Table.Cell>28</Table.Cell>
                <Table.Cell>29</Table.Cell>
                <Table.Cell>04168674166</Table.Cell>
                <Table.Cell>yhannedys15@gmail.com</Table.Cell>
                <Table.Cell>CLL. PIJIGUAOS, MZNA 16, CASA 14</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>

          <div className="mt-2 text-center">
            <Text h4 className="mx-auto font-normal">
              TOTAL COMBOS: <span className="font-bold">56</span>
            </Text>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};
