import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

import { type ROLE, type Casa } from "@prisma/client";
import Link from "next/link";
import { api } from "~/utils/api";

interface JefeFamilia {
  id: bigint;
  nombres: string;
  apellidos: string;
  tipoDocumento: string;
  numeroDocumento: string;
  profesion: string;
  casa: Casa | null;
  genero: string;
  telefono: string;
  email: string;
}

interface TuInterfaz {
  id: number;
  jefeFamilia: JefeFamilia;
  cajasClaps: number;
  familias: number;
  jefeFamiliaId: bigint;
  consejoComunalId: number;
  fechaRegistro: Date;
}

interface Props {
  lideres: TuInterfaz[];
  role?: ROLE;
  update?: () => void;
}

const LiderCalleList = ({ lideres, role = "LIDER_CALLE", update }: Props) => {
  const jefeCalle = api.lider.delete.useMutation();

  const handleDelete = async (id: number) => {
    await jefeCalle.mutateAsync(
      { id },
      {
        onSuccess(data, variables, context) {
          update && update();
        },
        onError(error, variables, context) {},
      }
    );
  };

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
        <TableColumn align="center">Profesion</TableColumn>
        <TableColumn className="text-center">Nombres y Apellidos</TableColumn>
        <TableColumn className="text-center">Familias</TableColumn>
        <TableColumn className="text-center">Combos</TableColumn>
        <TableColumn className="text-center">Telefono</TableColumn>
        <TableColumn className="text-center">Correo Electronico</TableColumn>
        <TableColumn className="text-center">Direccion</TableColumn>
        <TableColumn className="text-center">Acciones</TableColumn>
      </TableHeader>
      <TableBody>
        {lideres.map(({ jefeFamilia, id, cajasClaps, familias,consejoComunalId }, index) => (
          <TableRow key={id} className="text-center uppercase">
            <TableCell>{index + 1}</TableCell>
            <TableCell>{jefeFamilia.numeroDocumento}</TableCell>
            <TableCell>
              {jefeFamilia.tipoDocumento.toUpperCase() === "V"
                ? "VENEZOLANO"
                : "EXTRANJERO"}
            </TableCell>
            {/* <TableCell>3/6/1985</TableCell> */}
            <TableCell>{jefeFamilia.genero}</TableCell>
            <TableCell>{jefeFamilia.profesion}</TableCell>
            <TableCell>
              {jefeFamilia.nombres + " " + jefeFamilia.apellidos}{" "}
            </TableCell>
            <TableCell>{familias}</TableCell>
            <TableCell>{cajasClaps}</TableCell>
            <TableCell>{jefeFamilia.telefono}</TableCell>
            <TableCell className="lowercase">{jefeFamilia.email}</TableCell>
            <TableCell>
              {jefeFamilia.casa
                ? `CLL. ${jefeFamilia.casa.calle}, MZNA ${jefeFamilia.casa.manzana},
              CASA ${jefeFamilia.casa.casa}`
                : "CLL. NO, MZNA NO, CASA NO"}
            </TableCell>
            <TableCell className="">
              {role === "LIDER_CALLE" ? (
                <div></div>
              ) : (
                <div className="flex flex-col gap-1">
                  <Button
                    size={"sm"}
                    className="bg-red-600 text-white transition-all hover:bg-red-800 disabled:bg-red-800"
                    onPress={() => {
                      handleDelete(parseInt(id.toString()));
                    }}
                  >
                    Eliminar
                  </Button>
                  <Link
                    // size={"sm"}
                    className="inline-block capitalize text-xs cursor-pointer rounded-md  px-3 py-2 bg-blue-600 text-white transition-all hover:bg-blue-800 disabled:bg-blue-800"
                    href={`/consejo-comunal/${consejoComunalId}/lider/${id}`}
                  >
                    Ver
                  </Link>
                </div>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LiderCalleList;
