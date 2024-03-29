import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import React, { useState } from "react";
import { api } from "~/utils/api";
import { CustomLoading } from "../Loading";
import { ErrorMessage } from "../ErrorMessage";
import { LayoutContent } from "../Layout";
import { type ROLE } from "@prisma/client";
import LiderComunidadList from "../lider-comunidad/LiderComunidadList";
import { LiderComunidadForm } from "../lider-comunidad/LiderComunidadForm";
import LiderCalle from "../lider-calle/LiderCalle";
import LiderComunidad from "../lider-comunidad/LiderComunidad";

interface Props {
  consejoId: string;
  role: ROLE;
}
export const ConsejoInfor = ({ consejoId, role }: Props) => {
  const { data, error, isLoading } = api.consejo.getById.useQuery(
    {
      id: parseInt(consejoId),
    },
    { cacheTime: 30 * 60 * 1000 }
  );

  const [openJefeComunidad, setOpenJefeComunidad] = useState(false);

  if (isLoading) return <CustomLoading className="place-content-center" />;

  if (!data || error)
    return (
      <LayoutContent className="min-h-[40vh] place-content-center">
        <ErrorMessage
          title="Error al recuperar la informacion del consejo comunal."
          body="Revise su conexion de internet, e intente nuevamente."
        />
      </LayoutContent>
    );

  return (
    <>
      <div className="container mx-auto">
        <Card className="mt-4">
          <CardBody>
            <h1 className="text-center text-xl font-medium uppercase">
              Sistema Popular de Distribucion de Alimentos Comites Locales de
              Abastecimiento y Produccion Socialista
            </h1>
            <h2 className="text-center text-xl uppercase">
              Estado {data.estado}
            </h2>
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
            <div className="grid  grid-cols-1 gap-1  lg:grid-cols-3  lg:text-base">
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

            <div className="mt-1 grid  grid-cols-1 gap-1  lg:grid-cols-3  lg:text-base">
              <div className="grid grid-cols-2 gap-3 rounded-lg  border border-gray-500   px-3 py-2 lg:gap-0 lg:border-solid">
                <div className="  font-semibold">Consejo Comunal:</div>
                <div className="text-right uppercase">
                  {data.nombre_consejo}
                </div>
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

            <Link
              href={`/consejo-comunal/${consejoId}/entrega`}
              className="mx-auto h-fit w-fit rounded-md bg-green-600 px-4 py-3 text-white transition-colors hover:bg-green-700"
            >
              Registrar Entrega
            </Link>

            <Link
              href={`/consejo-comunal/${consejoId}/entrega`}
              className="mx-auto h-fit w-fit rounded-md bg-violet-600 px-4 py-3 text-white transition-colors hover:bg-violet-700"
            >
              Ver Entregas de cajas registradas
            </Link>
          </CardFooter>
        </Card>

        <LiderCalle role={role} consejoId={parseInt(consejoId)} />

        <LiderComunidad role={role} consejoId={parseInt(consejoId)} />
      </div>
    </>
  );
};
