import { Grid, Input } from "@nextui-org/react";
import { type FieldErrors, type UseFormRegister ,  type UseFormWatch} from "react-hook-form";
import { type JefeProps } from "./GreatForm";

export const CasaForm = ({
  register,
  errors,
  watch
}: {
  register: UseFormRegister<JefeProps>;
  errors: FieldErrors<JefeProps>;
  watch: UseFormWatch<JefeProps>
}) => {

  return (
    <Grid.Container gap={2}>
      <Grid xs={4}>
        <Input
          autoFocus={false}
          fullWidth
          label="N° Calle:"
          placeholder="Escriba el numero de calle..."
          bordered
          {...register("casa.calle", {
            required: {
              message: "Este campo no puede estar vacio",
              value: true,
            },
          })}
          helperText={errors?.casa?.calle?.message}
          helperColor="error"
        />
      </Grid>
      <Grid xs={4}>
        <Input
          autoFocus={false}
          fullWidth
          label="N° Manzana:"
          placeholder="Escriba el numero de manzana..."
          bordered
          {...register("casa.manzana", {
            required: {
              message: "Este campo no puede estar vacio",
              value: true,
            },
          })}
          helperText={errors?.casa?.manzana?.message}
          helperColor="error"
        />
      </Grid>

      <Grid xs={4}>
        <Input
          fullWidth
          autoFocus={false}
          label="N° Casa:"
          placeholder="Escriba el numero de casa..."
          bordered
          {...register("casa.casa", {
            required: {
              message: "Este campo no puede estar vacio",
              value: true,
            },
          })}
          helperText={errors?.casa?.casa?.message}
          helperColor="error"
        />
      </Grid>
      
    </Grid.Container>
  );
};
