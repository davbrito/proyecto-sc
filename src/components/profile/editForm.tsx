import { Button, Input, Spacer } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { api } from "~/utils/api";
import { CustomLoading } from "../Loading";

interface FormProps {
  username: string;
  name: string;
  lastName: string;
}

interface EditFormProps {
  isModal?: boolean;
  handleSuccess?: () => void;
  username: string;
}

export const EditForm = ({
  isModal = false,
  handleSuccess,
  username,
}: EditFormProps) => {
  const { data, isLoading } = api.user.getByUsername.useQuery({ username });
  const router = useRouter();

  const mutation = api.user.updateDataInfoById.useMutation({
    onError(error) {
      if (error instanceof Error) {
        setError("username", { message: error.message });
      } else if (typeof error === "string") {
        setError("username", { message: error });
      }
    },
    onSuccess() {
      if (!isModal) router.push("/profile");
      else {
        handleSuccess && handleSuccess();
      }
    },
  });
  const onSubmit: SubmitHandler<FormProps> = async (value) => {
    await mutation
      .mutateAsync({ ...value, id: data?.id as string })
      .catch(() => {});
  };

  const {
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { isSubmitting, errors },
  } = useForm<FormProps>({
    values: useMemo(
      () => ({
        username: data?.username ?? "",
        name: data?.name ?? "",
        lastName: data?.lastName ?? "",
      }),
      [data]
    ),
    resetOptions: { keepDefaultValues: true },
  });

  if (isLoading) return <CustomLoading />;
  if (!data) return null;
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <div className="grid gap-3">
        <Controller
          name="username"
          control={control}
          rules={{ required: "El username es requerido" }}
          render={({ field, fieldState }) => (
            <Input
              label="Nombre de usuario:"
              type="text"
              {...field}
              onChange={(e) => {
                field.onChange(e);
                clearErrors("root");
              }}
              errorMessage={fieldState.error?.message}
              isInvalid={fieldState.invalid}
            />
          )}
        />
        <Controller
          name="name"
          control={control}
          rules={{ required: "El nombre es requerido" }}
          render={({ field, fieldState }) => (
            <Input
              label="Nombre:"
              type="text"
              {...field}
              errorMessage={fieldState.error?.message}
              isInvalid={fieldState.invalid}
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          rules={{ required: "El apellido es requerido" }}
          render={({ field, fieldState }) => (
            <Input
              label="Apellido:"
              type="text"
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
        <Button
          type="button"
          size="md"
          color="danger"
          onPress={() => {
            if (!isModal) return router.back();
            handleSuccess && handleSuccess();
          }}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
};
