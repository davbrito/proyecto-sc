import { Table, Text, Button, Modal, Grid } from "@nextui-org/react";
import React, { useState } from "react";
import { api } from "~/utils/api";
import { CustomLoading } from "../Loading";
import Link from "next/link";
import { formatDate, getRelativeTime } from "~/utils/dates";
import FamiliarForm from "../familiar/FamiliarForm";

interface stateFamiliarModal {
  isOpen: boolean;
  id?: bigint;
}

export const PersonasList = ({ search }: { search?: string }) => {
  const { data, isLoading } = api.censo.getCensoInfor.useQuery(search);
  const [openModal, setOpenModal] = useState<stateFamiliarModal>({
    isOpen: false,
  });

  const closeHandler = () => setOpenModal({ isOpen: false });

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
          {search
            ? `No hay resultados para la busqueda del censo: '${search}'`
            : "Aun no se han registrados censos."}
        </Text>
      </Grid.Container>
    );

  return (
    <>
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
                <Link
                  href={`/censo/${jefeFamilia.id.toString()}`}
                  className="transition-all hover:text-blue-800  "
                >
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
                {formatDate(jefeFamilia.fechaNacimiento as Date)}
              </Table.Cell>
              <Table.Cell css={{ textAlign: "center", fontSize: "$sm" }}>
                {getRelativeTime(jefeFamilia.fechaNacimiento as Date)}
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
                <Button
                  className={`bg-blue-700 transition-all hover:bg-blue-900`}
                  size={"sm"}
                  css={{
                    mx: "auto",
                  }}
                  onPress={() =>
                    setOpenModal({ isOpen: true, id: jefeFamilia.id })
                  }
                >
                  Agregar pariente.
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Modal
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
      </Modal>
    </>
  );
};
