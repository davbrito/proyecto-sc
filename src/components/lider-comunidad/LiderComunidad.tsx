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
import LiderComunidadList from "./LiderComunidadList";
import { LiderComunidadForm } from "./LiderComunidadForm";
import { type ROLE } from "@prisma/client";

interface Props {
  consejoId: number;
  role: ROLE;
}

const LiderComunidad = ({ consejoId, role }: Props) => {
  const [openJefeComunidad, setOpenJefeComunidad] = useState(false);

  return (
    <>
      <Card className="my-4">
        <CardHeader className="relative">
          <h1 className="mx-auto flex-shrink text-center text-2xl font-medium">
            Lideres de Comunidad
          </h1>
          {role === "ADMIN" && (
            <button
              onClick={() => {
                setOpenJefeComunidad(true);
              }}
              className="h-fit w-fit rounded-md border-none bg-green-700 px-3 py-2 text-sm text-white transition-colors hover:bg-green-600"
            >
              Añadir
            </button>
          )}
        </CardHeader>
        <CardBody>
          <LiderComunidadList role={role} consejoId={consejoId} />
        </CardBody>
      </Card>
      <Modal
        isOpen={openJefeComunidad}
        aria-label="create-jefe-comunidad-form"
        size="2xl"
        scrollBehavior="inside"
        onClose={() => {
          setOpenJefeComunidad(false);
        }}
        placement="center"
      >
        <ModalContent>
          {(close) => (
            <>
              <ModalHeader>
                <h2 className=" mx-auto text-2xl">
                  Seleccion de lider de comunidad
                </h2>
              </ModalHeader>
              <ModalBody>
                <LiderComunidadForm
                  consejoId={consejoId}
                  onClose={() => {
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

export default LiderComunidad;
