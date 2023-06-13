import {
  Button,
  Card,
  Grid,
  Input,
  Loading,
  Spacer,
  Text,
} from "@nextui-org/react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
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
    clearErrors,
  } = useForm<Inputs>();
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async ({ password, username }) => {
    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (res?.error) throw { message: res.error, status: res.status };
      router.push("/");
    } catch (error) {
      if (error) {
        const { message } = error as { message: string; status: number };

        setError("root", {
          message,
        });

        setTimeout(() => {
          //clearErrors("root");
        }, 3000);
      } else {
        setError("root", {
          message: "Server Error",
        });
      }

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
      <Card.Body>
        <Grid.Container gap={2}>
          <Grid xs={12}>
            <Input
              fullWidth
              type="text"
              label="Nombre de usuario:"
              placeholder="Escriba su nombre de usuario..."
              bordered
              {...register("username", {
                required: {
                  value: true,
                  message: "Se requiere del nombre de usuario.",
                },
              })}
              helperText={errors.username?.message}
              helperColor="error"
            />
          </Grid>
          <Spacer y={0.5} />
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
                  message: "Se requiere la contraseña.",
                },
              })}
              helperText={errors.password?.message}
              helperColor="error"
            />
          </Grid>

          {errors.root && (
            <Grid xs={12}>
              <Text
                em
                color="error"
                className="w-full rounded-md bg-red-600 bg-opacity-20 px-4 py-1 text-center font-semibold"
              >
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
          {isSubmitting && <Loading color={"secondary"} className="mx-4" />}
          <span>{isSubmitting ? " Cargando..." : "Iniciar sesion."}</span>
        </Button>
      </Card.Footer>
    </Card>
  );
};
