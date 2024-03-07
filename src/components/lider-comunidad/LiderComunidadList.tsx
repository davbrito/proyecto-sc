import React from "react";
import { type ROLE } from "@prisma/client";
import { api } from "~/utils/api";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { CustomLoading } from "../Loading";

interface Props {
  role?: ROLE;
  onSuccess?: () => void;
  consejoId: number;
}

const LiderComunidadList = ({
  role = "LIDER_CALLE",
  onSuccess,
  consejoId,
}: Props) => {
  const deleteLider = api.liderComunidad.delete.useMutation();
  const { data, isLoading, refetch } = api.liderComunidad.getAll.useQuery({
    consejoComunalId: consejoId,
  });

  const handleDelete = async (id: number) => {
    await deleteLider.mutateAsync(
      { id },
      {
        onSuccess(data, variables, context) {
          onSuccess && onSuccess();
        },
        onError(error, variables, context) {},
      }
    );
  };

  if (isLoading) return <CustomLoading />;

  if (!data) return null;

  if (data.length === 0)
    return (
      <div className="mx-auto min-h-[20vh] w-full place-content-center rounded-3xl border border-gray-400 px-6 py-10">
        <h2 className="text-center text-2xl font-light">
          Aun no existen lideres de comunidad registrados.
        </h2>
      </div>
    );

  return (
    <Table isStriped>
      <TableHeader>
        <TableColumn className="text-center">N#</TableColumn>
        <TableColumn className="text-center">Cedula</TableColumn>
        <TableColumn className="text-center">Nacionalidad</TableColumn>
        <TableColumn className="text-center">Genero</TableColumn>
        <TableColumn align="center">Profesion</TableColumn>
        <TableColumn className="text-center">Nombres y Apellidos</TableColumn>
        <TableColumn className="text-center">Telefono</TableColumn>
        <TableColumn className="text-center">Correo Electronico</TableColumn>
        <TableColumn className="text-center">Acciones</TableColumn>
      </TableHeader>
      <TableBody>
        {data.map(({ id, jefeFamilia }, index) => (
          <TableRow key={id} className="text-center uppercase">
            <TableCell>{index + 1}</TableCell>
            <TableCell>
              {jefeFamilia.tipoDocumento}-{jefeFamilia.numeroDocumento}
            </TableCell>
            <TableCell>
              {jefeFamilia.tipoDocumento.toUpperCase() === "V"
                ? "VENEZOLANO"
                : "EXTRANJERO"}
            </TableCell>
            <TableCell>{jefeFamilia.genero}</TableCell>
            <TableCell>{jefeFamilia.profesion}</TableCell>
            <TableCell>
              {jefeFamilia.nombres + " " + jefeFamilia.apellidos}{" "}
            </TableCell>
            <TableCell>{jefeFamilia.telefono}</TableCell>
            <TableCell className="lowercase">{jefeFamilia.email}</TableCell>

            <TableCell className="">
              {role === "LIDER_CALLE" ? (
                <div></div>
              ) : (
                <>
                  <Button
                    size={"sm"}
                    className="bg-red-600 text-white transition-all hover:bg-red-800 disabled:bg-red-800"
                    onPress={() => {
                      handleDelete(id as number);
                    }}
                  >
                    Eliminar
                  </Button>
                </>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LiderComunidadList;
