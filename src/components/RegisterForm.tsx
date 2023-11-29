import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
  Spinner,
} from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useForm, type SubmitHandler } from "react-hook-form";
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
      const user = await mutateAsync(values);

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
    <Card
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      className="container mx-auto max-w-lg shadow-lg"
    >
      <CardHeader>
        <h3 className="text-2xl">Formulario de registro.</h3>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12">
            <Input
              fullWidth
              label="Nombre de usuario:"
              placeholder="Escriba su nombre de usuario..."
              {...register("username", {
                required: {
                  value: true,
                  message: "El campo de 'usuario' no puede estar vacio.",
                },
              })}
              isInvalid={!!errors.username}
              errorMessage={errors.username?.message}
            />
          </div>
          <div className="col-span-6">
            <Input
              fullWidth
              label="Nombre:"
              placeholder="Escriba su nombre..."
              {...register("name", {
                required: {
                  value: true,
                  message: "El campo de 'nombre' no puede estar vacio.",
                },
              })}
              isInvalid={!!errors.name}
              errorMessage={errors.name?.message}
            />
          </div>
          <div className="col-span-6">
            <Input
              fullWidth
              label="Apellido:"
              placeholder="Escriba su apellido..."
              {...register("lastName", {
                required: {
                  value: true,
                  message: "El campo de 'apellido' no puede estar vacio.",
                },
              })}
              isInvalid={!!errors.lastName}
              errorMessage={errors.lastName?.message}
            />
          </div>
          <div className="col-span-12">
            <Input
              fullWidth
              type="password"
              autoComplete="new-password"
              label="Contraseña:"
              placeholder="Escriba su contraseña..."
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
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
            />
          </div>
          {errors.root && (
            <div className="col-span-12">
              <em className="font-bold text-red-700">{errors.root.message}</em>
            </div>
          )}
        </div>
      </CardBody>
      <Divider />
      <CardFooter>
        <Button
          size="lg"
          type="submit"
          className="ml-auto bg-blue-600 text-white hover:bg-blue-800 disabled:bg-slate-700  "
          disabled={isSubmitting}
        >
          {isSubmitting && (
            <Spinner as="span" color={"secondary"} className="mx-4" />
          )}
          <span>{isSubmitting ? " Cargando..." : "Registrate."}</span>
        </Button>
      </CardFooter>
    </Card>
  );
};
