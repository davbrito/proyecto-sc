import {
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Input,
  Text,
} from "@nextui-org/react";
import { api } from "~/utils/api";
import { CustomLoading } from "../Loading";
import Image from "next/image";
import Link from "next/link";
import { type SubmitHandler, useForm } from "react-hook-form";
import { FormEvent } from "react";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";

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
    <>
      <Card
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        css={{
          backgroundColor: "$gray200",
          border: "$gray100",
          borderRadius: "$md",
          p: "$5",
          minWidth: "fit-content",
          width: "400px",

          "@smMin": {
            minWidth: "fit-content",
            width: "600px",
            p: "$8",
          },
        }}
      >
        <Card.Header>
          <Text h1>Actualizar Informacion</Text>
        </Card.Header>
        <Divider />
        <Card.Body>
          <Grid css={{ mx: "auto" }}>
            <Grid.Container lg={12} gap={1}>
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
          </Grid>
        </Card.Body>

        <Card.Footer css={{ flexDirection: "column", pt: 0 }}>
          <Button
            type="submit"
            disabled={isSubmitting}
            css={{ display: "block" }}
            size={"lg"}
          >
            Actualizar
          </Button>
        </Card.Footer>
      </Card>
    </>
  );
};
