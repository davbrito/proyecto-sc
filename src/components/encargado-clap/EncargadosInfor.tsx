import {
  Card,
  CardBody,
  CardHeader,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import React, { useState } from "react";
import { EncargadoList } from "./EncargadoList";
import { EncargadoForm } from "./EncargadoForm";
import { api } from "~/utils/api";
import { CustomLoading } from "../Loading";
import { ErrorMessage } from "../ErrorMessage";

export const EncargadosInfor = ({ consejoId }: { consejoId: number }) => {
  const { data, isLoading, refetch, error, isFetching } =
    api.encargados.getByConsejoId.useQuery({
      id: consejoId,
    });

  const [isCreateEncargadoModal, setIsCreateEncargadoModal] = useState(false);

  return (
    <>
      <div className="container mx-auto">
        <Card className="my-4">
          <CardHeader className="relative">
            <h1 className="mx-auto flex-shrink text-center text-2xl font-medium">
              Ficha General del CLAP
            </h1>
            <button
              className=" h-fit w-fit rounded-md border-none bg-green-700 px-3 py-2 text-sm text-white transition-colors hover:bg-green-600"
              onClick={() => setIsCreateEncargadoModal(true)}
            >
              Añadir
            </button>
          </CardHeader>
          <CardBody>
            {isLoading && (
              <CustomLoading className="flex min-h-[20vh] items-center justify-center" />
            )}

            {error && (
              <div className="flex min-h-[40vh] place-content-center">
                <ErrorMessage
                  title="Error al recuperar la informacion de los encargados."
                  body="Revise su conexion de internet, e intente nuevamente."
                />
              </div>
            )}

            {data && data?.length === 0 && (
              <div className=" flex h-[20vh] items-center justify-center rounded-md border">
                <h2 className="text-2xl">No tiene personal registrado.</h2>
              </div>
            )}

            {data && data?.length > 0 && (
              <EncargadoList
                consejoId={consejoId}
                data={data}
                refreshData={refetch}
                isLoading={isFetching}
              />
            )}
          </CardBody>
        </Card>
      </div>
      <Modal
        aria-label="create-encargado-form"
        isOpen={isCreateEncargadoModal}
        size="2xl"
        scrollBehavior="inside"
        onClose={() => {
          setIsCreateEncargadoModal(false);
          refetch();
        }}
        placement="center"
      >
        <ModalContent>
          {(close) => (
            <>
              <ModalHeader>
                <h2 className="mx-auto text-2xl">Formulario de Encargado</h2>
              </ModalHeader>
              <ModalBody>
                <EncargadoForm
                  consejoId={consejoId}
                  closeModal={() => {
                    close();
                  }}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
