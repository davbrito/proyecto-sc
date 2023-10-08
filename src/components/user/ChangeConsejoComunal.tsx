import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import React from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { api } from "~/utils/api";
import { CustomLoading } from "../Loading";

interface Props {
  userId: string;
  handleSuccess: () => void;
}

export const ChangeConsejoComunal = ({ userId, handleSuccess }: Props) => {
  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<{ consejoId: string }>();

  const { data, isLoading } = api.consejo.getAll.useQuery();

  const { mutateAsync } = api.user.updateConsejo.useMutation({
    onError(error) {
      if (error instanceof Error) {
        setError("root", { message: error.message });
      } else if (typeof error === "string") {
        setError("root", { message: error });
      }
    },
    onSuccess() {
      handleSuccess();
    },
  });

  const onSubmit: SubmitHandler<{ consejoId: string }> = async (value) => {
    await mutateAsync({ consejoId: parseInt(value.consejoId), id: userId });
  };

  if (isLoading) return <CustomLoading />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <div className="grid gap-3">
        <Controller
          name="consejoId"
          control={control}
          rules={{
            required: "El consejo comunal es requerido",
          }}
          render={({ field, fieldState }) => (
            <Select
              label="Consejo Comunal:"
              placeholder="Seleccione un consejo"
              items={data}
              {...field}
              errorMessage={fieldState.error?.message}
              isInvalid={fieldState.invalid}
              classNames={{
                value: "capitalize",
              }}
            >
              {(item) => (
                <SelectItem key={item.id} className="capitalize">
                  {item.nombre_consejo + " - " + item.nombre_clap}
                </SelectItem>
              )}
            </Select>
          )}
        />

        {errors.root && (
          <>
            <em className="w-full rounded-medium bg-danger px-4 py-1 text-center text-danger-foreground">
              {errors.root.message}
            </em>
          </>
        )}
      </div>

      <div className="mt-3 flex justify-end gap-3">
        <Button
          type="submit"
          isLoading={isSubmitting}
          size={"md"}
          color="primary"
        >
          Actualizar
        </Button>
      </div>
    </form>
  );
};
