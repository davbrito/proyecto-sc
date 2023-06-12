import { Grid, Loading } from "@nextui-org/react";
import React from "react";

export const CustomLoading = () => {
  return (
    <Grid css={{
      width:"100%",
      textAlign:"center",
      justifyContent:"center",
      my:"1rem"
    }}>
      <Loading size="xl" type="points">
        Cargando...
      </Loading>
    </Grid>
  );
};
