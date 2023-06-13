import { Button, Card, Input, Spacer, Text } from "@nextui-org/react";
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
      <Card.Body className="flex flex-col gap-2">
        <Input
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
        <Spacer y={0.5} />
        <Input
          type="password"
          label="Contraseña:"
          placeholder="Escriba su contraseña..."
          bordered
          {...register("password", {
            required: { value: true, message: "Se requiere la contraseña." },
          })}
          helperText={errors.password?.message}
          helperColor="error"
        />

        {errors.root && (
          <>
            <Text
              em
              color="error"
              className="rounded-md bg-red-600 bg-opacity-20 px-4 py-1 font-semibold"
            >
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
