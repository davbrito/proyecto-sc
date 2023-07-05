import { Button, Card, Container, Modal, Table, Text } from "@nextui-org/react";
import React, { useState } from "react";
import { api } from "~/utils/api";
import { CustomLoading } from "../Loading";
import { getRelativeTime } from "~/utils/dates";
import FamiliarForm from "../familiar/FamiliarForm";
import { type JefeFamilia, type Familiar } from "@prisma/client";
import JefeEditForm from "./JefeEditForm";
import DeleteConfirmation from "../DeleteConfirmation";

interface Edit {
  idToEdit?: Familiar | JefeFamilia;
  isOpen: boolean;
}

interface Delete {
  id?: bigint;
  isOpen: boolean;
}

const JefeProfile = ({ id }: { id: "string" }) => {
  const { data, isLoading, refetch } = api.jefe.getById.useQuery(
    {
      id,
    },
    { refetchOnWindowFocus: false }
  );
  const familiar = api.familia.deleteById.useMutation();
  const jefe = api.jefe.delete.useMutation();
  const [editJefe, setEditJefe] = useState<Edit>({
    isOpen: false,
  });
  const [editFamiliar, setEditFamiliar] = useState<Edit>({
    isOpen: false,
  });
  const [deleteFamiliar, setDeleteFamiliar] = useState<Delete>({
    isOpen: false,
  });

  const closeHandler = () => {
    setEditFamiliar({ isOpen: false });
    setEditJefe({ isOpen: false });

    refetch();
  };

  const handleDeleteJefe = async () => {
    if (!data || !data.censo || !data.censo[0]) return;

    jefe.mutate(
      {
        id: data.id,
        censoId: data.censo[0].id,
      },
      {
        onSuccess(data, variables, context) {
          console.log(data);
        },
        onError(error, variables, context) {
          console.log(error);
        },
      }
    );
  };

  const handleDelete = async (id: bigint) => {
    try {
      console.log("Se elimino el registro ", id);
      // familiar.mutate(
      //   { id },
      //   {
      //     onSuccess(data, variables, context) {
      //       console.log(data);
      //       refetch();
      //     },
      //     onError(error, variables, context) {
      //       console.log(error);
      //     },
      //   }
      // );
    } catch (error) {}
  };

  const handleEditFamiliar = (id: string) => {
    const familiarToEdit = data?.familiar.filter(
      (familia) => familia.id.toString() === id
    );
    if (!familiarToEdit) return;

    setEditFamiliar({
      isOpen: true,
      idToEdit: familiarToEdit[0],
    });
  };

  if (isLoading) <CustomLoading />;
  if (!data) return null;

  console.log(deleteFamiliar);
  return (
    <>
      {/* CABECERA DEL CENSO */}
      <Container
        css={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          my: "$8",
        }}
      >
        <Text h1>
          Perfil de,{" "}
          <span className="font-thin uppercase text-gray-400">
            {data?.nombres}.
          </span>
        </Text>

        <Container
          css={{ display: "flex", justifyContent: "center", gap: "$4" }}
        >
          <Button color={"error"} disabled onPress={() => handleDeleteJefe()}>
            Eliminar este censo
          </Button>

          <Button
            color={"warning"}
            onPress={() => setEditJefe({ isOpen: true })}
          >
            Editar jefe de familia
          </Button>
        </Container>
      </Container>

      {/* MAS INFORMACION DEL CENSO */}
      <Container
        css={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "stretch",

          my: "$8",
          //justifyContent: "center",
        }}
      >
        <Card
          css={{
            my: "$6",
            maxWidth: "580px",
            flexBasis: "1",
          }}
        >
          <Card.Header>
            <Text h2 css={{ fontSize: "$4xl", fontWeight: "$normal" }}>
              Información del Jefe de Familia.
            </Text>
          </Card.Header>
          <Card.Divider />
          <Card.Body>
            <div className="flex flex-col justify-center gap-y-2">
              <div>
                <span className="text-lg font-semibold">Nombre:</span>{" "}
                <span className="uppercase text-gray-950 dark:text-gray-300">
                  {data.nombres}.
                </span>
              </div>
              <div>
                <span className="text-lg font-semibold">Apellidos:</span>{" "}
                <span className="uppercase text-gray-950 dark:text-gray-300">
                  {data.apellidos}.
                </span>
              </div>
              <div>
                <span className="text-lg font-semibold">Edad:</span>{" "}
                <span className="uppercase text-gray-950 dark:text-gray-300">
                  {getRelativeTime(data.fechaNacimiento)}.
                </span>
              </div>
              <div>
                <span className="text-lg font-semibold">
                  Documento de identidad:
                </span>{" "}
                <span className="uppercase text-gray-950 dark:text-gray-300">
                  {data.tipoDocumento.toUpperCase()}-{data.numeroDocumento}.
                </span>
              </div>
              <div>
                <span className="text-lg font-semibold">Observacion:</span>{" "}
                <span className="uppercase text-gray-950 dark:text-gray-300">
                  {data.observacion || "Ninguna"}.
                </span>
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card
          css={{
            my: "$6",
            maxWidth: "580px",
            flexBasis: "1",
          }}
        >
          <Card.Header>
            <Text h2 css={{ fontSize: "$4xl", fontWeight: "$normal" }}>
              Datos de casa.
            </Text>
          </Card.Header>
          <Card.Divider />
          <Card.Body>
            <div className="flex flex-col justify-center gap-y-2">
              <div>
                <span className="text-lg font-semibold">Manzana N°: </span>{" "}
                <span className="uppercase text-gray-950 dark:text-gray-300">
                  {data.censo[0]?.casa.manzana}.
                </span>
              </div>
              <div>
                <span className="text-lg font-semibold">Calle: </span>
                <span className="uppercase text-gray-950 dark:text-gray-300">
                  {data.censo[0]?.casa.calle.toUpperCase()}.
                </span>
              </div>
              <div>
                <span className="text-lg font-semibold">Casa N°: </span>
                <span className="uppercase text-gray-950 dark:text-gray-300">
                  {data.censo[0]?.casa.casa}.
                </span>
              </div>
              <div>
                <span className="text-lg font-semibold">Direccion: </span>
                <span className="uppercase  text-gray-950 dark:text-gray-300">
                  {data.censo[0]?.casa.manzana}, calle{" "}
                  {data.censo[0]?.casa.calle}, casa {data.censo[0]?.casa.casa} .
                </span>
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card
          css={{
            my: "$6",
            maxWidth: "580px",
            flexBasis: "1",
          }}
        >
          <Card.Header>
            <Text h2 css={{ fontSize: "$4xl", fontWeight: "$normal" }}>
              Caja Clap.
            </Text>
          </Card.Header>
          <Card.Divider />
          <Card.Body>
            <div className="flex flex-col justify-center gap-y-2">
              <div>
                <span className="text-lg font-semibold">Cajas Asignadas: </span>{" "}
                <span className="uppercase text-gray-950 dark:text-gray-300">
                  {data.censo[0]?.cajasClapsPorRecibir}.
                </span>
              </div>
              <div>
                <span className="text-lg font-semibold">Carga Familiar: </span>{" "}
                <span className="uppercase text-gray-950 dark:text-gray-300">
                  {data.censo[0]?.cargaFamiliar}.
                </span>
              </div>
              <div>
                <span className="text-lg font-semibold">Tipo de Familia: </span>{" "}
                <span className="uppercase text-gray-950 dark:text-gray-300">
                  {data.censo[0]?.tipoFamilia}.
                </span>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Container>

      {/* TABLA DE FAMILIARES */}
      <Container>
        <Card>
          <Card.Header>
            <Text h2 css={{ fontSize: "$4xl", fontWeight: "$normal" }}>
              Familiares
            </Text>
          </Card.Header>
          <Card.Divider />
          <Card.Body css={{ paddingTop: "$4" }}>
            {data.familiar.length > 0 && (
              <Table headerLined lined bordered css={{ paddingTop: "$0" }}>
                <Table.Header>
                  <Table.Column css={{ textAlign: "center" }}>
                    Nombres
                  </Table.Column>
                  <Table.Column css={{ textAlign: "center" }}>
                    Apellidos
                  </Table.Column>
                  <Table.Column css={{ textAlign: "center" }}>
                    Edad
                  </Table.Column>
                  <Table.Column css={{ textAlign: "center" }}>
                    Genero
                  </Table.Column>
                  <Table.Column css={{ textAlign: "center" }}>
                    Parentesco
                  </Table.Column>
                  <Table.Column css={{ textAlign: "center" }}>
                    Observacion
                  </Table.Column>
                  <Table.Column css={{ textAlign: "center" }}>
                    Acciones
                  </Table.Column>
                </Table.Header>
                <Table.Body
                  loadingState={familiar.isLoading ? "loading" : "idle"}
                >
                  {data.familiar.map(
                    ({
                      apellidos,
                      nombres,
                      genero,
                      id,
                      fechaNacimiento,
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
                        <Table.Cell css={{ textAlign: "center" }}>
                          {getRelativeTime(fechaNacimiento)}
                        </Table.Cell>
                        <Table.Cell css={{ textAlign: "center" }}>
                          {genero.toLocaleLowerCase() === "m"
                            ? "Masculino"
                            : "Femenino"}
                        </Table.Cell>
                        <Table.Cell
                          css={{
                            textAlign: "center",
                            textTransform: "capitalize",
                          }}
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
                          <Button
                            size={"sm"}
                            className="bg-red-600 transition-all hover:bg-red-700"
                            onPress={() =>
                              setDeleteFamiliar({ isOpen: true, id })
                            }
                          >
                            {" "}
                            Eliminar
                          </Button>
                          <Button
                            size={"sm"}
                            className="bg-orange-600 transition-all hover:bg-orange-500"
                            onPress={() => {
                              handleEditFamiliar(id.toString());
                            }}
                          >
                            Actualizar
                          </Button>
                        </Table.Cell>
                      </Table.Row>
                    )
                  )}
                </Table.Body>
              </Table>
            )}
          </Card.Body>
        </Card>
      </Container>

      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={editFamiliar.isOpen}
        onClose={closeHandler}
        width="580px"
      >
        {editFamiliar.idToEdit && (
          <FamiliarForm
            familia={editFamiliar.idToEdit as Familiar}
            jefeId={data.id}
            closeModal={closeHandler}
          />
        )}
      </Modal>

      <Modal
        closeButton
        aria-labelledby="modal-title2"
        width="580px"
        open={editJefe.isOpen}
        onClose={() => {
          setEditJefe({ isOpen: false, idToEdit: data });
        }}
        autoMargin
      >
        <JefeEditForm jefe={data} onClose={closeHandler} />
      </Modal>

      <DeleteConfirmation
        onClose={() => setDeleteFamiliar({ isOpen: false })}
        open={deleteFamiliar.isOpen}
        onDelete={() => {
          if (deleteFamiliar.id) handleDelete(deleteFamiliar.id);
        }}
      />
    </>
  );
};

export default JefeProfile;
