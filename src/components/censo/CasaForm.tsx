import { Button, Card, Grid, Input, Text } from "@nextui-org/react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { api } from "~/utils/api";

interface CasaProps {
  manzana: string;
  casa: string;
  calle: string;
  direccion: string;
}

interface JefeProps {
  nombres: string;
  apellidos: string;
  numeroDocumento: string;
  edad: number;
  fechaNacimiento: Date;
  genero: string;
  serialCarnetPatria: string;
  codCarnetPatria: string;
  observacion: string;
}

export const CasaForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CasaProps>();

  const { mutateAsync } = api.casa.createCasa.useMutation();

  const onSubmit: SubmitHandler<CasaProps> = async (values) => {
    try {
      mutateAsync(values, {
        onSuccess: () => {
          console.log("Chebere");
        },
        onError(error, variables, context) {
          console.log(error, variables, context);
        },
      });

      console.log(values);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      css={{ mw: "440px", mx: "auto" }}
    >
      <Card.Header>
        <Text h3>Datos de la vivienda</Text>
      </Card.Header>
      <Card.Divider />
      <Card.Body>
        <Grid.Container gap={2}>
          <Grid xs={12}>
            <Input
              fullWidth
              label="N° Calle:"
              placeholder="Escriba el numero de calle..."
              bordered
              type="text"
              {...register("calle", {
                required: { value: true, message: "Campo requerido" },
              })}
              helperText={errors.calle?.message}
              helperColor="error"
            />
          </Grid>
          <Grid xs={12}>
            <Input
              fullWidth
              label="N° Manzana:"
              placeholder="Escriba el numero de manzana..."
              bordered
              type="text"
              {...register("manzana", {
                required: { value: true, message: "Campo requerido" },
              })}
              helperText={errors.manzana?.message}
              helperColor="error"
            />
          </Grid>

          <Grid xs={12}>
            <Input
              fullWidth
              label="N° Casa:"
              placeholder="Escriba el numero de casa..."
              bordered
              type="text"
              {...register("casa", {
                required: { value: true, message: "Campo requerido" },
              })}
              helperText={errors.casa?.message}
              helperColor="error"
            />
          </Grid>
          <Grid xs={12}>
            <Input
              fullWidth
              label="Direccion:"
              placeholder="Escriba la direccion completa..."
              bordered
              type="text"
              {...register("direccion", {
                required: { value: true, message: "Campo requerido" },
              })}
              helperText={errors.direccion?.message}
              helperColor="error"
            />
          </Grid>
        </Grid.Container>
        <Card.Divider style={{ margin: "1rem 0" }} />
        <Button type="submit">Guardar</Button>
      </Card.Body>
    </Card>
  );
};
