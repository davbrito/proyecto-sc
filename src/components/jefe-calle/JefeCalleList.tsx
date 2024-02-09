import {
  Card,
  CardBody,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { api } from "~/utils/api";
import { type ROLE, type LiderCalle, type Casa } from "@prisma/client";

interface Props {
  lideres: (LiderCalle & { casa: Casa })[];
}

const JefeCalleList = ({ lideres }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableColumn className="text-center">N#</TableColumn>
        <TableColumn className="text-center">Cedula</TableColumn>
        <TableColumn className="text-center">Nacionalidad</TableColumn>
        {/* <TableColumn align="center" className="w-max">
          Fecha de nacimiento
        </TableColumn> */}
        <TableColumn className="text-center">Genero</TableColumn>
        {/* <TableColumn align="center">Profesion</TableColumn> */}
        <TableColumn className="text-center">Nombres y Apellidos</TableColumn>
        <TableColumn className="text-center">Familias</TableColumn>
        <TableColumn className="text-center">Combos</TableColumn>
        <TableColumn className="text-center">Telefono</TableColumn>
        <TableColumn className="text-center">Correo Electronico</TableColumn>
        <TableColumn className="text-center">Direccion</TableColumn>
      </TableHeader>
      <TableBody>
        {lideres.map((lider, index) => (
          <TableRow key={lider.id} className="text-center uppercase">
            <TableCell>{index + 1}</TableCell>
            <TableCell>{lider.cedula}</TableCell>
            <TableCell>{lider.nacionalidad}</TableCell>
            {/* <TableCell>3/6/1985</TableCell> */}
            <TableCell>{lider.genero}</TableCell>
            {/* <TableCell>AMA DE CASA</TableCell>*/}
            <TableCell>{lider.nombres + " " + lider.apellidos} </TableCell>
            <TableCell>{lider.cantidad_combos}</TableCell>
            <TableCell>{lider.cantidad_familias}</TableCell>
            <TableCell>{lider.telefono}</TableCell>
            <TableCell className="lowercase">{lider.email}</TableCell>
            <TableCell>
              CLL. {lider.casa.calle}, MZNA {lider.casa.manzana}, CASA{" "}
              {lider.casa.casa}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default JefeCalleList;
