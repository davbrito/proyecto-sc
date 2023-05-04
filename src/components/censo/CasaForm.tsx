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

export const CasaForm = ({ register, errors }: any) => {
  return (
    <Grid.Container gap={2}>
      <Grid xs={4}>
        <Input
          fullWidth
          label="N° Calle:"
          placeholder="Escriba el numero de calle..."
          bordered
          type="text"
          {...register("casa.calle", {
            required: { value: true, message: "Campo requerido" },
          })}
          helperText={errors?.calle?.message}
          helperColor="error"
        />
      </Grid>
      <Grid xs={4}>
        <Input
          fullWidth
          label="N° Manzana:"
          placeholder="Escriba el numero de manzana..."
          bordered
          type="text"
          {...register("casa.manzana", {
            required: { value: true, message: "Campo requerido" },
          })}
          helperText={errors?.manzana?.message}
          helperColor="error"
        />
      </Grid>

      <Grid xs={4}>
        <Input
          fullWidth
          label="N° Casa:"
          placeholder="Escriba el numero de casa..."
          bordered
          type="text"
          {...register("casa.casa", {
            required: { value: true, message: "Campo requerido" },
          })}
          helperText={errors?.casa?.message}
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
          {...register("casa.direccion", {
            required: { value: true, message: "Campo requerido" },
          })}
          helperText={errors.direccion?.message}
          helperColor="error"
        />
      </Grid>
    </Grid.Container>
  );
};
