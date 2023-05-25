import { Grid, Loading } from "@nextui-org/react";
import React from "react";

export const CustomLoading = () => {
  return (
    <Grid>
      <Loading size="xl" type="points">
        Cargando...
      </Loading>
    </Grid>
  );
};
