import { Select, SelectItem, Button } from "@nextui-org/react";
import { String } from "lodash";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "~/utils/api";

interface Props {
  consejoId: number;
  onClose?: () => void;
}

interface Casa {
  id: bigint;
  calle: string;
  manzana: string;
}

interface JefeCalleProps {
  casaId: number;
  jefeId: number;
}

export const LiderCalleForm = ({ consejoId, onClose }: Props) => {
  const { data } = api.jefe.getAll.useQuery({ consejoId, casas: true });
  const { data: casas } = api.casa.getAllByConsejoId.useQuery({ consejoId });
  const convertJefeCalle = api.lider.create.useMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<JefeCalleProps>();

  if (!data) return null;
  if (!casas) return null;

  const listaCasas = [...new Set(casas.map((casa) => casa?.manzana))].map(
    (manzana) => casas.find((casa) => casa?.manzana === manzana)
  );

  const onSubmit = handleSubmit(async ({ casaId, jefeId }) => {
    const casa = casas.find((casa) => casa?.id === BigInt(casaId));
    if (!casa) return;
    try {
      await convertJefeCalle.mutateAsync(
        {
          jefeId: BigInt(jefeId),
          consejoComunalId: consejoId,
          manzana: casa.manzana,
        },
        {
          onSuccess(data, variables, context) {
            onClose && onClose();
          },
          onError(error, variables, context) {
            setError("root", { message: error.message });
          },
        }
      );
    } catch (error) {}
  });

  return (
    <form onSubmit={onSubmit} className="py-4">
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-6">
          <Select
            {...register("jefeId", {
              required: "Necesitas seleccionar un jefe",
            })}
            items={data}
            placeholder="Seleccione una opcion"
            label="Seleccione un jefe:"
            isInvalid={!!errors.jefeId}
            errorMessage={errors.jefeId?.message}
          >
            {({ id, nombres, apellidos, tipoDocumento, numeroDocumento }) => (
              <SelectItem key={id.toString()}>
                {(
                  nombres +
                  " " +
                  apellidos +
                  " " +
                  tipoDocumento +
                  "-" +
                  numeroDocumento
                ).toUpperCase()}
              </SelectItem>
            )}
          </Select>
        </div>
        <div className="col-span-6">
          {listaCasas.length > 0 && (
            <Select
              items={listaCasas as Casa[]}
              {...register("casaId", {
                required: "Necesitas seleccionar una manzana",
              })}
              placeholder="Seleccione una opcion"
              label="Seleccione una casa:"
            >
              {({ id, manzana }) => (
                <SelectItem key={id.toString()}>
                  {("Mza: " + manzana).toUpperCase()}
                </SelectItem>
              )}
            </Select>
          )}
        </div>
      </div>
      {errors.root && (
        <div className="col-span-12 mt-2 text-center">
          <em className="font-bold text-red-700">{errors.root.message}</em>
        </div>
      )}
      <Button color="primary" type="submit" className="mt-4 w-full">
        Convertir en jefe de calle
      </Button>
    </form>
  );
};
