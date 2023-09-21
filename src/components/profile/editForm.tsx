import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Spacer,
} from "@nextui-org/react";
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

export const EditForm = () => {
  const { data, isLoading } = api.user.getById.useQuery();
  const mutation = api.user.updateDataInfoById.useMutation({
    onError(error) {
      console.log(error);
    },
    onSuccess(data) {
      console.log(data);
      router.push("/profile");
    },
  });
  const router = useRouter();
  const onSubmit: SubmitHandler<FormProps> = async (value) => {
    await mutation
      .mutateAsync({ ...value, id: data?.id as string })
      .catch(() => {});
  };

  const {
    handleSubmit,
    control,
    register,
    formState: { isSubmitting },
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
    <div className="container">
      <Card
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto max-w-lg"
      >
        <CardHeader>
          <h2 className=" mx-auto  text-2xl font-bold">
            Actualizar Informacion
          </h2>
        </CardHeader>
        <CardBody className="grid gap-4">
          <Controller
            name="username"
            control={control}
            rules={{ required: "El username es requerido" }}
            render={({ field, fieldState }) => (
              <Input
                label="Nombre de usuario:"
                type="text"
                {...field}
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
        </CardBody>

        <CardFooter className="justify-end gap-3">
          <Button
            type="submit"
            isLoading={isSubmitting}
            size={"md"}
            color="primary"
          >
            Actualizar
          </Button>
          <Button type="button" size="md" onPress={() => router.back()}>
            Cancelar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
