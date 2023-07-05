import { Button, Card, Grid, Input, Loading, Text } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { api } from "~/utils/api";

interface Inputs {
  username: string;
  password: string;
  name: string;
  lastName: string;
}

export const RegisterForm = () => {
  const {
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    setError,
  } = useForm<Inputs>();

  const { mutateAsync } = api.user.create.useMutation();

  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    try {
      await mutateAsync(values);
      reset(
        { password: "", username: "", lastName: "", name: "" },
        { keepErrors: true }
      );

      await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: true,
        callbackUrl: "/",
      });
    } catch (error) {
      if (error instanceof Error) {
        setError("root", { message: error.message });
      }
    }
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <Card as="form" onSubmit={handleSubmit(onSubmit)}>
      <Card.Header>
        <Text h3>Register Form</Text>
      </Card.Header>
      <Card.Divider />
      <Card.Body>
        <Grid.Container gap={2}>
          <Grid xs={12}>
            <Input
              fullWidth
              label="Nombre de usuario:"
              placeholder="Escriba su nombre de usuario..."
              bordered
              {...register("username", {
                required: {
                  value: true,
                  message: "El campo de 'usuario' no puede estar vacio.",
                },
              })}
              helperText={errors.username?.message}
              helperColor="error"
            />
          </Grid>
          <Grid xs={6}>
            <Input
              fullWidth
              label="Nombre:"
              placeholder="Escriba su nombre..."
              bordered
              {...register("name", {
                required: {
                  value: true,
                  message: "El campo de 'nombre' no puede estar vacio.",
                },
              })}
              helperText={errors.name?.message}
              helperColor="error"
            />
          </Grid>
          <Grid xs={6}>
            <Input
              fullWidth
              label="Apellido:"
              placeholder="Escriba su apellido..."
              bordered
              {...register("lastName", {
                required: {
                  value: true,
                  message: "El campo de 'apellido' no puede estar vacio.",
                },
              })}
              helperText={errors.lastName?.message}
              helperColor="error"
            />
          </Grid>
          <Grid xs={12}>
            <Input
              fullWidth
              type="password"
              label="Contraseña:"
              placeholder="Escriba su contraseña..."
              bordered
              {...register("password", {
                required: {
                  value: true,
                  message: "El campo de 'contrasenia' no puede estar vacio.",
                },
                minLength: { value: 8, message: "Mínimo 8 caracteres." },
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).+$/,
                  message:
                    "Debe contener al menos una minuscula, una mayuscula y un numero.",
                },
              })}
              helperText={errors.password?.message}
              helperColor="error"
            />
          </Grid>
          {errors.root && (
            <Grid xs={12}>
              <Text em color="error">
                {errors.root.message}
              </Text>
            </Grid>
          )}
        </Grid.Container>
      </Card.Body>
      <Card.Divider />
      <Card.Footer>
        <Button
          size="lg"
          type="submit"
          css={{
            ml: "auto",
            "&:hover": {
              backgroundColor: "$primarySolidHover",
            },
          }}
          disabled={isSubmitting}
        >
          {isSubmitting && (
            <Loading as="span" color={"secondary"} className="mx-4" />
          )}
          <span>{isSubmitting ? " Cargando..." : "Registrate."}</span>
        </Button>
      </Card.Footer>
    </Card>
  );
};
