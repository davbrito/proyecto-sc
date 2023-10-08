import React, { useRef, useState } from "react";
import { api } from "~/utils/api";
import { CustomLoading } from "../Loading";
import {
  Chip,
  type ChipProps,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  User,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@nextui-org/react";
import { type ROLE } from "@prisma/client";
import { EyeIcon } from "../icons/EjeIcon";
import { EditIcon } from "../icons/EditIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import { EditForm } from "../profile/editForm";
import DeleteConfirmation from "../DeleteConfirmation";
import { PasswordIcon } from "../icons/PasswordIcon";
import { ChangePassword } from "./ChangePassword";
import { PeopleIcon } from "../icons/PeopleIcon";
import { ChangeConsejoComunal } from "./ChangeConsejoComunal";
import Link from "next/link";

const statusColorMap: Record<ROLE, ChipProps["color"]> = {
  ADMIN: "danger",
  LIDER_COMUNIDAD: "primary",
  LIDER_CALLE: "success",
};

export const UserList = () => {
  const { isLoading, data, refetch } = api.user.getUsers.useQuery();

  const { mutateAsync } = api.user.deleteById.useMutation({
    onSuccess(data, variables, context) {
      refetch();
    },
  });

  const [openEditUser, setOpenEditUser] = useState<string>("");
  const [deleteUser, setDeleteUser] = useState("");
  const [changePassword, setChangePassword] = useState("");
  const [changeConsejo, setChangeConsejo] = useState("");

  if (isLoading) return <CustomLoading />;

  if (!data) return null;

  return (
    <>
      <Table>
        <TableHeader>
          <TableColumn className="text-center">Usuario</TableColumn>
          <TableColumn className="text-center">Rol</TableColumn>
          <TableColumn className="text-center">Consejo Comunal</TableColumn>
          <TableColumn className="text-center">Accion</TableColumn>
        </TableHeader>
        <TableBody>
          {data.map((user) => (
            <TableRow key={user.id.toString()}>
              <TableCell className="border-b-2">
                <User
                  avatarProps={{ radius: "full", src: user.image || "" }}
                  description={user.username}
                  classNames={{
                    description: "text-default-500",
                    name: "capitalize",
                  }}
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
              <TableCell className="border-b-2 capitalize">
                {user.consejo?.id ? (
                  <Link
                    href={`/consejo-comunal/${(
                      user.consejo.id as number
                    ).toString()}`}
                    className="font-medium transition-all hover:text-blue-700 "
                  >
                    {user.consejo?.nombre_clap}
                  </Link>
                ) : (
                  "No esta asociado."
                )}
              </TableCell>
              <TableCell className="border-b-2">
                <div className="relative flex items-center gap-3">
                  <Tooltip
                    content="Unir a consejo comunal"
                    className="bg-[#0E793C] text-white"
                  >
                    <span className="cursor-pointer text-lg text-red-600 active:opacity-50">
                      <PeopleIcon
                        fill="#0E793C"
                        onClick={() => {
                          setChangeConsejo(user.id);
                        }}
                      />
                    </span>
                  </Tooltip>
                  <Tooltip content="Nueva contraseña" color="primary">
                    <span className="cursor-pointer text-lg text-blue-600 active:opacity-50">
                      <PasswordIcon
                        fill="#165ad0"
                        onClick={() => {
                          setChangePassword(user.id);
                        }}
                      />
                    </span>
                  </Tooltip>

                  <Tooltip content="Editar" color="secondary">
                    <span className="cursor-pointer text-lg text-purple-600 active:opacity-50">
                      <EditIcon
                        onClick={() => {
                          setOpenEditUser(user.username);
                        }}
                      />
                    </span>
                  </Tooltip>
                  <Tooltip color="danger" content="Eliminar">
                    <span className="cursor-pointer text-lg text-red-600 active:opacity-50">
                      <DeleteIcon onClick={() => setDeleteUser(user.id)} />
                    </span>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal
        aria-label="edit-user-form"
        isOpen={!!openEditUser}
        size="lg"
        onClose={() => {
          setOpenEditUser("");
          refetch();
        }}
      >
        <ModalContent>
          {(close) => (
            <>
              <ModalHeader>
                <h2 className=" mx-auto  text-2xl font-bold">
                  Actualizar Informacion
                </h2>
              </ModalHeader>
              <ModalBody>
                <EditForm
                  username={openEditUser}
                  isModal={true}
                  handleSuccess={() => {
                    close();
                  }}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        aria-label="change-password-form"
        isOpen={!!changePassword}
        size="lg"
        onClose={() => {
          setChangePassword("");
        }}
      >
        <ModalContent>
          {(close) => (
            <>
              <ModalHeader>
                <h2 className=" mx-auto  text-2xl font-bold">
                  Actualizar Contraseña
                </h2>
              </ModalHeader>
              <ModalBody>
                <ChangePassword
                  userId={changePassword}
                  handleSuccess={() => close()}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        aria-label="edit-consejo-form"
        isOpen={!!changeConsejo}
        size="lg"
        onClose={() => {
          setChangeConsejo("");
        }}
      >
        <ModalContent>
          {(close) => (
            <>
              <ModalHeader>
                <h2 className=" mx-auto  text-2xl font-bold">
                  Unir a consejo comunal
                </h2>
              </ModalHeader>
              <ModalBody>
                <ChangeConsejoComunal
                  handleSuccess={() => close()}
                  userId={changeConsejo}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      <DeleteConfirmation
        open={!!deleteUser}
        onClose={() => {
          setDeleteUser("");
        }}
        onDelete={async () => {
          await mutateAsync({ id: deleteUser });
        }}
      />
    </>
  );
};
