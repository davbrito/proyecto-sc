import { Grid, Input } from "@nextui-org/react";
import React from "react";

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
          helperText={errors?.casa?.calle?.message}
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
          helperText={errors?.casa?.manzana?.message}
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
          helperText={errors?.casa?.casa?.message}
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
          helperText={errors.casa?.direccion?.message}
          helperColor="error"
        />
      </Grid>
    </Grid.Container>
  );
};
