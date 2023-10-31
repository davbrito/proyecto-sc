import React, { useState } from "react";
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
  Pagination,
} from "@nextui-org/react";
import { type ROLE } from "@prisma/client";
import { EditIcon } from "../icons/EditIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import { EditForm } from "../profile/editForm";
import DeleteConfirmation from "../DeleteConfirmation";
import { PasswordIcon } from "../icons/PasswordIcon";
import { ChangePassword } from "./ChangePassword";
import { PeopleIcon } from "../icons/PeopleIcon";
import { ChangeConsejoComunal } from "./ChangeConsejoComunal";
import Link from "next/link";
import { RuleIcon } from "../icons/RuleIcon";
import { RoleForm } from "./RoleForm";

const statusColorMap: Record<ROLE, ChipProps["color"]> = {
  ADMIN: "danger",
  LIDER_COMUNIDAD: "primary",
  LIDER_CALLE: "success",
};

const LIMITS = 5;

export const UserList = () => {
  const { isLoading, data, refetch, fetchNextPage, isFetching, hasNextPage } =
    api.user.getUsers.useInfiniteQuery(
      {
        limits: LIMITS,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
      }
    );

  const { mutateAsync } = api.user.deleteById.useMutation({
    onSuccess() {
      refetch();
    },
  });

  const [openEditUser, setOpenEditUser] = useState<string>("");
  const [deleteUser, setDeleteUser] = useState("");
  const [changePassword, setChangePassword] = useState("");
  const [changeConsejo, setChangeConsejo] = useState("");
  const [changeRole, setChangeRole] = useState("");
  const [page, setPage] = useState(0);

  if (isLoading) return <CustomLoading />;

  if (!data) return null;
  console.log(data);
  return (
    <>
      <Table
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={0}
              total={data?.pages[0]?.total || 1}
              onChange={(newPage) => {
                if (newPage - 1 > page) fetchNextPage();

                setPage(newPage - 1);
              }}
            />
          </div>
        }
        classNames={{
          wrapper: "min-h-[300px]",
        }}
      >
        <TableHeader>
          <TableColumn className="text-center">Usuario</TableColumn>
          <TableColumn className="text-center">Rol</TableColumn>
          <TableColumn className="text-center">Consejo Comunal</TableColumn>
          <TableColumn className="text-center">Accion</TableColumn>
        </TableHeader>
        <TableBody
          items={data.pages[page]?.items || []}
          loadingContent={<CustomLoading />}
          loadingState={isLoading || isFetching ? "loading" : "idle"}
          emptyContent={""}
        >
          {(item) => (
            <TableRow key={item.id.toString()}>
              <TableCell className="border-b-2">
                <User
                  avatarProps={{ radius: "full", src: item.image || "" }}
                  description={item.username}
                  classNames={{
                    description: "text-default-500",
                    name: "capitalize",
                  }}
                  name={item.name + " " + item.lastName}
                >
                  {item.username}
                </User>
              </TableCell>
              <TableCell className="border-b-2 text-center">
                <Chip
                  className=" mx-auto cursor-default font-medium capitalize"
                  size="sm"
                  variant="flat"
                  color={statusColorMap[item.role_user]}
                >
                  {item.role_user === "ADMIN"
                    ? "Administrador"
                    : item.role_user === "LIDER_CALLE"
                    ? "Lider de calle"
                    : "Lider de comunidad"}
                </Chip>
              </TableCell>
              <TableCell className="border-b-2 text-center capitalize">
                {item.consejo?.id ? (
                  <Link
                    href={`/consejo-comunal/${
                      item.consejo.id?.toString() as unknown as number
                    }`}
                    className="font-medium "
                  >
                    <Chip size="md" variant="dot" color="success">
                      {item.consejo?.nombre_clap}
                    </Chip>
                  </Link>
                ) : item.role_user === "ADMIN" ? (
                  <Chip size="md" variant="dot" color="danger">
                    ADMIN
                  </Chip>
                ) : (
                  "No esta asociado."
                )}
              </TableCell>
              <TableCell className="border-b-2">
                <div className="relative flex items-center justify-end gap-3">
                  {item.role_user !== "ADMIN" && (
                    <>
                      <Tooltip
                        content="Cambiar rol"
                        className="bg-[#670378] text-white"
                      >
                        <span className="cursor-pointer text-lg text-red-600 active:opacity-50">
                          <RuleIcon
                            fill="#670378"
                            onClick={() => {
                              setChangeRole(item.id);
                            }}
                          />
                        </span>
                      </Tooltip>
                      <Tooltip
                        content="Unir a consejo comunal"
                        className="bg-[#0E793C] text-white"
                      >
                        <span className="cursor-pointer text-lg text-red-600 active:opacity-50">
                          <PeopleIcon
                            fill="#0E793C"
                            onClick={() => {
                              setChangeConsejo(item.id);
                            }}
                          />
                        </span>
                      </Tooltip>
                    </>
                  )}
                  <Tooltip content="Nueva contraseña" color="primary">
                    <span className="cursor-pointer text-lg text-blue-600 active:opacity-50">
                      <PasswordIcon
                        fill="#165ad0"
                        onClick={() => {
                          setChangePassword(item.id);
                        }}
                      />
                    </span>
                  </Tooltip>

                  <Tooltip content="Editar" color="secondary">
                    <span className="cursor-pointer text-lg text-purple-600 active:opacity-50">
                      <EditIcon
                        onClick={() => {
                          setOpenEditUser(item.username);
                        }}
                      />
                    </span>
                  </Tooltip>
                  <Tooltip color="danger" content="Eliminar">
                    <span className="cursor-pointer text-lg text-red-600 active:opacity-50">
                      <DeleteIcon onClick={() => setDeleteUser(item.id)} />
                    </span>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          )}
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
          refetch();
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

      <Modal
        aria-label="edit-role-form"
        isOpen={!!changeRole}
        size="lg"
        onClose={() => {
          setChangeRole("");
          refetch();
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
                <RoleForm handleSuccess={() => close()} userId={changeRole} />
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
