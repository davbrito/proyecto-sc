import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
  Select,
  SelectItem,
  Spinner,
} from "@nextui-org/react";
import { ROLE } from "@prisma/client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import { api } from "~/utils/api";
import { CustomLoading } from "./Loading";

interface Inputs {
  username: string;
  password: string;
  name: string;
  lastName: string;
  role_user: ROLE;
  consejoId: string;
}

export const RegisterForm = () => {
  const {
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    setError,
    control,
  } = useForm<Inputs>();
  const router = useRouter();
  const { mutateAsync } = api.user.create.useMutation();
  const { data, isLoading } = api.consejo.getAll.useQuery();

  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    try {
      const user = await mutateAsync({
        ...values,
        consejoId: parseInt(values.consejoId),
      });

      reset(
        { password: "", username: "", lastName: "", name: "" },
        { keepErrors: true }
      );

      router.push("/users");
    } catch (error) {
      if (error instanceof Error) {
        setError("root", { message: error.message });
      }
    }
  };

  const userRoles = [
    { value: ROLE.ADMIN, label: "Administrador" },
    { value: ROLE.LIDER_COMUNIDAD, label: "Lider de comunidad" },
    { value: ROLE.LIDER_CALLE, label: "Lider de calle" },
  ];

  if (isLoading) return <CustomLoading />;

  return (
    <Card
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      className="container mx-auto max-w-lg shadow-lg"
    >
      <CardHeader>
        <h3 className="text-2xl">Formulario de registro de usuario.</h3>
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

          <div className="col-span-4">
            <Controller
              name="role_user"
              control={control}
              rules={{
                required: "El rol del usuario es requerido",
              }}
              render={({ field: { value, ...field }, fieldState }) => (
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
                  {userRoles.map(({ value, label }) => (
                    <SelectItem
                      key={value}
                      value={value}
                      className="capitalize"
                    >
                      {label}
                    </SelectItem>
                  ))}
                </Select>
              )}
            />
          </div>
          <div className="col-span-8">
            <Controller
              name="consejoId"
              control={control}
              rules={{
                required: "El consejo comunal es requerido",
              }}
              render={({ field, fieldState }) => (
                <Select
                  isLoading={isLoading}
                  label="Consejo Comunal:"
                  placeholder="Seleccione un consejo"
                  items={data}
                  {...field}
                  errorMessage={fieldState.error?.message}
                  isInvalid={fieldState.invalid}
                >
                  {(item) => (
                    <SelectItem
                      key={item.id}
                      value={item.id}
                      className="capitalize"
                    >
                      {item.nombre_consejo + " - " + item.nombre_clap}
                    </SelectItem>
                  )}
                </Select>
              )}
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
