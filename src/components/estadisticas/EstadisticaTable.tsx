import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";
import { api } from "~/utils/api";

export const EstadisticaTable = ({ consejoId }: { consejoId: number }) => {
  const { data } = api.consejo.getEstadisticas.useQuery({ id: consejoId });

  console.log(data);

  if (!data) return null;

  return (
    <>
      <Table className="h-auto min-w-full">
        <TableHeader>
          <TableColumn className="text-center">MANZANA</TableColumn>
          <TableColumn className="text-center">CASAS</TableColumn>
          <TableColumn className="text-center">FAMILIA</TableColumn>
          <TableColumn className="text-center">NO CARNET</TableColumn>
          <TableColumn className="text-center">UNIFAMILIAR</TableColumn>
          {/* <TableColumn className="text-center">EXTRA</TableColumn> */}
          <TableColumn className="text-center">MULTIFAMILIAR</TableColumn>
          <TableColumn className="text-center">ASIGNADAS</TableColumn>
          {/* <TableColumn className="text-center">ENTREGADA</TableColumn> */}
        </TableHeader>
        <TableBody>
          {data?.manzanas.map((manzana) => (
            <TableRow key={manzana.manzana} className="text-center">
              <TableCell className="border-1 text-lg font-semibold">
                {manzana?.manzana}
              </TableCell>
              <TableCell className="border-1 text-lg font-semibold">
                {manzana.casas.length}
              </TableCell>
              <TableCell className="border-1 text-lg font-semibold">
                {manzana.casas.length}
              </TableCell>
              <TableCell className="border-1 text-lg font-semibold">
                {manzana.carnets.length}
              </TableCell>
              <TableCell className="border-1 text-lg font-semibold">
                {
                  manzana.tipoFamilia.filter(
                    (familia) => familia.toLowerCase() === "unifamiliar"
                  ).length
                }
              </TableCell>
              {/* <TableCell className="border-1 ">Active</TableCell> */}
              <TableCell className="border-1 text-lg font-semibold">
                {
                  manzana.tipoFamilia.filter(
                    (familia) => familia.toLowerCase() === "multifamiliar"
                  ).length
                }
              </TableCell>
              <TableCell className="border-1 text-lg font-semibold">
                {manzana.cajas.reduce((a:number, b: number) => a + b, 0)}
              </TableCell>

              {/* <TableCell className="border-1 ">Paused</TableCell> */}
            </TableRow>
          ))}

          {/* <TableRow key="1">
          <TableCell>Tony Reichert</TableCell>
          <TableCell>CEO</TableCell>
          <TableCell>Active</TableCell>
          <TableCell>Technical Lead</TableCell>
          <TableCell>Paused</TableCell>
          <TableCell>Active</TableCell>
          <TableCell>Technical Lead</TableCell>
          <TableCell>Paused</TableCell>
        </TableRow>
        <TableRow key="2">
          <TableCell>Zoey Lang</TableCell>
          <TableCell>Technical Lead</TableCell>
          <TableCell>Paused</TableCell>
          <TableCell>Technical Lead</TableCell>
          <TableCell>Paused</TableCell>
          <TableCell>Active</TableCell>
          <TableCell>Technical Lead</TableCell>
          <TableCell>Paused</TableCell>
        </TableRow>
        <TableRow key="3">
          <TableCell>Jane Fisher</TableCell>
          <TableCell>Senior Developer</TableCell>
          <TableCell>Active</TableCell>
          <TableCell>Technical Lead</TableCell>
          <TableCell>Paused</TableCell>
          <TableCell>Active</TableCell>
          <TableCell>Technical Lead</TableCell>
          <TableCell>Paused</TableCell>
        </TableRow>
        <TableRow key="4">
          <TableCell>William Howard</TableCell>
          <TableCell>Community Manager</TableCell>
          <TableCell>Vacation</TableCell>
          <TableCell>Technical Lead</TableCell>
          <TableCell>Paused</TableCell>
          <TableCell>Active</TableCell>
          <TableCell>Technical Lead</TableCell>
          <TableCell>Paused</TableCell>
        </TableRow>
        <TableRow key="5">
          <TableCell>William Howard</TableCell>
          <TableCell>Community Manager</TableCell>
          <TableCell>Vacation</TableCell>
          <TableCell>Technical Lead</TableCell>
          <TableCell>Paused</TableCell>
          <TableCell>Active</TableCell>
          <TableCell>Technical Lead</TableCell>
          <TableCell>Paused</TableCell>
        </TableRow> */}
        </TableBody>
      </Table>
    </>
  );
};
