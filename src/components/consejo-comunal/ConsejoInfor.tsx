import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
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
import { ErrorMessage } from "../ErrorMessage";

interface Props {
  consejoId: string;
}
export const ConsejoInfor = ({ consejoId }: Props) => {
  const { data, error, isLoading } = api.consejo.getById.useQuery({
    id: parseInt(consejoId),
  });

  if (isLoading) return <CustomLoading className="place-content-center" />;

  if (!data || error)
    return (
      <div className="container mx-auto">
        <ErrorMessage
          title="Error al recuperar la informacion del consejo comunal."
          body="Revise su conexion de internet, e intente nuevamente."
        />
      </div>
    );

  return (
    <div className="container mx-auto">
      <Card className="mt-4">
        <CardBody>
          <h1 className="text-center text-xl font-medium uppercase">
            Sistema Popular de Distribucion de Alimentos Comites Locales de
            Abastecimiento y Produccion Socialista
          </h1>
          <h2 className="text-center text-xl uppercase">Estado Bolivar</h2>
        </CardBody>
        <CardFooter className=" flex justify-center gap-4">
          <Link
            href={`/consejo-comunal/${consejoId}/censo`}
            className="inline-block cursor-pointer rounded-md   bg-blue-600 px-3 py-2 text-white transition-all hover:bg-blue-900"
          >
            Datos del censo
          </Link>
          <Link
            href={"/familiares"}
            className="inline-block cursor-pointer rounded-md   bg-blue-600 px-3 py-2 text-white transition-all hover:bg-blue-900"
          >
            Familiares
          </Link>
          <Link
            href={"/casas"}
            className="inline-block cursor-pointer rounded-md   bg-blue-600 px-3 py-2 text-white transition-all hover:bg-blue-900"
          >
            Casas
          </Link>
        </CardFooter>
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <h1 className="mx-auto text-center text-2xl font-medium">
            Identificacion del CLAP
          </h1>
        </CardHeader>
        <CardBody>
          <div className="grid  grid-cols-2 gap-1  lg:grid-cols-3  lg:text-base">
            <div className="grid grid-cols-2 gap-3 rounded-lg border border-gray-500   px-3 py-2 lg:gap-0 lg:border-solid">
              <div className=" font-semibold">Municipio:</div>
              <div className="text-right uppercase">{data.municipio}</div>
            </div>
            <div className="grid  grid-cols-2 gap-3 rounded-lg border border-gray-500  px-3 py-2 lg:gap-0 lg:border-solid">
              <div className=" font-semibold">Parroquia:</div>
              <div className="text-right uppercase">{data.parroquia}</div>
            </div>
            <div className="grid grid-cols-2 gap-3 rounded-lg border border-gray-500  px-3 py-2 lg:gap-0 lg:border-solid">
              <div className=" font-semibold">Nombre CLAP:</div>
              <div className="text-right capitalize">{data.nombre_clap}</div>
            </div>
          </div>

          <div className="mt-1 grid  grid-cols-2 gap-1  lg:grid-cols-3  lg:text-base">
            <div className="grid grid-cols-2 gap-3 rounded-lg  border border-gray-500   px-3 py-2 lg:gap-0 lg:border-solid">
              <div className="  font-semibold">Consejo Comunal:</div>
              <div className="text-right uppercase">{data.nombre_consejo}</div>
            </div>
            <div className="grid  grid-cols-2 gap-3 rounded-lg border border-gray-500  px-3 py-2 lg:gap-0 lg:border-solid">
              <div className=" font-semibold">RIF:</div>
              <div className="text-right uppercase">{data.rif}</div>
            </div>
            <div className="grid grid-cols-2 gap-3 rounded-lg border border-gray-500  px-3 py-2 lg:gap-0 lg:border-solid">
              <div className=" font-semibold">Circuito:</div>
              <div className="text-right uppercase">{data.circuito}</div>
            </div>
          </div>

          <div className="mt-1 grid gap-1   lg:grid-cols-2  lg:text-base">
            <div className="grid grid-cols-2 gap-3 rounded-lg border border-gray-500 px-3 py-2 lg:gap-0 lg:border-solid">
              <div className=" font-semibold">Cantidad de familias:</div>
              <div className="text-right uppercase">{data.censos.length}</div>
            </div>
            <div className="grid  grid-cols-2 gap-3 rounded-lg border border-gray-500 px-3 py-2 lg:gap-0 lg:border-solid">
              <div className=" font-semibold">Cantidad de Combos:</div>
              <div className="text-right uppercase">
                {data.censos.reduce(
                  (prev, current) => prev + current.cajasClapsPorRecibir,
                  0
                )}
              </div>
            </div>
          </div>
        </CardBody>
        <CardFooter>
          <Link
            href={`/consejo-comunal/${consejoId}/censo`}
            className="mx-auto h-fit w-fit rounded-md bg-blue-600 px-4 py-3 text-white transition-colors hover:bg-blue-700"
          >
            Censados
          </Link>
        </CardFooter>
      </Card>

      <Card className="my-4">
        <CardHeader className="relative">
          <h1 className="mx-auto flex-shrink text-center text-2xl font-medium">
            Ficha General del CLAP
          </h1>
          <button className=" h-fit w-fit rounded-md border-none bg-green-700 px-3 py-2 text-sm text-white transition-colors hover:bg-green-600">
            Añadir
          </button>
        </CardHeader>
        <CardBody>
          <Table>
            <TableHeader>
              <TableColumn>Estructura</TableColumn>
              <TableColumn>Nombres y Apellidos</TableColumn>
              <TableColumn>Cedula</TableColumn>
              <TableColumn>Telefono</TableColumn>
              <TableColumn>Profesion</TableColumn>
              <TableColumn>Correo Electronico</TableColumn>
              <TableColumn>Direccion</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key={1}>
                <TableCell>LIDER DE COMUNIDAD:</TableCell>
                <TableCell>YESSICA GONZÁLEZ GÓMEZ</TableCell>
                <TableCell>10184914</TableCell>
                <TableCell>04249033196</TableCell>
                <TableCell>LIC. GESTIÓN SOCIAL </TableCell>
                <TableCell>yessigonza@gmail.com</TableCell>
                <TableCell>C. KAVANAYEN, MZNA 13, # 9</TableCell>
              </TableRow>
              <TableRow key={2}>
                <TableCell>LIDER DE COMUNIDAD:</TableCell>
                <TableCell>YESSICA GONZÁLEZ GÓMEZ</TableCell>
                <TableCell>10184914</TableCell>
                <TableCell>04249033196</TableCell>
                <TableCell>LIC. GESTIÓN SOCIAL </TableCell>
                <TableCell>yessigonza@gmail.com</TableCell>
                <TableCell>C. KAVANAYEN, MZNA 13, # 9</TableCell>
              </TableRow>
              <TableRow key={3}>
                <TableCell>LIDER DE COMUNIDAD:</TableCell>
                <TableCell>YESSICA GONZÁLEZ GÓMEZ</TableCell>
                <TableCell>10184914</TableCell>
                <TableCell>04249033196</TableCell>
                <TableCell>LIC. GESTIÓN SOCIAL </TableCell>
                <TableCell>yessigonza@gmail.com</TableCell>
                <TableCell>C. KAVANAYEN, MZNA 13, # 9</TableCell>
              </TableRow>
              <TableRow key={4}>
                <TableCell>LIDER DE COMUNIDAD:</TableCell>
                <TableCell>YESSICA GONZÁLEZ GÓMEZ</TableCell>
                <TableCell>10184914</TableCell>
                <TableCell>04249033196</TableCell>
                <TableCell>LIC. GESTIÓN SOCIAL </TableCell>
                <TableCell>yessigonza@gmail.com</TableCell>
                <TableCell>C. KAVANAYEN, MZNA 13, # 9</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      <Card className="mb-4">
        <CardHeader className="relative">
          <h1 className="mx-auto flex-shrink text-center text-2xl font-medium">
            Lideres de calle
          </h1>
          <button className=" h-fit w-fit rounded-md border-none bg-green-700 px-3 py-2 text-sm text-white transition-colors hover:bg-green-600">
            Añadir
          </button>
        </CardHeader>
        <CardBody>
          <Table>
            <TableHeader>
              <TableColumn align="center">N#</TableColumn>
              <TableColumn align="center">Cedula</TableColumn>
              <TableColumn align="center">Nacionalidad</TableColumn>
              <TableColumn align="center" className="w-max">
                Fecha de nacimiento
              </TableColumn>
              <TableColumn align="center">Genero</TableColumn>
              <TableColumn align="center">Profesion</TableColumn>
              <TableColumn align="center">Nombres y Apellidos</TableColumn>
              <TableColumn align="center">Familias</TableColumn>
              <TableColumn align="center">Combos</TableColumn>
              <TableColumn align="center">Telefono</TableColumn>
              <TableColumn align="center">Correo Electronico</TableColumn>
              <TableColumn align="center">Direccion</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key={1}>
                <TableCell>1</TableCell>
                <TableCell>17339263</TableCell>
                <TableCell>V</TableCell>
                <TableCell>3/6/1985</TableCell>
                <TableCell>F</TableCell>
                <TableCell>AMA DE CASA</TableCell>
                <TableCell>YHANEDDY RIVAS</TableCell>
                <TableCell>28</TableCell>
                <TableCell>29</TableCell>
                <TableCell>04168674166</TableCell>
                <TableCell>yhannedys15@gmail.com</TableCell>
                <TableCell>CLL. PIJIGUAOS, MZNA 16, CASA 14</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="mt-2 text-center">
            <h4 className="mx-auto font-normal">
              TOTAL COMBOS: <span className="font-bold">56</span>
            </h4>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
