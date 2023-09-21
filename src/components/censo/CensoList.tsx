import {
  Table,
  Button,
  Modal,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  ModalBody,
} from "@nextui-org/react";
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

export const CensoList = ({
  search,
  consejoId,
}: {
  search?: string;
  consejoId: string;
}) => {
  const { data, isLoading } = api.censo.getCensoInfor.useQuery(
    {
      keyword: search,
      consejoId,
    },
    { retry: false }
  );
  const [openModal, setOpenModal] = useState<stateFamiliarModal>({
    isOpen: false,
  });

  const closeHandler = () => setOpenModal({ isOpen: false });

  if (isLoading)
    return <CustomLoading className="h-[30vh] place-content-center" />;

  if (!data) return null;

  if (data.length === 0)
    return (
      <div className="mx-auto min-h-[40vh] w-full place-content-center rounded-3xl border border-gray-400 px-6 py-10">
        <h2 className="text-center text-2xl font-light">
          {search
            ? `No hay resultados para la busqueda del censo: '${search}'`
            : "Aun no se han registrados censos."}
        </h2>
      </div>
    );

  if (!data) return <div>Error</div>;
  return (
    <>
      <Table>
        <TableHeader>
          <TableColumn align="center">Codigo</TableColumn>
          <TableColumn align="center">Manzana</TableColumn>
          <TableColumn align="center">Casa</TableColumn>
          <TableColumn align="center">Nombres</TableColumn>
          <TableColumn align="center">Documento</TableColumn>
          <TableColumn align="center">Fecha Nacimiento</TableColumn>
          <TableColumn align="center">Edad</TableColumn>
          <TableColumn align="center">Familia</TableColumn>
          <TableColumn align="center">Genero</TableColumn>
          <TableColumn align="center">Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          {data.map(({ jefeFamilia, id, tipoFamilia }) => (
            <TableRow key={id}>
              <TableCell className="text-center text-sm">
                <Link
                  href={
                    !jefeFamilia
                      ? ""
                      : `/consejo-comunal/${consejoId}/censo/${String(
                          jefeFamilia.id
                        )}`
                  }
                  className="transition-all hover:text-blue-800"
                >
                  {id.padStart(8, "0")}
                </Link>
              </TableCell>
              <TableCell className="text-center text-sm">
                {jefeFamilia?.casa ? jefeFamilia.casa.manzana : ""}
              </TableCell>
              <TableCell className="text-center text-sm">
                {jefeFamilia?.casa
                  ? jefeFamilia.casa.casa.padStart(2, "0")
                  : ""}
              </TableCell>
              <TableCell className="text-center text-sm">
                {jefeFamilia?.apellidos.toUpperCase()},{" "}
                {jefeFamilia?.nombres.toUpperCase()}.
              </TableCell>
              <TableCell className="text-center text-sm">
                {jefeFamilia?.tipoDocumento.toUpperCase()}-
                {jefeFamilia?.numeroDocumento}
              </TableCell>
              <TableCell className="text-center text-sm">
                {formatDate(jefeFamilia?.fechaNacimiento as Date)}
              </TableCell>
              <TableCell className="text-center text-sm">
                {getRelativeTime(jefeFamilia?.fechaNacimiento as Date)}
              </TableCell>
              <TableCell className="text-center text-sm">
                {tipoFamilia.toUpperCase()}
              </TableCell>
              <TableCell className="text-center text-sm">
                {jefeFamilia?.genero.toUpperCase() === "F"
                  ? "Femenino"
                  : "Masculino"}
              </TableCell>
              <TableCell>
                <Button
                  className="mx-auto bg-blue-700 transition-all hover:bg-blue-900"
                  size="sm"
                  onPress={() => {
                    const id = jefeFamilia?.id;
                    if (!id) return;
                    setOpenModal({ isOpen: true, id });
                  }}
                >
                  Agregar pariente.
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal
        closeButton
        aria-labelledby="modal-title2"
        size="3xl"
        isOpen={openModal.isOpen}
        onClose={closeHandler}
      >
        {!!openModal.id && (
          <ModalBody>
            <FamiliarForm
              consejoId={consejoId}
              jefeId={openModal.id}
              closeModal={closeHandler}
            />
          </ModalBody>
        )}
      </Modal>
    </>
  );
};
