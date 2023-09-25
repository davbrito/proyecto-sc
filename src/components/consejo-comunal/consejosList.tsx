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
import { ErrorMessage } from "../ErrorMessage";

export const ConsejosList = () => {
  const { data, isLoading,error } = api.consejo.getAll.useQuery();

  if (isLoading) return <CustomLoading />;

  if (!data || error)
    return (
      <div className="container mx-auto">
        <ErrorMessage
          title="Error al recuperar la informacion de los consejos comunales."
          body="Revise su conexion de internet, e intente nuevamente."
        />
      </div>
    );

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
          <TableColumn align="center" className="text-center">
            Consejo
          </TableColumn>
          <TableColumn align="center" className="text-center">
            CLAP
          </TableColumn>
          <TableColumn align="center" className="text-center">
            Circuito
          </TableColumn>
          <TableColumn align="center" className="text-center">
            Comunidad
          </TableColumn>
          <TableColumn align="center" className="text-center">
            Sector
          </TableColumn>
          <TableColumn align="center" className="text-center">
            Acciones
          </TableColumn>
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
                <TableCell className="text-center text-sm uppercase">
                  {nombre_consejo}
                </TableCell>
                <TableCell className="text-center text-sm uppercase">
                  {nombre_clap}
                </TableCell>
                <TableCell className="text-center text-sm uppercase">
                  {circuito}
                </TableCell>
                <TableCell className="text-center text-sm uppercase">
                  {comunidad}
                </TableCell>
                <TableCell className="text-center text-sm uppercase">
                  {sector}
                </TableCell>
                <TableCell className="text-center text-sm">
                  <Button
                    as={Link}
                    color="primary"
                    className="transition-colors hover:bg-blue-700"
                    href={`/consejo-comunal/${id}`}
                  >
                    Ver informacion
                  </Button>
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
