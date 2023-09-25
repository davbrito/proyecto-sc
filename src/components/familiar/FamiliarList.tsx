import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import Link from "next/link";
import { api } from "~/utils/api";
import { getRelativeTime } from "~/utils/dates";
import { CustomLoading } from "../Loading";
import { ErrorMessage } from "../ErrorMessage";

export const FamiliarList = () => {
  const { data, isLoading, error } = api.familia.getAll.useQuery();

  if (isLoading) return <CustomLoading className="place-content-center" />;

  if (!data || error)
    return (
      <div className="container mx-auto">
        <ErrorMessage
          title="Error al recuperar la informacion de los familiares registrados."
          body="Revise su conexion de internet, e intente nuevamente."
        />
      </div>
    );

  if (data.length === 0)
    return (
      <div className="mx-auto min-h-[40vh] w-full place-content-center rounded-3xl border border-gray-400 px-6 py-10">
        <h2 className="text-center text-2xl font-light">
          Aun no se han registrados familiares.
        </h2>
      </div>
    );

  return (
    <div>
      <Table>
        <TableHeader>
          <TableColumn align="center">Jefe de Familia</TableColumn>
          <TableColumn align="center">Apellidos</TableColumn>
          <TableColumn align="center">Nombres</TableColumn>
          <TableColumn align="center">Edad</TableColumn>
          <TableColumn align="center">Genero</TableColumn>
          <TableColumn align="center">Observacion</TableColumn>
          <TableColumn align="center">Documento de identidad</TableColumn>
        </TableHeader>
        <TableBody>
          {data.map(
            ({
              id,
              nombres,
              numeroDocumento,
              apellidos,
              observacion,
              tipoDocumento,
              jefeFamilia,
              genero,
              fechaNacimiento,
            }) => (
              <TableRow key={id.toString()}>
                <TableCell className="text-center">
                  <Link
                    href={`/censo/${jefeFamilia.id.toString()}`}
                    className="transition-all hover:text-blue-800  "
                  >
                    {jefeFamilia.tipoDocumento.toUpperCase()}-
                    {jefeFamilia.numeroDocumento}
                  </Link>
                </TableCell>
                <TableCell className="text-center">
                  {apellidos.toUpperCase()}
                </TableCell>
                <TableCell className="text-center">
                  {nombres.toUpperCase()}
                </TableCell>
                <TableCell className="text-center">
                  {getRelativeTime(fechaNacimiento)}
                </TableCell>
                <TableCell className="text-center">
                  {genero.toUpperCase() === "F" ? "Femenino" : "Masculino"}
                </TableCell>
                <TableCell className="text-center capitalize">
                  {observacion || "No tiene"}.
                </TableCell>
                <TableCell className="text-center">
                  {numeroDocumento
                    ? `${tipoDocumento.toUpperCase()}-${numeroDocumento}`
                    : "NO POSEE"}
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
};
