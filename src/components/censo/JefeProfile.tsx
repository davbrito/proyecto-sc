import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import { type ROLE, type Familiar, type JefeFamilia } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "~/utils/api";
import { formatDate, getRelativeTime } from "~/utils/dates";
import DeleteConfirmation from "../DeleteConfirmation";
import { CustomLoading } from "../Loading";
import FamiliarForm from "../familiar/FamiliarForm";
import { ChangeJefeForm } from "./ChangeJefeForm";
import EditCajaForm from "./EditCajaForm";
import JefeEditForm from "./JefeEditForm";
import { ErrorMessage } from "../ErrorMessage";

interface Edit {
  data?: Familiar | JefeFamilia;
  isOpen: boolean;
}

interface Delete {
  id?: bigint;
  isOpen: boolean;
}

const JefeProfile = ({ id, role }: { id: string; role?: ROLE }) => {
  const router = useRouter();
  const consejoId = router.query?.id ? router.query.id.toString() : "";
  const { isOpen, onOpenChange, onOpen } = useDisclosure();

  const { data, isLoading, refetch, error } = api.jefe.getById.useQuery(
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

  if (!data || error)
    return (
      <div className="container mx-auto">
        <ErrorMessage
          title="Error al recuperar la informacion del jefe de familia."
          body="Revise su conexion de internet, e intente nuevamente."
        />
      </div>
    );

  return (
    <div className="container mx-auto">
      {/* CABECERA DEL CENSO */}
      <div className="my-8 flex flex-col justify-center  gap-4">
        <h1 className="text-center text-4xl">
          Perfil de,{" "}
          <span className="font-thin uppercase text-gray-400">
            {data?.nombres}.
          </span>
        </h1>

        {role !== "LIDER_CALLE" && (
          <div className="container flex items-center justify-center gap-4">
            <Button
              onPress={() => handleDeleteJefe()}
              className="bg-red-600 text-white  hover:bg-red-700 disabled:bg-red-300"
            >
              Eliminar este censo
            </Button>

            <Button
              onPress={() => setEditJefe({ isOpen: true })}
              className="bg-orange-600 text-white transition-colors hover:bg-orange-700  disabled:bg-orange-300"
            >
              Editar jefe de familia
            </Button>

            <Button
              className="bg-violet-600 text-center text-white hover:bg-violet-800 disabled:bg-violet-300"
              onPress={() => setChangeJefe(true)}
            >
              Cambiar jefe
            </Button>
          </div>
        )}
      </div>

      {/* Informacion JEFE FAMILIA */}
      <div className="container gap-2">
        <div className="flex flex-col  gap-3 md:flex-row">
          <div className="w-full  md:w-3/12 ">
            {/* Informacion General */}
            <Card>
              <CardBody className="justify-center  ">
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
                  <ul className="mx-0 rounded p-3 text-green-700 hover:text-green-600 ">
                    <li className="flex flex-col  sm:flex-row sm:items-center sm:justify-between">
                      <span>Desde</span>
                      <span className=" text-right font-medium">
                        {formatDate(data.censo?.fecha)}
                      </span>
                    </li>
                  </ul>
                </div>
              </CardBody>
            </Card>
            <div className="my-4"></div>

            <Card>
              <CardBody className="justify-center  ">
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
                <div className="grid gap-2 text-sm">
                  <div className="grid grid-cols-2  gap-6 px-3 py-2">
                    <div className=" font-semibold">Nro</div>
                    <div className="text-right uppercase">
                      {data.casa?.casa}
                    </div>
                  </div>
                  <div className="grid  grid-cols-2 gap-6 px-3 py-2">
                    <div className=" font-semibold">Manzana</div>
                    <div className="text-right uppercase">
                      {data.casa?.manzana}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6 px-3 py-2">
                    <div className=" font-semibold">Calle</div>
                    <div className="text-right capitalize">
                      {data.casa?.calle}
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          <div className="w-full  text-gray-600  md:w-9/12 ">
            <Card className="">
              <CardBody>
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

                <div className="grid  gap-2 text-sm md:grid-cols-2">
                  {/* className="grid grid-cols-2 gap-6" */}
                  <div className="grid grid-cols-2 gap-6 px-3 py-2">
                    <div className=" font-semibold">Nombres</div>
                    <div className="uppercase">{data.nombres}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-6 px-3 py-2">
                    <div className=" font-semibold">Apellidos</div>
                    <div className="uppercase">{data.apellidos}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-6 px-3 py-2">
                    <div className=" font-semibold">Genero</div>
                    <div className="">
                      {data.genero === "f" ? "Femenino" : "Masculino"}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6 px-3 py-2">
                    <div className=" font-semibold">Numero de contacto</div>
                    <div className="">{data.telefono}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 px-3 py-2">
                    <div className=" font-semibold">Correo Electronico</div>
                    <div className=" font-medium text-blue-700">
                      {data.email}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6 px-3 py-2">
                    <div className=" font-semibold">Fecha nacimiento</div>
                    <div className="">{formatDate(data.fechaNacimiento)}</div>
                  </div>
                </div>
              </CardBody>
            </Card>
            <div className="my-4"></div>
            <Card className="">
              <CardHeader>
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
                  <h2 className="text-2xl  font-normal text-gray-400">
                    Caja CLAP
                  </h2>
                </div>
                {role !== "LIDER_CALLE" && (
                  <button
                    onClick={() => {
                      setEditCaja(true);
                      onOpen();
                    }}
                    className="rounded-lg border-solid border-orange-800 bg-orange-600 p-2 text-sm text-white transition-all hover:bg-orange-800 disabled:bg-orange-800"
                  >
                    Editar
                  </button>
                )}
              </CardHeader>
              <CardBody>
                <div className="grid  gap-2 text-sm md:grid-cols-2">
                  {/* className="grid grid-cols-2 gap-6" */}
                  <div className="grid grid-cols-2 gap-6 px-3 py-2">
                    <div className=" font-semibold">Cajas asignadas</div>
                    <div className="uppercase">
                      {data.censo?.cajasClapsPorRecibir}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6 px-3 py-2">
                    <div className=" font-semibold">Carga familiar</div>
                    <div className="uppercase">{data.censo?.cargaFamiliar}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-6 px-3 py-2">
                    <div className=" font-semibold">Tipo familia</div>
                    <div className="">{data.censo?.tipoFamilia}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-6 px-3 py-2">
                    <div className=" font-semibold">Observacion</div>
                    <div className="">
                      {data.observacion ? data.observacion : "NINGUNA"}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6 px-3 py-2">
                    <div className=" font-semibold">Serial carnet</div>
                    <div className="">
                      {data.serialCarnetPatria
                        ? data.serialCarnetPatria
                        : "NO POSEE"}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6 px-3 py-2">
                    <div className=" font-semibold">Cod carnet</div>
                    <div className="">
                      {data.codCarnetPatria ? data.codCarnetPatria : "NO POSEE"}
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>

        <div className="my-4">
          <Card>
            <CardHeader className="justify-between">
              <h2 className="mx-auto text-center text-4xl font-normal">
                Familiares
              </h2>
              <button
                className="w-min rounded-lg border-solid border-green-600 bg-green-600 p-2  text-white transition-all hover:bg-green-700"
                onClick={() => {
                  setCreateFamiliar(true);
                }}
              >
                Añadir
              </button>
            </CardHeader>
            <CardBody>
              {data.familiar.length === 0 && (
                <div className="mx-auto min-h-[40vh] w-full place-content-center border border-gray-400 px-6 py-10">
                  <h2 className="text-center text-2xl font-light">
                    Aun no se han registrados familiares.
                  </h2>
                </div>
              )}

              {data.familiar.length > 0 && (
                <Table>
                  <TableHeader>
                    <TableColumn className="text-center">Nombres</TableColumn>
                    <TableColumn className="text-center">Apellidos</TableColumn>
                    <TableColumn className="text-center">Edad</TableColumn>
                    <TableColumn className="text-center">Genero</TableColumn>
                    <TableColumn className="text-center">
                      Parentesco
                    </TableColumn>
                    <TableColumn className="text-center">
                      Observacion
                    </TableColumn>
                    <TableColumn className="text-center">Acciones</TableColumn>
                  </TableHeader>
                  <TableBody
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
                        <TableRow key={id.toString()}>
                          <TableCell className="text-center">
                            {nombres.toUpperCase()}
                          </TableCell>
                          <TableCell className="text-center">
                            {apellidos.toUpperCase()}
                          </TableCell>
                          <TableCell className="text-center">
                            {getRelativeTime(fechaNacimiento)}
                          </TableCell>
                          <TableCell className="text-center">
                            {genero.toLocaleLowerCase() === "m"
                              ? "Masculino"
                              : "Femenino"}
                          </TableCell>
                          <TableCell className="text-center capitalize">
                            {parentesco}
                          </TableCell>
                          <TableCell className="text-center">
                            {observacion || "Ninguna"}
                          </TableCell>
                          <TableCell className="flex flex-col items-center gap-y-4 text-center">
                            {role === "LIDER_CALLE" ? (
                              <div></div>
                            ) : (
                              <>
                                <Button
                                  size={"sm"}
                                  className="bg-red-600 text-white transition-all hover:bg-red-800 disabled:bg-red-800"
                                  onPress={() =>
                                    setDeleteFamiliar({ isOpen: true, id })
                                  }
                                >
                                  Eliminar
                                </Button>
                                <Button
                                  size={"sm"}
                                  className="bg-orange-600 text-white transition-all hover:bg-orange-800"
                                  onPress={() => {
                                    handleEditFamiliar(id.toString());
                                  }}
                                >
                                  Actualizar
                                </Button>
                              </>
                            )}
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              )}
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Modales */}
      <Modal
        isOpen={isOpen}
        scrollBehavior="inside"
        onOpenChange={() => {
          setEditCaja(false);
          onOpenChange();
        }}
        closeButton
        aria-labelledby="edit-caja-form"
        size="xl"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader as={"h2"} className="mx-auto text-2xl">
                Numero de cajas
              </ModalHeader>
              <ModalBody>
                <EditCajaForm
                  censoId={data.censoId}
                  closeModal={() => {
                    setEditCaja(false);
                    refetch();
                  }}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        aria-labelledby="modal-create-familiar-form"
        size="2xl"
        isOpen={createFamiliar}
        scrollBehavior="inside"
        onOpenChange={() => {
          setCreateFamiliar(false);
        }}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader as={"h2"} className="mx-auto text-2xl">
                Datos del familiar
              </ModalHeader>
              <ModalBody>
                <FamiliarForm
                  consejoId={consejoId}
                  jefeId={BigInt(id)}
                  closeModal={() => {
                    setCreateFamiliar(false);
                    refetch();
                  }}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        aria-labelledby="modal-edit-familiar-form"
        isOpen={editFamiliar.isOpen}
        onClose={closeHandler}
        size="2xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          <ModalHeader as={"h2"} className="mx-auto text-2xl">
            Datos del familiar
          </ModalHeader>
          <ModalBody>
            {editFamiliar.data && (
              <FamiliarForm
                consejoId={consejoId}
                familia={editFamiliar.data as Familiar}
                jefeId={data.id}
                closeModal={closeHandler}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal
        scrollBehavior="inside"
        aria-labelledby="modal-edit-jefe-form"
        size="xl"
        isOpen={editJefe.isOpen}
        onClose={() => {
          setEditJefe({ isOpen: false });
        }}
      >
        <ModalContent>
          <ModalHeader as={"h2"} className="mx-auto text-2xl">
            Actualizar datos del jefe familia
          </ModalHeader>
          <ModalBody>
            <JefeEditForm jefe={data} onClose={closeHandler} />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal
        scrollBehavior="inside"
        aria-labelledby="modal-change-jefe-form"
        isOpen={changeJefe}
        onClose={() => setChangeJefe(false)}
        size="2xl"
      >
        <ModalContent>
          <ModalHeader>
            <h2 className="mx-auto text-center text-2xl font-light">
              Cambio de Jefe de familia
            </h2>
          </ModalHeader>
          <ModalBody>
            <ChangeJefeForm
              jefeId={parseInt(data.id.toString())}
              closeModal={() => {
                setChangeJefe(false);
                refetch();
              }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>

      <DeleteConfirmation
        onClose={() => setDeleteFamiliar({ isOpen: false })}
        open={deleteFamiliar.isOpen}
        onDelete={() => {
          if (deleteFamiliar.id) handleDelete(deleteFamiliar.id);
        }}
      />
    </div>
  );
};

export default JefeProfile;
