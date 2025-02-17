import {
  Button,
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
import Link from "next/link";

export const CasaList = () => {
  const { data, isLoading, refetch } = api.casa.getAllCasas.useQuery();
  const deleteCasa = api.casa.deleteCasaById.useMutation();
  
  const deleteById = (id: bigint) => {
    try {
      deleteCasa.mutate(
        { casaId: id },
        {
          onSuccess(data, variables, context) {
            refetch();
            console.log(data);
          },
          onError(error, variables, context) {
            console.log(error);
          },
        }
      );
    } catch (error) {}
  };

  if (isLoading) return <CustomLoading className="place-content-center" />;

  if (!data) return <h1>Error</h1>;
  return (
    <>
      {data.length === 0 && (
        <div className="mx-auto min-h-[40vh] w-full place-content-center rounded-3xl border border-solid border-gray-400 px-6 py-10">
          <h2 className="text-center text-2xl font-light">
            Aun no se han registrados alguna casa.
          </h2>
        </div>
      )}
      {data.length > 0 && (
        <Table className="mt-2 h-auto min-w-full text-center">
          <TableHeader>
            <TableColumn
              align="center"
              className="text-center text-xl font-semibold"
            >
              N° Manzana
            </TableColumn>
            <TableColumn
              align="center"
              className="text-center text-xl font-semibold"
            >
              N° Calle
            </TableColumn>
            <TableColumn
              align="center"
              className="text-center text-xl font-semibold"
            >
              N° Casa
            </TableColumn>
            <TableColumn
              align="center"
              className="text-center text-xl font-semibold"
            >
              Jefe familia
            </TableColumn>
            <TableColumn
              align="center"
              className="text-center text-xl font-semibold"
            >
              Acciones
            </TableColumn>
          </TableHeader>
          <TableBody>
            {data &&
              data.map(({ id, calle, casa, manzana, jefeFamilia }) => (
                <TableRow key={id}>
                  <TableCell>{manzana}</TableCell>
                  <TableCell>{calle.toUpperCase()}</TableCell>
                  <TableCell>{casa}</TableCell>
                  <TableCell className="uppercase">
                    {jefeFamilia.map(
                      (jefe) => jefe.apellidos + " " + jefe.nombres.split(" ")[0]
                    ).join(", ")}
                    .
                  </TableCell>
                  <TableCell>
                    {jefeFamilia[0]?.id ? (
                      <Link
                        // href={`/consejo-comunal/id/censo/${jefeFamilia[0].censoId}`}
                        href={`/casas/${jefeFamilia[0]?.casaId}`}
                        className="block rounded-xl bg-blue-700 px-3 py-2 text-[0.875rem]  text-white transition-all hover:bg-blue-950"
                      >
                        Ver informacion
                      </Link>
                    ) : (
                      <Button disabled>Ver informacion</Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};
