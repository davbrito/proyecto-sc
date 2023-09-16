import {
  Button,
  Card,
  Container,
  Modal,
  Table,
  Text,
  Grid,
} from "@nextui-org/react";
import React, { useState } from "react";
import { api } from "~/utils/api";
import { CustomLoading } from "../Loading";
import { formatDate, getRelativeTime } from "~/utils/dates";
import FamiliarForm from "../familiar/FamiliarForm";
import { type JefeFamilia, type Familiar } from "@prisma/client";
import JefeEditForm from "./JefeEditForm";
import DeleteConfirmation from "../DeleteConfirmation";
import { useRouter } from "next/router";
import EditCajaForm from "./EditCajaForm";
import { ChangeJefeForm } from "./ChangeJefeForm";

interface Edit {
  data?: Familiar | JefeFamilia;
  isOpen: boolean;
}

interface Delete {
  id?: bigint;
  isOpen: boolean;
}

const JefeProfile = ({ id }: { id: "string" }) => {
  const router = useRouter();
  const consejoId = router.query?.id ? router.query.id.toString() : "";

  const { data, isLoading, refetch } = api.jefe.getById.useQuery(
    {
      id,
    },
    { refetchOnWindowFocus: false }
  );
  const familiar = api.familia.deleteById.useMutation();
  const jefe = api.jefe.delete.useMutation();

  // Estados
  const [editJefe, setEditJefe] = useState<Edit>({
    isOpen: false,
  });
  const [editFamiliar, setEditFamiliar] = useState<Edit>({
    isOpen: false,
  });
  const [deleteFamiliar, setDeleteFamiliar] = useState<Delete>({
    isOpen: false,
  });

  const [changeJefe, setChangeJefe] = useState(false);
  const [editCaja, setEditCaja] = useState(false);
  const [createFamiliar, setCreateFamiliar] = useState(false);

  const closeHandler = () => {
    setEditFamiliar({ isOpen: false });
    setEditJefe({ isOpen: false });

    refetch();
  };

  const handleDeleteJefe = async () => {
    if (!data || !data.censo || !data.censo) return;

    jefe.mutate(
      {
        id: data.id,
        censoId: data.censo.id,
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
      familiar.mutate(
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

  const handleEditFamiliar = (id: string) => {
    const familiarToEdit = data?.familiar.filter(
      (familia) => familia.id.toString() === id
    );
    if (!familiarToEdit) return;

    setEditFamiliar({
      isOpen: true,
      data: familiarToEdit[0],
    });
  };

  if (isLoading) <CustomLoading />;
  if (!data) return null;

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

          <Button
            className="bg-violet-600 hover:bg-violet-800"
            onPress={() => setChangeJefe(true)}
          >
            Cambiar jefe
          </Button>
        </Container>
      </Container>

      {/* Informacion JEFE FAMILIA */}
      <Container gap={2} fluid>
        <div className="flex flex-col  gap-3 md:flex-row">
          <div className="w-full  md:w-3/12 ">
            {/* Informacion General */}
            <Card>
              <Card.Body className="justify-center  ">
                <div className="flex flex-col px-3">
                  <h1 className="my-1 text-2xl font-light uppercase ">
                    {data.nombres.split(",")[0]} {data.apellidos.split(",")[0]}
                  </h1>
                  <h3 className=" text-sm   text-gray-600">
                    {getRelativeTime(data.fechaNacimiento)}
                  </h3>
                  <h3 className="font-medium  uppercase   text-gray-600">
                    {data.tipoDocumento}-{data.numeroDocumento}
                  </h3>
                  <Container
                    as={"ul"}
                    fluid
                    className="mx-0  rounded  p-3  text-green-700 
                    hover:text-green-600 "
                  >
                    <li className="flex flex-col  sm:flex-row sm:items-center sm:justify-between">
                      <span>Desde</span>
                      <span className=" text-right font-medium">
                        {formatDate(data.censo?.fecha)}
                      </span>
                    </li>
                  </Container>
                </div>
              </Card.Body>
            </Card>
            <div className="my-4"></div>

            <Card>
              <Card.Body className="justify-center  ">
                <div className="flex items-center justify-center  space-x-2 px-2 leading-8">
                  <span className="text-gray-500">
                    <svg
                      className="h-8 w-8"
                      xmlns="http://www.w3.org/2000/svg"
                      height="auto"
                      viewBox="0 0 576 512"
                      fill="rgb(107 114 128)"
                    >
                      <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c.2 35.5-28.5 64.3-64 64.3H128.1c-35.3 0-64-28.7-64-64V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24zM352 224a64 64 0 1 0 -128 0 64 64 0 1 0 128 0zm-96 96c-44.2 0-80 35.8-80 80c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16c0-44.2-35.8-80-80-80H256z" />
                    </svg>
                  </span>
                  <h2 className="text-2xl  font-normal  text-gray-400">Casa</h2>
                </div>
                <Grid.Container gap={2} className="grid  text-sm ">
                  <Grid.Container className="grid grid-cols-2  gap-6 px-3 py-2">
                    <div className=" font-semibold">Nro</div>
                    <div className="text-right uppercase">
                      {data.casa?.casa}
                    </div>
                  </Grid.Container>
                  <Grid.Container className="grid  grid-cols-2 gap-6 px-3 py-2">
                    <div className=" font-semibold">Manzana</div>
                    <div className="text-right uppercase">
                      {data.casa?.manzana}
                    </div>
                  </Grid.Container>
                  <Grid.Container className="grid grid-cols-2 gap-6 px-3 py-2">
                    <div className=" font-semibold">Calle</div>
                    <div className="text-right capitalize">
                      {data.casa?.calle}
                    </div>
                  </Grid.Container>
                </Grid.Container>
              </Card.Body>
            </Card>
          </div>

          <div className="w-full  text-gray-600  md:w-9/12 ">
            <Card className="">
              <Card.Body>
                <div className="flex items-center justify-center  space-x-2 px-2 font-semibold leading-8">
                  <span className="text-gray-500">
                    <svg
                      className="h-8 w-8"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </span>
                  <h2 className="text-2xl  font-normal text-gray-400">
                    Informacion
                  </h2>
                </div>

                <Grid.Container
                  gap={2}
                  className="grid  text-sm md:grid-cols-2"
                >
                  {/* className="grid grid-cols-2 gap-6" */}
                  <Grid.Container className="grid grid-cols-2 gap-6 px-3 py-2">
                    <div className=" font-semibold">Nombres</div>
                    <div className="uppercase">{data.nombres}</div>
                  </Grid.Container>
                  <Grid.Container className="grid grid-cols-2 gap-6 px-3 py-2">
                    <div className=" font-semibold">Apellidos</div>
                    <div className="uppercase">{data.apellidos}</div>
                  </Grid.Container>
                  <Grid.Container className="grid grid-cols-2 gap-6 px-3 py-2">
                    <div className=" font-semibold">Genero</div>
                    <div className="">
                      {data.genero === "f" ? "Femenino" : "Masculino"}
                    </div>
                  </Grid.Container>
                  <Grid.Container className="grid grid-cols-2 gap-6 px-3 py-2">
                    <div className=" font-semibold">Numero de contacto</div>
                    <div className="">{data.telefono}</div>
                  </Grid.Container>

                  <Grid.Container className="grid grid-cols-2 gap-6 px-3 py-2">
                    <div className=" font-semibold">Correo Electronico</div>
                    <div className=" font-medium text-blue-700">
                      {data.email}
                    </div>
                  </Grid.Container>
                  <Grid.Container className="grid grid-cols-2 gap-6 px-3 py-2">
                    <div className=" font-semibold">Fecha nacimiento</div>
                    <div className="">{formatDate(data.fechaNacimiento)}</div>
                  </Grid.Container>
                </Grid.Container>
              </Card.Body>
            </Card>
            <div className="my-4"></div>
            <Card className="">
              <Card.Header>
                <div className="mx-auto flex items-center justify-center  space-x-2 px-2 font-semibold leading-8">
                  <span className="text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className="h-8 w-8"
                      stroke="currentColor"
                      fill="rgb(107 114 128)"
                    >
                      <path d="M50.7 58.5L0 160H208V32H93.7C75.5 32 58.9 42.3 50.7 58.5zM240 160H448L397.3 58.5C389.1 42.3 372.5 32 354.3 32H240V160zm208 32H0V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192z" />
                    </svg>
                  </span>
                  <Text h2 className="text-2xl  font-normal text-gray-400">
                    Caja CLAP
                  </Text>
                </div>
                <button
                  onClick={() => setEditCaja(true)}
                  className="rounded-lg border-solid border-orange-800 bg-orange-700 p-2 text-sm transition-all hover:bg-orange-800"
                >
                  Editar
                </button>
              </Card.Header>
              <Card.Body>
                <Grid.Container
                  gap={2}
                  className="grid  text-sm md:grid-cols-2"
                >
                  {/* className="grid grid-cols-2 gap-6" */}
                  <Grid.Container className="grid grid-cols-2 gap-6 px-3 py-2">
                    <div className=" font-semibold">Cajas asignadas</div>
                    <div className="uppercase">
                      {data.censo?.cajasClapsPorRecibir}
                    </div>
                  </Grid.Container>
                  <Grid.Container className="grid grid-cols-2 gap-6 px-3 py-2">
                    <div className=" font-semibold">Carga familiar</div>
                    <div className="uppercase">{data.censo?.cargaFamiliar}</div>
                  </Grid.Container>
                  <Grid.Container className="grid grid-cols-2 gap-6 px-3 py-2">
                    <div className=" font-semibold">Tipo familia</div>
                    <div className="">{data.censo?.tipoFamilia}</div>
                  </Grid.Container>
                  <Grid.Container className="grid grid-cols-2 gap-6 px-3 py-2">
                    <div className=" font-semibold">Observacion</div>
                    <div className="">
                      {data.observacion ? data.observacion : "NINGUNA"}
                    </div>
                  </Grid.Container>
                  <Grid.Container className="grid grid-cols-2 gap-6 px-3 py-2">
                    <div className=" font-semibold">Serial carnet</div>
                    <div className="">
                      {data.serialCarnetPatria
                        ? data.serialCarnetPatria
                        : "NO POSEE"}
                    </div>
                  </Grid.Container>
                  <Grid.Container className="grid grid-cols-2 gap-6 px-3 py-2">
                    <div className=" font-semibold">Cod carnet</div>
                    <div className="">
                      {data.codCarnetPatria ? data.codCarnetPatria : "NO POSEE"}
                    </div>
                  </Grid.Container>
                </Grid.Container>
              </Card.Body>
            </Card>
          </div>
        </div>

        <div className="my-4">
          <Card>
            <Card.Header className="justify-between">
              <Text
                h2
                css={{
                  fontSize: "$4xl",
                  fontWeight: "$normal",
                  textAlign: "center",
                  mx: "auto",
                }}
              >
                Familiares
              </Text>
              <button
                className="w-min rounded-lg border-solid border-green-600 bg-green-600  p-2 transition-all hover:bg-green-700"
                onClick={() => setCreateFamiliar(true)}
              >
                Añadir
              </button>
            </Card.Header>
            <Card.Body>
              {data.familiar.length === 0 && (
                <Grid.Container
                  css={{
                    border: "1px solid $gray400",
                    borderRadius: "$3xl",
                    padding: "$10 $6",
                  }}
                  className="mx-auto min-h-[40vh] w-full place-content-center"
                >
                  <Text
                    h2
                    className="text-2xl font-light"
                    css={{ textAlign: "center" }}
                  >
                    Aun no se han registrados familiares.
                  </Text>
                </Grid.Container>
              )}

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
                              className="bg-red-700 transition-all hover:bg-red-800"
                              onPress={() =>
                                setDeleteFamiliar({ isOpen: true, id })
                              }
                            >
                              {" "}
                              Eliminar
                            </Button>
                            <Button
                              size={"sm"}
                              className="bg-orange-700 transition-all hover:bg-orange-800"
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
        </div>
      </Container>

      {/* Modales */}
      <Modal
        closeButton
        aria-labelledby="modal-create-familiar-form"
        open={editCaja}
        onClose={() => setEditCaja(false)}
        width="350px"
        autoMargin
      >
        <Modal.Body>
          <EditCajaForm
            censoId={data.censoId}
            closeModal={() => {
              setEditCaja(false);
              refetch();
            }}
          />
        </Modal.Body>
      </Modal>

      <Modal
        closeButton
        aria-labelledby="modal-create-familiar-form"
        open={createFamiliar}
        onClose={() => setCreateFamiliar(false)}
        width="700px"
        autoMargin
      >
        <Modal.Body>
          <FamiliarForm
            consejoId={consejoId}
            jefeId={BigInt(id)}
            closeModal={() => {
              setCreateFamiliar(false);
              refetch();
            }}
          />
        </Modal.Body>
      </Modal>

      <Modal
        closeButton
        aria-labelledby="modal-edit-familiar-form"
        open={editFamiliar.isOpen}
        onClose={closeHandler}
        width="700px"
        autoMargin
      >
        <Modal.Body>
          {editFamiliar.data && (
            <FamiliarForm
              consejoId={consejoId}
              familia={editFamiliar.data as Familiar}
              jefeId={data.id}
              closeModal={closeHandler}
            />
          )}
        </Modal.Body>
      </Modal>
      <Modal
        aria-labelledby="modal-title2"
        width="580px"
        open={editJefe.isOpen}
        onClose={() => {
          setEditJefe({ isOpen: false });
        }}
        autoMargin
        css={{ pt: "0" }}
      >
        <JefeEditForm jefe={data} onClose={closeHandler} />
      </Modal>

      <Modal
        closeButton
        aria-labelledby="modal-change-jefe-form"
        open={changeJefe}
        onClose={() => setChangeJefe(false)}
        width="700px"
        autoMargin
      >
        <Modal.Body>
          <ChangeJefeForm
            jefeId={parseInt(data.id.toString())}
            closeModal={() => {
              setChangeJefe(false);
              refetch();
            }}
          />
        </Modal.Body>
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
