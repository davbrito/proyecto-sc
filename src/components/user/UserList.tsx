import {
  Button,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  User,
  type ButtonVariantProps,
  type ChipProps,
  type TooltipProps,
} from "@nextui-org/react";
import { type ROLE } from "@prisma/client";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { api, type RouterOutputs } from "~/utils/api";
import DeleteConfirmation from "../DeleteConfirmation";
import { CustomLoading } from "../Loading";
import { DeleteIcon } from "../icons/DeleteIcon";
import { EditIcon } from "../icons/EditIcon";
import { PasswordIcon } from "../icons/PasswordIcon";
import { PeopleIcon } from "../icons/PeopleIcon";
import { RuleIcon } from "../icons/RuleIcon";
import { EditForm } from "../profile/editForm";
import { ChangeConsejoComunal } from "./ChangeConsejoComunal";
import { ChangePassword } from "./ChangePassword";
import { RoleForm } from "./RoleForm";

type UserItem = RouterOutputs["user"]["getUsers"]["items"][0];

const statusColorMap: Record<ROLE, ChipProps["color"]> = {
  ADMIN: "danger",
  LIDER_COMUNIDAD: "primary",
  LIDER_CALLE: "success",
};

const LIMITS = 5;

export const UserList = () => {
  const {
    isLoading,
    data,
    refetch,
    fetchNextPage,
    isFetching,
    hasNextPage,
    isFetchingNextPage,
  } = api.user.getUsers.useInfiniteQuery(
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

  const [changeRole, setChangeRole] = useState<UserItem | null>(null);
  const [page, setPage] = useState(0);

  if (isLoading) return <CustomLoading />;

  if (!data) return null;

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
        classNames={{ wrapper: "min-h-[300px]" }}
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
          loadingState={
            isLoading ? "loading" : isFetchingNextPage ? "loadingMore" : "idle"
          }
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
                <div className="relative flex items-center justify-end gap-1">
                  {item.role_user !== "ADMIN" && (
                    <>
                      <ActionButton
                        title="Cambiar rol"
                        classNames={{
                          tooltip: "bg-[#670378] text-white",
                          button: "text-[#670378]",
                        }}
                        icon={<RuleIcon />}
                        onClick={() => {
                          setChangeRole(item);
                        }}
                      />
                      <ActionButton
                        title="Unir a consejo comunal"
                        classNames={{
                          tooltip: "bg-[#0E793C] text-white",
                          button: "text-[#0E793C]",
                        }}
                        icon={<PeopleIcon />}
                        onClick={() => {
                          setChangeConsejo(item.id);
                        }}
                      />
                    </>
                  )}

                  <ActionButton
                    title="Nueva contraseña"
                    tooltipColor="primary"
                    buttonColor="primary"
                    icon={<PasswordIcon />}
                    onClick={() => {
                      setChangePassword(item.id);
                    }}
                  />

                  <ActionButton
                    title="Editar"
                    tooltipColor="secondary"
                    buttonColor="secondary"
                    icon={<EditIcon />}
                    onClick={() => {
                      setOpenEditUser(item.username);
                    }}
                  />
                  <ActionButton
                    title="Eliminar"
                    tooltipColor="danger"
                    buttonColor="danger"
                    icon={<DeleteIcon />}
                    onClick={() => setDeleteUser(item.id)}
                  />
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
                    refetch();
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
          setChangeRole(null);
        }}
      >
        <ModalContent>
          {(close) => (
            <>
              <ModalHeader>
                <h2 className="mx-auto text-2xl font-bold">
                  Cambiar rol de usuario
                </h2>
              </ModalHeader>
              <ModalBody>
                {changeRole && (
                  <RoleForm
                    handleSuccess={() => {
                      refetch();
                      close();
                    }}
                    userId={changeRole.id}
                    initialRole={changeRole.role_user}
                  />
                )}
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

function ActionButton({
  icon,
  buttonColor,
  tooltipColor,
  onClick,
  title,
  classNames,
}: {
  icon: React.ReactNode;
  tooltipColor?: TooltipProps["color"];
  buttonColor?: ButtonVariantProps["color"];
  title: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  classNames?: {
    tooltip?: string;
    button?: string;
  };
}) {
  return (
    <Tooltip
      content={title}
      color={tooltipColor}
      className={classNames?.tooltip}
    >
      <Button
        color={buttonColor}
        isIconOnly
        className={clsx(classNames?.button, "text-lg")}
        variant="light"
        size="sm"
        onClick={onClick}
      >
        {icon}
      </Button>
    </Tooltip>
  );
}
