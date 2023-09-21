import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import Link from "next/link";
import { api } from "~/utils/api";
import { CustomLoading } from "../Loading";

export const ConsejosList = () => {
  const { data, isLoading } = api.consejo.getAll.useQuery();

  if (isLoading) return <CustomLoading />;

  if (!data) return null;

  if (data.length === 0)
    return (
      <p className="rounded-medium border border-foreground px-6 py-10 text-center text-2xl font-light">
        Aun no se han registrados censos.
      </p>
    );

  return (
    <>
      <Table>
        <TableHeader>
          <TableColumn align="center">Consejo</TableColumn>
          <TableColumn align="center">CLAP</TableColumn>
          <TableColumn align="center">Circuito</TableColumn>
          <TableColumn align="center">Comunidad</TableColumn>
          <TableColumn align="center">Sector</TableColumn>
          <TableColumn align="center">Acciones</TableColumn>
        </TableHeader>
        <TableBody className="uppercase">
          {data.map(
            ({
              circuito,
              comunidad,
              nombre_consejo,
              nombre_clap,
              sector,
              id,
            }) => (
              <TableRow key={id}>
                <TableCell className="text-center text-sm">
                  <Link href={`/consejo-comunal/${id}`}>{nombre_consejo}</Link>
                </TableCell>
                <TableCell className="text-center text-sm">
                  {nombre_clap}
                </TableCell>
                <TableCell className="text-center text-sm">
                  {circuito}
                </TableCell>
                <TableCell className="text-center text-sm">
                  {comunidad}
                </TableCell>
                <TableCell className="text-center text-sm">{sector}</TableCell>
                <TableCell className="text-center text-sm">
                  <Button>Hacer</Button>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
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
