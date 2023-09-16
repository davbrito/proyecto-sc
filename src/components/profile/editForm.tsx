import {
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Input,
  Text,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { api } from "~/utils/api";
import { CustomLoading } from "../Loading";

interface FormProps {
  username: string;
  name: string;
  lastName: string;
}

export const EditForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormProps>();
  const { data, isLoading } = api.user.getById.useQuery();
  const { mutate } = api.user.updateDataInfoById.useMutation();
  const router = useRouter();
  const onSubmit: SubmitHandler<FormProps> = (value, event) => {
    event?.preventDefault();

    mutate(
      { ...value, id: data?.id as string },
      {
        onError(error, variables, context) {
          console.log(error);
        },
        onSuccess(data, variables, context) {
          console.log(data);
          router.push("/profile");
        },
      }
    );
  };

  if (isLoading) return <CustomLoading />;
  if (!data) return null;
  return (
    <Container>
      <Card
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto max-w-lg"
        css={{
          backgroundColor: "$gray200",
          border: "$gray100",
          borderRadius: "$md",
          p: "$5",
        }}
      >
        <Card.Header>
          <Text h1 className=" mx-auto  text-2xl font-light">
            Actualizar Informacion
          </Text>
        </Card.Header>
        <Divider />
        <Card.Body className="px-0 py-4 ">
          <Grid.Container>
            <Container>
              <Input
                fullWidth
                bordered
                label="Nombre de usuario:"
                type="text"
                initialValue={data.username}
                {...register("username", {
                  required: {
                    value: true,
                    message: "El parentesco es requerido",
                  },
                })}
              />
            </Container>
            <Container>
              <Input
                fullWidth
                bordered
                label="Nombre:"
                type="text"
                initialValue={data.name}
                {...register("name", {
                  required: {
                    value: true,
                    message: "El parentesco es requerido",
                  },
                })}
              />
            </Container>
            <Container>
              <Input
                fullWidth
                bordered
                label="Apellido:"
                type="text"
                initialValue={data.lastName}
                {...register("lastName", {
                  required: {
                    value: true,
                    message: "El parentesco es requerido",
                  },
                })}
              />
            </Container>
          </Grid.Container>
        </Card.Body>

        <Card.Footer
          css={{ flexDirection: "row", pt: 0 }}
          className="justify-center gap-4"
        >
          <Button
            type="submit"
            disabled={isSubmitting}
            css={{ display: "block" }}
            size={"md"}
            className="bg-blue-600 transition-all hover:bg-blue-700"
          >
            Actualizar
          </Button>
          <Button
            type="button"
            css={{ display: "block" }}
            size={"md"}
            className="bg-red-600 transition-all hover:bg-red-700"
            onPress={() => router.back()}
          >
            Cancelar
          </Button>
        </Card.Footer>
      </Card>
    </Container>
  );
};
