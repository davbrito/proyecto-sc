import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
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

const EntregaInfor = ({ entregaId }: { entregaId: number }) => {
  const { data, isLoading } = api.entrega.getStatisticsById.useQuery({
    id: entregaId,
  });
  console.log(data, isLoading);
  const formatToBs = (number: number) => {
    const formattedNumber = number.toLocaleString("es-VE", {
      minimumFractionDigits: 2,
      style: "currency",
      currency: "VEF",
    });
    return `Bs.${formattedNumber.replace("VEF", "")}`;
  };

  if (isLoading)
    return <CustomLoading className="h-[30vh] place-content-center" />;
  if (!data) return null;
  return (
    <Card className="container mx-auto mt-8">
      <CardHeader>
        <h1 className="mx-auto text-center text-3xl font-medium">
          Informacion de entrega de cajas CLAP{" "}
          {data.entrega.fechaEntrega.toLocaleDateString("es-ES", {
            month: "long",
            year: "numeric",
          })}{" "}
          del Consejo Comunal '{data.entrega.ConsejoComunal.nombre_consejo}'
        </h1>
      </CardHeader>
      <CardBody>
        <div className="mb-6  mt-4 grid  grid-cols-2  gap-1 lg:grid-cols-3 lg:text-base">
          <div className="col-span-3 grid gap-3 rounded-lg border border-gray-500 px-3   py-2 lg:grid-cols-2 lg:gap-0 lg:border-solid">
            <div className=" font-semibold">Fecha de entrega:</div>
            <div className="text-right uppercase">
              {data.entrega.fechaEntrega.toLocaleDateString("es-ES", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
          </div>
          <div className="grid  gap-3 rounded-lg border border-gray-500 px-3  py-2 lg:grid-cols-2 lg:gap-0 lg:border-solid">
            <div className=" font-semibold">Coste unitario de Caja:</div>
            <div className="text-right ">
              {formatToBs(data.entrega.costeCajaUnidad)}
            </div>
          </div>
          <div className="grid gap-3 rounded-lg border border-gray-500 px-3  py-2 lg:grid-cols-2 lg:gap-0 lg:border-solid">
            <div className=" font-semibold">Coste unitario de Transporte:</div>
            <div className="text-right capitalize">
              {formatToBs(data.entrega.costeTransporte)}
            </div>
          </div>
          <div className="grid gap-3 rounded-lg border border-gray-500 px-3  py-2 lg:grid-cols-2 lg:gap-0 lg:border-solid">
            <div className=" font-semibold">Coste unitario de Logistica:</div>
            <div className="text-right capitalize">
              {formatToBs(data.entrega.costeLogistica)}
            </div>
          </div>
        </div>

        <Table isCompact isStriped>
          <TableHeader>
            <TableColumn className="text-center">MANZANA</TableColumn>
            <TableColumn className="text-center">FAMILIA</TableColumn>
            <TableColumn className="text-center">POSEEN CARNET</TableColumn>
            <TableColumn className="text-center">UNIFAMILIAR</TableColumn>
            <TableColumn className="text-center">EXTRA</TableColumn>
            <TableColumn className="text-center">BIFAMILIAR</TableColumn>
            <TableColumn className="text-center">ASIGNADAS</TableColumn>
            <TableColumn className="text-center">ENTREGADA</TableColumn>
            <TableColumn className="text-center">COSTE CAJA(TOTAL)</TableColumn>
            <TableColumn className="text-center">
              COSTE TRANSPORTE(TOTAL)
            </TableColumn>
            <TableColumn className="text-center">
              COSTE LOGISTICA(TOTAL)
            </TableColumn>
          </TableHeader>
          <TableBody>
            {data.estadistica.map(
              ({ cajas, manzana, carnets, tipoFamilia, familias }) => (
                <TableRow key={manzana}>
                  <TableCell className="text-center">{manzana}</TableCell>

                  <TableCell className="text-center">
                    {familias.length}
                  </TableCell>
                  <TableCell className="text-center">
                    {carnets.reduce((prev, carnet) => {
                      if (carnet) return prev + 1;
                      return prev;
                    }, 0)}
                  </TableCell>
                  <TableCell className="text-center">
                    {tipoFamilia.reduce((prev, tipo) => {
                      if (tipo === "unifamiliar") return prev + 1;
                      return prev;
                    }, 0)}
                  </TableCell>
                  <TableCell className="text-center">
                    {cajas.reduce((a, b) => a + b, 0) - familias.length}
                  </TableCell>
                  <TableCell className="text-center">
                    {tipoFamilia.reduce((prev, tipo) => {
                      if (tipo !== "unifamiliar") return prev + 1;
                      return prev;
                    }, 0)}
                  </TableCell>

                  <TableCell className="text-center">
                    {cajas.reduce((a, b) => a + b, 0)}
                  </TableCell>
                  <TableCell className="text-center">
                    {cajas.reduce((a, b) => a + b, 0)}
                  </TableCell>
                  <TableCell className="text-center font-bold">
                    {formatToBs(
                      cajas.reduce((a, b) => a + b, 0) *
                        data.entrega.costeCajaUnidad
                    )}
                  </TableCell>
                  <TableCell className="text-center font-bold">
                    {formatToBs(
                      cajas.reduce((a, b) => a + b, 0) *
                        data.entrega.costeTransporte
                    )}
                  </TableCell>
                  <TableCell className="text-center font-bold">
                    {formatToBs(
                      cajas.reduce((a, b) => a + b, 0) *
                        data.entrega.costeLogistica
                    )}
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </CardBody>
      <div className="relative overflow-x-auto border-t-1 pb-4  shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="bg-gray-50 text-base uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">
                TOTAL
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                {data.estadistica.reduce(
                  (prev, { familias }) => familias?.length + prev,
                  0
                )}
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                {data.estadistica.reduce(
                  (prev, { carnets }) =>
                    carnets.reduce((prev, carnet) => {
                      if (carnet) return prev + 1;
                      return prev;
                    }, 0) + prev,
                  0
                )}
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                {data.estadistica.reduce(
                  (prev, { tipoFamilia }) =>
                    tipoFamilia.reduce((pre, tipo) => {
                      if (tipo === "unifamiliar") return pre + 1;
                      return pre;
                    }, 0) + prev,
                  0
                )}
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                {data.estadistica.reduce(
                  (prev, { cajas, familias }) =>
                    cajas.reduce((a, b) => a + b, 0) - familias.length + prev,
                  0
                )}
              </th>

              <th scope="col" className="px-6 py-3 text-center">
                {data.estadistica.reduce(
                  (prev, { tipoFamilia }) =>
                    tipoFamilia.reduce((pre, tipo) => {
                      if (tipo !== "unifamiliar") return pre + 1;
                      return pre;
                    }, 0) + prev,
                  0
                )}
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                {data.entrega.beneficiados.reduce(
                  (a, b) => a + b.cajasAsignadas,
                  0
                )}
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                {data.entrega.beneficiados.reduce(
                  (a, b) => a + b.cajasAsignadas,
                  0
                )}
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                {formatToBs(
                  data.estadistica.reduce(
                    (prev, current) =>
                      current.cajas.reduce((a, b) => a + b) + prev,
                    0
                  ) * data.entrega.costeCajaUnidad
                )}
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                {formatToBs(
                  data.estadistica.reduce(
                    (prev, current) =>
                      current.cajas.reduce((a, b) => a + b) + prev,
                    0
                  ) * data.entrega.costeTransporte
                )}
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                {formatToBs(
                  data.estadistica.reduce(
                    (prev, current) =>
                      current.cajas.reduce((a, b) => a + b) + prev,
                    0
                  ) * data.entrega.costeLogistica
                )}
              </th>
            </tr>
          </thead>
        </table>
      </div>
    </Card>
  );
};

export default EntregaInfor;
