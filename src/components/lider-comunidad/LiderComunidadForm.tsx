import { Button, Select, SelectItem } from "@nextui-org/react";
import React from "react";
import { useForm } from "react-hook-form";
import { api } from "~/utils/api";
import { CustomLoading } from "../Loading";

interface Props {
  consejoId: number;
  onClose?: () => void;
}

interface LiderComunidadForm {
  jefeId: string;
}

export const LiderComunidadForm = ({ consejoId, onClose }: Props) => {
  const { data, isLoading } = api.jefe.getAll.useQuery({ consejoId });
  const createLiderComunidad = api.liderComunidad.create.useMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LiderComunidadForm>();

  const onSubmit = handleSubmit(async ({ jefeId }) => {
    await createLiderComunidad.mutateAsync(
      { jefeFamiliaId: parseInt(jefeId), consejoComunalId: consejoId },
      {
        onSuccess(data, variables, context) {
          onClose && onClose();
        },
        onError(error, variables, context) {
          setError("root", { message: error.message });
        },
      }
    );
  });

  if (isLoading) return <CustomLoading />;
  if (!data) return null;

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
            errorMessage={errors?.jefeId?.message}
            isInvalid={!!errors?.jefeId}
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
      </div>
      {errors.root && (
        <div className="col-span-12 mt-2 text-center">
          <em className="font-bold text-red-700">{errors.root.message}</em>
        </div>
      )}
      <Button color="primary" type="submit" className="mt-4 w-full">
        Convertir en lider de comunidad
      </Button>
    </form>
  );
};
