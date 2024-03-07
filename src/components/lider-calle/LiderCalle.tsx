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
import { api } from "~/utils/api";
import { CustomLoading } from "../Loading";
import LiderCalleList from "./LiderCalleList";
import { type ROLE } from "@prisma/client";
import { LiderCalleForm } from "./LiderCalleForm";

interface Props {
  consejoId: number;
  role: ROLE;
}

const LiderCalle = ({ consejoId, role }: Props) => {
  const {
    data: lideres,
    isLoading,
    refetch,
  } = api.lider.getAll.useQuery({
    consejoComunalId: consejoId,
  });
  const [openJefeCalle, setOpenJefeCalle] = useState(false);

  const totalCombos =
    lideres &&
    lideres.reduce(
      (prev, current) => {
        const prevCajasClaps = prev ? prev.cajasClaps : 0;
        const currentCajasClaps = current ? current.cajasClaps : 0;
        return { cajasClaps: prevCajasClaps + currentCajasClaps };
      },
      { cajasClaps: 0 }
    ).cajasClaps;

  return (
    <>
      <Card className="my-4">
        <CardHeader className="relative">
          <h1 className="mx-auto flex-shrink text-center text-2xl font-medium">
            Lideres de calle
          </h1>
          {role === "ADMIN" && (
            <button
              onClick={() => {
                setOpenJefeCalle(true);
              }}
              className="h-fit w-fit rounded-md border-none bg-green-700 px-3 py-2 text-sm text-white transition-colors hover:bg-green-600"
            >
              Añadir
            </button>
          )}
        </CardHeader>
        <CardBody>
          {isLoading ? (
            <CustomLoading />
          ) : (
            <>
              {lideres && lideres.length > 0 ? (
                <LiderCalleList
                  lideres={lideres}
                  role={role}
                  update={() => {
                    refetch();
                  }}
                />
              ) : (
                <div className="mx-auto  w-full place-content-center rounded-3xl border border-gray-400 px-6 py-10">
                  <h2 className="text-center text-2xl font-light">
                    Aun no se han registrados los jefes de calle.
                  </h2>
                </div>
              )}
            </>
          )}

          <div className="mt-2 text-center">
            <h4 className="mx-auto font-normal">
              TOTAL COMBOS: <span className="font-bold">{totalCombos}</span>
            </h4>
          </div>
        </CardBody>
      </Card>
      <Modal
        isOpen={openJefeCalle}
        aria-label="create-jefe-calle-form"
        size="2xl"
        scrollBehavior="inside"
        onClose={() => {
          setOpenJefeCalle(false);
        }}
        placement="center"
      >
        <ModalContent>
          {(close) => (
            <>
              <ModalHeader>
                <h2 className=" mx-auto text-2xl">
                  Seleccion de lider de calle
                </h2>
              </ModalHeader>
              <ModalBody>
                <LiderCalleForm
                  consejoId={consejoId}
                  onClose={() => {
                    close();
                    refetch();
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

export default LiderCalle;
