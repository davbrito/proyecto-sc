import { Button, Card, Input, Row, Spacer, Text } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

interface Inputs {
  username: string;
  password: string;
}

export const LoginForm = () => {
  const {
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    setError,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ password, username }) => {
    console.log({ username, password });

    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      console.log(res);
    } catch (error) {
      console.log(error);
      setError("root", {
        message: "Error de servidor",
      });
      reset({ password: "", username: "" }, { keepErrors: true });
    }
  };

  return (
    <Card
      as="form"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
    >
      <Card.Header>
        <Text h3>CENSO {new Date().getFullYear()}</Text>
      </Card.Header>
      <Card.Divider />
      <Card.Body className="flex flex-col gap-2">
        <Input
          type="text"
          label="Nombre de usuario:"
          placeholder="Escriba su nombre de usuario..."
          bordered
          {...register("username", {
            required: { value: true, message: "campo requerido" },
          })}
          helperText={errors.username?.message}
          helperColor="error"
        />
        <Spacer y={0.5} />
        <Input
          type="password"
          label="Contraseña:"
          placeholder="Escriba su contraseña..."
          bordered
          {...register("password", {
            required: { value: true, message: "campo requerido" },
          })}
          helperText={errors.password?.message}
          helperColor="error"
        />

        {errors.root && (
          <>
            <Spacer y={0.5} />
            <Text em color="error">
              {errors.root.message}
            </Text>
          </>
        )}
      </Card.Body>
      <Card.Divider />
      <Card.Footer>
        <Button
          size="sm"
          type="submit"
          css={{ ml: "auto" }}
          disabled={isSubmitting}
        >
          Log in
        </Button>
      </Card.Footer>
    </Card>
  );
};
