import { Button, Card, Grid, Input, Text } from "@nextui-org/react";
import { useForm, type SubmitHandler } from "react-hook-form";

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

  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    console.log(values);
    try {
      const post = await fetch("/api/auth/signin", {
        body: JSON.stringify(values),
        headers: {
          "content-type": "application/json",
        },
      });
      console.log(post);
    } catch (error) {
      setError("root", {
        message: "Error de servidor",
      });
      reset(
        { password: "", username: "", lastName: "", name: "" },
        { keepErrors: true }
      );
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
                required: { value: true, message: "campo requerido" },
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
                required: { value: true, message: "campo requerido" },
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
                required: { value: true, message: "campo requerido" },
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
                required: { value: true, message: "campo requerido" },
                minLength: { value: 8, message: "mínimo 8 caracteres" },
                pattern: {
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                  message:
                    "la contraseña debe contener al menos 8 caracteres, al menos una letra, un número y un carácter especial",
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
          type="submit"
          size="sm"
          css={{ ml: "auto" }}
          disabled={isSubmitting}
        >
          Registrarse
        </Button>
      </Card.Footer>
    </Card>
  );
};
