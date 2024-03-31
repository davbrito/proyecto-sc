import {
  Button,
  Link,
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
import { formatDate } from "~/utils/dates";
import { useSession } from "next-auth/react";
import DeleteConfirmation from "../DeleteConfirmation";

export const EntregaList = ({
  consejoComunalId,
}: {
  consejoComunalId: number;
}) => {
  const { data: session } = useSession();
  const { data, isLoading, refetch } = api.entrega.getAll.useQuery({
    consejoComunalId,
  });
  const deleteEntrega = api.entrega.deleteById.useMutation();
  const [openDelete, setOpenDelete] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    await deleteEntrega.mutateAsync(
      { entrega: id },
      {
        onSuccess(data, variables, context) {
          refetch();
        },
      }
    );
  };

  if (isLoading) return <CustomLoading />;
  if (!data) return null;
  return (
    <>
      <Table isStriped>
        <TableHeader>
          <TableColumn className="text-center">Fecha de entrega</TableColumn>
          <TableColumn className="text-center">
            Familias Beneficiadas
          </TableColumn>
          <TableColumn className="text-center">Cajas entregadas</TableColumn>
          <TableColumn className="text-center">Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          {data.map(({ id, fechaEntrega, beneficiados }) => (
            <TableRow key={id}>
              <TableCell className="text-center">
                {fechaEntrega.toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell className="text-center">
                {beneficiados.length}
              </TableCell>
              <TableCell className="text-center">
                {beneficiados.reduce((prev, current) => {
                  return current.cajasAsignadas + prev;
                }, 0)}
              </TableCell>
              <TableCell className="flex justify-center gap-3 text-center">
                <Link
                  href={`/consejo-comunal/${consejoComunalId}/entrega/${id}`}
                  className="inline-block cursor-pointer rounded-md   bg-blue-600 px-3 py-2 text-white transition-all hover:bg-blue-900"
                >
                  Ver
                </Link>
                {session?.user?.role_user === "ADMIN" && (
                  <Button
                    onPress={() => setOpenDelete(id)}
                    className="rounded-md bg-red-600 px-3 py-2 text-white transition-all hover:bg-red-900"
                  >
                    Eliminar
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DeleteConfirmation
        onClose={() => setOpenDelete(null)}
        open={!!openDelete}
        onDelete={() => {
          if (typeof openDelete === "number") handleDelete(openDelete);
        }}
      />
    </>
  );
};
