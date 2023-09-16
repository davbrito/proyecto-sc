import { Grid, Loading } from "@nextui-org/react";
import React from "react";

interface Props {
  className?: string;
}
export const CustomLoading = ({ className }: Props) => {
  return (
    <Grid.Container
      css={{
        width: "100%",
        textAlign: "center",
        my: "1rem",
      }}
      className={className}
    >
      <Loading size="xl" type="points">
        Cargando...
      </Loading>
    </Grid.Container>
  );
};
