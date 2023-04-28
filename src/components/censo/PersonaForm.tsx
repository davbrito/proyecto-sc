import { Button, Card, Grid, Input, Text, Textarea } from "@nextui-org/react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { api } from "~/utils/api";

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

export const PersonaForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<JefeProps>();

  const persona = api.persona.createJefeFamilia.useMutation();

  const onSubmit: SubmitHandler<JefeProps> = async (values) => {
    try {
      // Guardar Casa
      persona.mutate(values, {
        onSuccess(data, variables, context) {
          console.log(data);
        },
        onError(error, variables, context) {
          console.log(error);
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card as="form" onSubmit={handleSubmit(onSubmit)}>
      <Card.Header>
        <Text h3 css={{ mx: "auto" }}>
          Datos personales del Jefe de Familia
        </Text>
      </Card.Header>
      <Card.Divider />
      <Card.Body>
        <Grid.Container gap={2}>
          <Grid xs={12}>
            <Input
              fullWidth
              label="Nombres:"
              placeholder="Escriba los nombres..."
              bordered
              type="text"
              {...register("nombres", {
                required: { value: true, message: "Campo requerido" },
              })}
              helperText={errors.nombres?.message}
              helperColor="error"
            />
          </Grid>
          <Grid xs={12}>
            <Input
              fullWidth
              label="Apellidos:"
              placeholder="Escriba los apellidos..."
              bordered
              type="text"
              {...register("apellidos", {
                required: { value: true, message: "Campo requerido" },
              })}
              helperText={errors.apellidos?.message}
              helperColor="error"
            />
          </Grid>

          <Grid xs={4}>
            <Input
              fullWidth
              label="Fecha de nacimiento:"
              placeholder="Ingrese la fecha de nacimiento..."
              bordered
              type="date"
              {...register("fechaNacimiento", {
                required: { value: true, message: "Campo requerido" },
              })}
              helperText={errors.fechaNacimiento?.message}
              helperColor="error"
            />
          </Grid>

          <Grid xs={4}>
            <Input
              fullWidth
              label="Edad:"
              placeholder="Escriba la edad..."
              bordered
              type="text"
              {...register("edad", {
                required: { value: true, message: "Campo requerido" },
              })}
              helperText={errors.edad?.message}
              helperColor="error"
            />
          </Grid>

          <Grid xs={4}>
            <Input
              fullWidth
              label="Genero:"
              placeholder="Ingrese el genero"
              bordered
              type="text"
              {...register("genero", {
                required: { value: true, message: "Campo requerido" },
              })}
              helperText={errors.genero?.message}
              helperColor="error"
            />
          </Grid>

          <Grid xs={3}>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-50 dark:text-white">
                Select an option
              </label>
              <select className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500">
                <option value={"v"}>Venezonalo</option>
                <option value={"e"}>Extranjero</option>
                <option value={"f"}>Firma</option>
              </select>
            </div>
          </Grid>

          <Grid xs={9}>
            <Input
              fullWidth
              label="Cedula:"
              placeholder="Escriba el numero de Cedula..."
              bordered
              type="text"
              {...register("numeroDocumento")}
              helperText={errors.numeroDocumento?.message}
              helperColor="error"
            />
          </Grid>

          <Grid xs={12}>
            <Textarea
              fullWidth
              label="Observacion:"
              placeholder="Escriba alguna observacion (opcional)"
              bordered
              {...register("observacion", {
                required: { value: true, message: "Campo requerido" },
              })}
              helperText={errors.observacion?.message}
              helperColor="error"
            />
          </Grid>

          <Grid xs={12}>
            <Input
              fullWidth
              label="Serial Carnet de la patria:"
              placeholder="Escriba el serial del carnet de la patria..."
              bordered
              type="text"
              {...register("serialCarnetPatria", {
                required: { value: true, message: "Campo requerido" },
              })}
              helperText={errors.serialCarnetPatria?.message}
              helperColor="error"
            />
          </Grid>

          <Grid xs={12}>
            <Input
              fullWidth
              label="Codigo del carnet de la patria:"
              placeholder="Escriba el codigo del carnet de la patria..."
              bordered
              type="text"
              {...register("codCarnetPatria", {
                required: { value: true, message: "Campo requerido" },
              })}
              helperText={errors.codCarnetPatria?.message}
              helperColor="error"
            />
          </Grid>
          <Card.Divider style={{ margin: "1rem 0" }} />
          <Grid css={{ mx: "auto" }}>
            <Button type="submit">Guardar</Button>
          </Grid>
        </Grid.Container>
      </Card.Body>
    </Card>
  );
};
