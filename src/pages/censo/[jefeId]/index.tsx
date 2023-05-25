import { Table, Text, Button, Card, Container } from "@nextui-org/react";
import {
  type GetStaticProps,
  type GetStaticPropsContext,
  type InferGetStaticPropsType,
} from "next";
import React from "react";
import { LayoutContent } from "~/components/Layout";
import { CustomLoading } from "~/components/Loading";
import { prisma } from "~/server/db";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { api } from "~/utils/api";

export async function getStaticProps(
  context: GetStaticPropsContext<{ jefeId: string }>
) {
  const ssg = generateSSGHelper();

  const id = context?.params?.jefeId;

  if (typeof id !== "string") throw new Error("no Id");

  await ssg.jefe.getById.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
    revalidate: 1,
  };
}

export const getStaticPaths = async () => {
  const jefes = await prisma.jefeFamilia.findMany();

  const paths = jefes.map((jefe) => ({
    params: { jefeId: jefe.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

const IndexJefeCenso = (props: InferGetStaticPropsType<GetStaticProps>) => {
  const { data, isLoading, refetch } = api.jefe.getById.useQuery(
    {
      id: props.id,
    },
    { refetchOnWindowFocus: false }
  );

  const { mutate } = api.familia.deleteById.useMutation();

  const handleDelete = async (id: bigint) => {
    try {
      mutate(
        { id },
        {
          onSuccess(data, variables, context) {
            console.log(data);
            refetch();
          },
          onError(error, variables, context) {
            console.log(error);
          },
        }
      );
    } catch (error) {}
  };

  if (isLoading) <CustomLoading />;
  if (!data) return null;

  return (
    <LayoutContent>
      <Text h1>
        Perfil de,{" "}
        <span className="font-thin uppercase text-gray-400">
          {data?.nombres}.
        </span>
      </Text>
      <Container css={{ my: "$6" }}>
        <Card>
          <Card.Header>
            <Text h3>Información del Jefe de Familia.</Text>
          </Card.Header>
          <Card.Divider />
          <Card.Body>
            <div className="flex flex-grow justify-center gap-12">
              <div>Nombre: {data.nombres}</div>
              <div>Apellidos: {data.apellidos}</div>
              <div>Edad: {data.edad}</div>
              <div>
                Documento de identidad {data.tipoDocumento.toUpperCase()}-
                {data.numeroDocumento}
              </div>
              <div>Observacion: {data.observacion || "Ninguna"}</div>
            </div>
          </Card.Body>
        </Card>
      </Container>
      <Container css={{ my: "$6" }}>
        <Card>
          <Card.Header>
            <Text h3>Datos de casa.</Text>
          </Card.Header>
          <Card.Divider />
          <Card.Body>
            <div className="flex flex-grow justify-center gap-12">
              <div>Manzana N°: {data.censo[0]?.casa.manzana}</div>
              <div>Calle: {data.censo[0]?.casa.calle.toUpperCase()}</div>
              <div>Casa N°: {data.censo[0]?.casa.casa}</div>
              <div>
                Direccion:{" "}
                <span className="capitalize">
                  {data.censo[0]?.casa.direccion}.
                </span>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Container>
      <Container css={{ my: "$6" }}>
        <Card>
          <Card.Header>
            <Text h3>Caja Clap.</Text>
          </Card.Header>
          <Card.Divider />
          <Card.Body>
            <div className="flex flex-grow justify-center gap-12">
              <div>
                <h4>Cajas Asignadas: {data.censo[0]?.cajasClapsPorRecibir}</h4>
              </div>
              <div>
                <h4>Carga Familiar: {data.censo[0]?.cargaFamiliar}</h4>
              </div>
              <div>
                <h4>Tipo de Familia: {data.censo[0]?.tipoFamilia}</h4>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Container>

      <Table>
        <Table.Header>
          <Table.Column css={{ textAlign: "center" }}>Nombres</Table.Column>
          <Table.Column css={{ textAlign: "center" }}>Apellidos</Table.Column>
          <Table.Column css={{ textAlign: "center" }}>Edad</Table.Column>
          <Table.Column css={{ textAlign: "center" }}>Genero</Table.Column>
          <Table.Column css={{ textAlign: "center" }}>Parentesco</Table.Column>
          <Table.Column css={{ textAlign: "center" }}>Observacion</Table.Column>
          <Table.Column css={{ textAlign: "center" }}>Acciones</Table.Column>
        </Table.Header>
        <Table.Body>
          {data.familiar.map(
            ({
              apellidos,
              nombres,
              genero,
              id,
              edad,
              observacion,
              parentesco,
            }) => (
              <Table.Row key={id.toString()}>
                <Table.Cell css={{ textAlign: "center" }}>
                  {nombres.toUpperCase()}
                </Table.Cell>
                <Table.Cell css={{ textAlign: "center" }}>
                  {apellidos.toUpperCase()}
                </Table.Cell>
                <Table.Cell css={{ textAlign: "center" }}>{edad}</Table.Cell>
                <Table.Cell css={{ textAlign: "center" }}>
                  {genero.toLocaleLowerCase() === "m"
                    ? "Masculino"
                    : "Femenino"}
                </Table.Cell>
                <Table.Cell
                  css={{ textAlign: "center", textTransform: "capitalize" }}
                >
                  {parentesco}
                </Table.Cell>
                <Table.Cell css={{ textAlign: "center" }}>
                  {observacion || "Ninguna"}
                </Table.Cell>
                <Table.Cell
                  css={{
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "$4 0",
                  }}
                >
                  <Button color="error" onPress={(e) => handleDelete(id)}>
                    {" "}
                    Eliminar
                  </Button>
                  <Button color="warning">Actualizar</Button>
                </Table.Cell>
              </Table.Row>
            )
          )}
        </Table.Body>
      </Table>
    </LayoutContent>
  );
};

export default IndexJefeCenso;
