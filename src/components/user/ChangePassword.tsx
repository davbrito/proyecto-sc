import { Button, Input } from "@nextui-org/react";
import React from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { api } from "~/utils/api";

export const ChangePassword = ({
  userId,
  handleSuccess,
}: {
  userId: string;
  handleSuccess?: () => void;
}) => {
  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<{ password: string }>();
  const { mutateAsync } = api.user.updatePassword.useMutation({
    onError(error) {
      if (error instanceof Error) {
        setError("root", { message: error.message });
      } else if (typeof error === "string") {
        setError("root", { message: error });
      }
    },
    onSuccess() {
      handleSuccess && handleSuccess();
    },
  });

  const onSubmit: SubmitHandler<{ password: string }> = async (value) => {
    await mutateAsync({ id: userId, newPassword: value.password });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <div className="grid gap-3">
        <Controller
          name="password"
          control={control}
          rules={{
            required: "La nueva contraseña es requerida",
            pattern: {
              value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).+$/,
              message:
                "Debe contener al menos una minuscula, una mayuscula y un numero.",
            },
            minLength: { value: 8, message: "Mínimo 8 caracteres." },
          }}
          render={({ field, fieldState }) => (
            <Input
              label="Nueva contraseña:"
              type="password"
              autoComplete="new-password"
              placeholder="Ingrese la nueva contraseña"
              {...field}
              errorMessage={fieldState.error?.message}
              isInvalid={fieldState.invalid}
            />
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
