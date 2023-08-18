import { Button, Grid, Table, Text } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { api } from "~/utils/api";
import { CustomLoading } from "../Loading";

export const ConsejosList = () => {
  const { data, isLoading } = api.consejo.getAll.useQuery();

  if (isLoading)
    return <CustomLoading className="h-[30vh] place-content-center" />;

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
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <Text h2 className="text-2xl font-light" css={{ textAlign: "center" }}>
          Aun no se han registrados censos.
        </Text>
      </Grid.Container>
    );

  return (
    <>
      <Table bordered lined headerLined>
        <Table.Header>
          <Table.Column align="center">Consejo</Table.Column>
          <Table.Column align="center">CLAP</Table.Column>
          <Table.Column align="center">Circuito</Table.Column>
          <Table.Column align="center">Comunidad</Table.Column>
          <Table.Column align="center">Sector</Table.Column>
          <Table.Column align="center">Acciones</Table.Column>
        </Table.Header>
        <Table.Body css={{ textTransform: "uppercase" }}>
          {data.map(
            ({
              circuito,
              comunidad,
              nombre_consejo,
              nombre_clap,
              sector,
              id,
            }) => (
              <Table.Row key={id}>
                <Table.Cell css={{ textAlign: "center", fontSize: "$sm" }}>
                  <Link href={`/consejo-comunal/${id}`}>{nombre_consejo}</Link>
                </Table.Cell>
                <Table.Cell css={{ textAlign: "center", fontSize: "$sm" }}>
                  {nombre_clap}
                </Table.Cell>
                <Table.Cell css={{ textAlign: "center", fontSize: "$sm" }}>
                  {circuito}
                </Table.Cell>
                <Table.Cell css={{ textAlign: "center", fontSize: "$sm" }}>
                  {comunidad}
                </Table.Cell>
                <Table.Cell css={{ textAlign: "center", fontSize: "$sm" }}>
                  {sector}
                </Table.Cell>
                <Table.Cell css={{ textAlign: "center", fontSize: "$sm" }}>
                  <Button>Hacer</Button>
                </Table.Cell>
              </Table.Row>
            )
          )}
        </Table.Body>
      </Table>
      {/* <Modal
        closeButton
        aria-labelledby="modal-title2"
        width="600px"
        open={openModal.isOpen}
        onClose={closeHandler}
        autoMargin
      >
        {!!openModal.id && (
          <Modal.Body>
            <FamiliarForm jefeId={openModal.id} closeModal={closeHandler} />
          </Modal.Body>
        )}
      </Modal> */}
    </>
  );
};
