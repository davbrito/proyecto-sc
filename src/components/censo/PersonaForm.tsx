import { Button, Card, Grid, Input, Text, Textarea } from "@nextui-org/react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

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

  const onSubmit: SubmitHandler<JefeProps> = async (values) => {
    try {
      // Guardar Casa
      console.log(values);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card as="form" onSubmit={handleSubmit(onSubmit)}>
      <Card.Header>
        <Text h3>Datos personales</Text>
      </Card.Header>
      <Card.Divider />
      <Card.Body>
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

        <Input
          fullWidth
          label="Cedula:"
          placeholder="Escriba el numero de Cedula..."
          bordered
          type="text"
          {...register("numeroDocumento", {
            required: { value: true, message: "Campo requerido" },
          })}
          helperText={errors.numeroDocumento?.message}
          helperColor="error"
        />

        <Input
          fullWidth
          label="Observacion:"
          placeholder="Escriba alguna observacion (opcional)"
          bordered
          type="tex"
          {...register("observacion", {
            required: { value: true, message: "Campo requerido" },
          })}
          helperText={errors.observacion?.message}
          helperColor="error"
        />

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
        <Card.Divider style={{ margin: "1rem 0" }} />
        <Button type="submit">Guardar</Button>
      </Card.Body>
    </Card>
  );
};
