import {
  Button,
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
} from "@nextui-org/react";
import React, { useState } from "react";
import { api } from "~/utils/api";
import { CustomLoading } from "../Loading";
import { ErrorMessage } from "../ErrorMessage";
import { EncargadoForm } from "./EncargadoForm";
import DeleteConfirmation from "../DeleteConfirmation";

interface Props {
  consejoId: number;
}

interface EditEncargado {
  isOpen: boolean;
  encargado?: {
    apellidos: string;
    cargo: string;
    cedula: string;
    id: number;
    email: string;
    profesion: string;
    telefono: string;
    nombres: string;
  };
}

interface DeleteEncargado {
  isOpen: boolean;
  encargadoId?: number;
}
export const EncargadoList = ({ consejoId }: Props) => {
  const { data, isLoading, refetch } = api.encargados.getByConsejoId.useQuery({
    id: consejoId,
  });

  const deleteEncargado = api.encargados.delete.useMutation();

  const [editEncargado, setEditEncargado] = useState<EditEncargado>({
    isOpen: false,
  });
  const [deleteEncargadoModal, setDeleteEncargadoModal] =
    useState<DeleteEncargado>({
      isOpen: false,
    });

  if (isLoading)
    return <CustomLoading className="min-h-[30vh] place-content-center" />;
  if (!data)
    return (
      <div className="flex min-h-[40vh] place-content-center">
        <ErrorMessage
          title="Error al recuperar la informacion del consejo comunal."
          body="Revise su conexion de internet, e intente nuevamente."
        />
      </div>
    );
  if (data.length === 0)
    return (
      <div className=" flex h-[20vh] items-center justify-center rounded-md border">
        <h2 className="text-2xl">No tiene personal registrado.</h2>
      </div>
    );
  return (
    <>
      <Table>
        <TableHeader className="text-center">
          <TableColumn>Estructura</TableColumn>
          <TableColumn>Nombres y Apellidos</TableColumn>
          <TableColumn>Cedula</TableColumn>
          <TableColumn>Telefono</TableColumn>
          <TableColumn>Profesion</TableColumn>
          <TableColumn>Correo Electronico</TableColumn>
          <TableColumn>Direccion</TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          {data.map(
            ({
              apellidos,
              cargo,
              cedula,
              id,
              email,
              profesion,
              telefono,
              nombres,
            }) => (
              <TableRow key={id} className="border-b-2 uppercase">
                <TableCell>{cargo}</TableCell>
                <TableCell>{nombres + " " + apellidos}</TableCell>
                <TableCell>{cedula}</TableCell>
                <TableCell>{telefono}</TableCell>
                <TableCell>{profesion}</TableCell>
                <TableCell>{email}</TableCell>
                <TableCell>C. KAVANAYEN, MZNA 13, # 9</TableCell>
                <TableCell className="flex place-content-center gap-2">
                  <Button
                    className="bg-orange-600 text-white hover:bg-orange-800"
                    onPress={() =>
                      setEditEncargado({
                        isOpen: true,
                        encargado: {
                          apellidos,
                          cargo,
                          cedula,
                          id,
                          email,
                          profesion,
                          telefono,
                          nombres,
                        },
                      })
                    }
                  >
                    Editar
                  </Button>
                  <Button
                    className="bg-red-600 text-white hover:bg-red-800"
                    onPress={() => {
                      setDeleteEncargadoModal({
                        isOpen: true,
                        encargadoId: id,
                      });
                    }}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
      <Modal
        aria-label="edit-encargado-form"
        isOpen={editEncargado.isOpen}
        size="2xl"
        scrollBehavior="inside"
        onClose={() => {
          setEditEncargado({
            isOpen: false,
          });
        }}
      >
        <ModalContent>
          {(close) => (
            <>
              <ModalHeader>
                <h2 className="mx-auto text-2xl">
                  Actualizacion del encargado
                </h2>
              </ModalHeader>
              <ModalBody>
                <EncargadoForm
                  consejoId={consejoId}
                  oldData={editEncargado.encargado}
                  closeModal={() => {
                    refetch();
                    close();
                  }}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      <DeleteConfirmation
        onClose={() => setDeleteEncargadoModal({ isOpen: false })}
        open={deleteEncargadoModal.isOpen}
        onDelete={() => {
          deleteEncargadoModal?.encargadoId &&
            deleteEncargado.mutate({ id: deleteEncargadoModal.encargadoId });
          refetch();
        }}
      />
    </>
  );
};
