import React from "react";
import { api } from "~/utils/api";
import { CustomLoading } from "../Loading";
import {
  Chip,
  ChipProps,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  User,
} from "@nextui-org/react";
import { type ROLE } from "@prisma/client";

const statusColorMap: Record<ROLE, ChipProps["color"]> = {
  ADMIN: "danger",
  LIDER_COMUNIDAD: "warning",
  LIDER_CALLE: "success",
};

export const UserList = () => {
  const { isLoading, data } = api.user.getUsers.useQuery();

  if (isLoading) return <CustomLoading />;

  if (!data) return null;

  return (
    <>
      <Table>
        <TableHeader>
          <TableColumn className="text-center">Usuario</TableColumn>
          <TableColumn className="text-center">Rol</TableColumn>
          <TableColumn className="text-center">Accion</TableColumn>
        </TableHeader>
        <TableBody>
          {data.map((user) => (
            <TableRow key={user.id.toString()}>
              <TableCell className="border-b-2">
                <User
                  className="uppercase"
                  avatarProps={{ radius: "full", src: user.image || "" }}
                  description={user.username}
                  name={user.name + " " + user.lastName}
                >
                  {user.username}
                </User>
              </TableCell>
              <TableCell className="border-b-2 text-center">
                <Chip
                  className=" mx-auto capitalize"
                  size="sm"
                  variant="flat"
                  color={statusColorMap[user.role_user]}
                >
                  {user.role_user === "ADMIN"
                    ? "Administrador"
                    : user.role_user === "LIDER_CALLE"
                    ? "Lider de calle"
                    : "Lider de comunidad"}
                </Chip>
              </TableCell>
              <TableCell className="border-b-2">
                <div className="relative flex items-center gap-2">
                  <Tooltip content="Details">
                    <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
                      Ver
                    </span>
                  </Tooltip>
                  <Tooltip content="Edit user">
                    <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
                      Editar
                    </span>
                  </Tooltip>
                  <Tooltip color="danger" content="Delete user">
                    <span className="cursor-pointer text-lg text-danger active:opacity-50">
                      Borrar
                    </span>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
