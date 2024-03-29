import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";
import { api } from "~/utils/api";
import { CustomLoading } from "../Loading";
import { formatDate } from "~/utils/dates";

export const EntregaList = ({
  consejoComunalId,
}: {
  consejoComunalId: number;
}) => {
  const { data, isLoading } = api.entrega.getAll.useQuery({ consejoComunalId });

  if (isLoading) return <CustomLoading />;
  if (!data) return null;
  return (
    <Table isStriped>
      <TableHeader>
        <TableColumn className="text-center">Fecha de entrega</TableColumn>
        <TableColumn className="text-center">Familias Beneficiadas</TableColumn>
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
            <TableCell className="text-center">{beneficiados.length}</TableCell>
            <TableCell className="text-center">
              {beneficiados.reduce((prev, current) => {
                return current.cajasAsignadas + prev;
              }, 0)}
            </TableCell>
            <TableCell className="text-center">
              <Link
                href={`/consejo-comunal/${consejoComunalId}/entrega/${id}`}
                className="inline-block cursor-pointer rounded-md   bg-blue-600 px-3 py-2 text-white transition-all hover:bg-blue-900"
              >
                Ver
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
