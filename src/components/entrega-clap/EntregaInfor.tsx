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
    <Card className="container mx-auto mt-4">
      <CardHeader>
        <h1 className="mx-auto text-center text-2xl font-medium">
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
            <TableColumn className="text-center">CASAS</TableColumn>
            <TableColumn className="text-center">FAMILIA</TableColumn>
            <TableColumn className="text-center">NO CARNET</TableColumn>
            <TableColumn className="text-center">UNIFAMILIAR</TableColumn>
            <TableColumn className="text-center">EXTRA</TableColumn>
            <TableColumn className="text-center">MULTIFAMILIAR</TableColumn>
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
            {data.estadistica.map(({ cajas, manzana }) => (
              <TableRow key={manzana}>
                <TableCell className="text-center">{manzana}</TableCell>
                <TableCell className="text-center">d</TableCell>
                <TableCell className="text-center">d</TableCell>
                <TableCell className="text-center">d</TableCell>
                <TableCell className="text-center">d</TableCell>
                <TableCell className="text-center">d</TableCell>
                <TableCell className="text-center">d</TableCell>

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
            ))}
          </TableBody>
        </Table>
      </CardBody>

      <div className=" grid  w-full grid-cols-12   overflow-x-scroll px-6 py-4">
        <div className="  border-y   ">
          <div className="text-center uppercase">TOTAL</div>
        </div>
        <div className="   border-y   ">
          <div className="text-center capitalize">d</div>
        </div>
        <div className="   border-y   ">
          <div className="text-center capitalize">d</div>
        </div>
        <div className="  border-y   ">
          <div className="text-center uppercase">d</div>
        </div>
        <div className="   border-y   ">
          <div className="text-center capitalize">d</div>
        </div>
        <div className="   border-y   ">
          <div className="text-center capitalize">d</div>
        </div>
        <div className="  border-y   ">
          <div className="text-center uppercase">
            {data.entrega.beneficiados.reduce(
              (a, b) => a + b.cajasAsignadas,
              0
            )}
          </div>
        </div>
        <div className="   border-y   ">
          <div className="text-center capitalize">
            {data.entrega.beneficiados.reduce(
              (a, b) => a + b.cajasAsignadas,
              0
            )}
          </div>
        </div>
        <div className="   border-y   ">
          <div className="text-center capitalize">
            {formatToBs(data.entrega.costeLogistica)}
          </div>
        </div>
        <div className="  border-y   ">
          <div className="text-center uppercase">
            {formatToBs(
              data.estadistica.reduce(
                (prev, current) => current.cajas.reduce((a, b) => a + b) + prev,
                0
              ) * data.entrega.costeCajaUnidad
            )}
          </div>
        </div>
        <div className="   border-y   ">
          <div className="text-center capitalize">
            {formatToBs(
              data.estadistica.reduce(
                (prev, current) => current.cajas.reduce((a, b) => a + b) + prev,
                0
              ) * data.entrega.costeTransporte
            )}
          </div>
        </div>
        <div className="   border-y   ">
          <div className="text-center capitalize">
            {formatToBs(
              data.estadistica.reduce(
                (prev, current) => current.cajas.reduce((a, b) => a + b) + prev,
                0
              ) * data.entrega.costeLogistica
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default EntregaInfor;
