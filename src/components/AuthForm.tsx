import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
  Spacer,
  Spinner,
} from "@nextui-org/react";
import { signIn } from "next-auth/react";
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
      onSubmit={handleSubmit(onSubmit)}
      className="container mx-auto max-w-md shadow-lg"
    >
      <CardHeader>
        <h2 className="text-2xl ">Censo {new Date().getFullYear()}</h2>
      </CardHeader>
      <Divider />
      <CardBody>
        <Input
          type="text"
          label="Nombre de usuario:"
          placeholder="Escriba su nombre de usuario..."
          {...register("username", {
            required: {
              value: true,
              message: "Se requiere del nombre de usuario.",
            },
          })}
          isInvalid={!!errors.username}
          errorMessage={errors.username?.message}
        />
        <Spacer y={4} />
        <Input
          type="password"
          isClearable
          label="Contraseña:"
          placeholder="Escriba su contraseña..."
          {...register("password", {
            required: {
              value: true,
              message: "Se requiere la contraseña.",
            },
          })}
          isInvalid={!!errors.password}
          errorMessage={errors.password?.message}
        />

        {errors.root && (
          <>
            <Spacer y={4} />
            <em className="w-full rounded-medium bg-danger px-4 py-2 text-center text-danger-foreground">
              {errors.root.message}
            </em>
          </>
        )}
      </CardBody>
      <Divider />
      <CardFooter>
        <Button
          color="primary"
          size="lg"
          type="submit"
          className="ml-auto hover:bg-blue-950"
          spinner={<Spinner color="current" size="sm" />}
          isLoading={isSubmitting}
        >
          {isSubmitting ? " Cargando..." : "Iniciar sesion"}
        </Button>
      </CardFooter>
    </Card>
  );
};
