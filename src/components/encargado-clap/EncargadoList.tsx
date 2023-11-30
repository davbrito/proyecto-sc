import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useState } from "react";
import { api } from "~/utils/api";
import DeleteConfirmation from "../DeleteConfirmation";
import { EncargadoForm } from "./EncargadoForm";

interface Props {
  consejoId: number;
  data: {
    id: number;
    cargo: string;
    nombres: string;
    apellidos: string;
    cedula: string;
    telefono: string;
    profesion: string;
    email: string;
    fechaRegistro: Date;
    consejoComunalId: number;
  }[];
  refreshData: () => void;
  isLoading: boolean;
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
  encargadoId?: number;
}
export const EncargadoList = ({
  consejoId,
  data,
  refreshData,
  isLoading,
}: Props) => {
  const deleteEncargado = api.encargados.delete.useMutation();

  const [editEncargado, setEditEncargado] = useState<EditEncargado>({
    isOpen: false,
  });

  const [deleteEncargadoModal, setDeleteEncargadoModal] =
    useState<DeleteEncargado>();

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
        <TableBody
          loadingContent={<Spinner />}
          loadingState={isLoading ? "loading" : "idle"}
        >
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
          refreshData();
        }}
        placement="center"
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
                    refreshData();
                    close();
                  }}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      <DeleteConfirmation
        onClose={() => {
          setDeleteEncargadoModal({});
          refreshData();
          console.log("eliminar refrehs");
        }}
        open={!!deleteEncargadoModal?.encargadoId}
        onDelete={() => {
          deleteEncargadoModal?.encargadoId &&
            deleteEncargado.mutate(
              { id: deleteEncargadoModal.encargadoId },
              {
                onSuccess(data, variables, context) {
                  refreshData();
                },
              }
            );
        }}
      />
    </>
  );
};
