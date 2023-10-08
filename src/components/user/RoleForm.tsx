import { Button, Select, SelectItem } from "@nextui-org/react";
import { ROLE } from "@prisma/client";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { api } from "~/utils/api";

interface Props {
  handleSuccess: () => void;
  userId: string;
}

export const RoleForm = ({ handleSuccess, userId }: Props) => {
  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting },
  } = useForm<{ role_user: ROLE }>();

  const { mutateAsync } = api.user.updateUserRole.useMutation({
    onError(error, variables, context) {
      if (error instanceof Error) {
        setError("role_user", { message: error.message });
      } else if (typeof error === "string") {
        setError("role_user", { message: error });
      }
    },
    onSuccess(data, variables, context) {
      handleSuccess();
    },
  });

  const onSubmit = handleSubmit(async (value) => {
    await mutateAsync({ id: userId, role: value.role_user });
  });

  return (
    <form onSubmit={onSubmit} className="">
      <div className="grid gap-3">
        <Controller
          name="role_user"
          control={control}
          rules={{
            required: "El rol del usuario es requerido",
          }}
          render={({ field, fieldState }) => (
            <Select
              label="Rol del usuario:"
              placeholder="Seleccione"
              {...field}
              errorMessage={fieldState.error?.message}
              isInvalid={fieldState.invalid}
              classNames={{
                value: "capitalize",
              }}
            >
              <SelectItem key={ROLE.ADMIN} className="capitalize">
                {ROLE.ADMIN}
              </SelectItem>

              <SelectItem key={ROLE.LIDER_COMUNIDAD} className="capitalize">
                {ROLE.LIDER_COMUNIDAD}
              </SelectItem>

              <SelectItem key={ROLE.LIDER_CALLE} className="capitalize">
                {ROLE.LIDER_CALLE}
              </SelectItem>
            </Select>
          )}
        />
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
