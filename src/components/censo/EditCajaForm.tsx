import { Button, Card, Grid, Input, Loading, Text } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { api } from "~/utils/api";
import { parse } from "path";
import { setErrorMap } from "zod";

interface Props {
  censoId: string;
  closeModal?: () => void;
}

const EditCajaForm = ({ censoId, closeModal }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<{ cajas: string }>();

  const { mutateAsync, isError, isLoading } = api.censo.editCaja.useMutation();

  const onSubmit = handleSubmit(async ({ cajas }, event) => {
    event?.preventDefault();
    try {
      await mutateAsync({
        cajasPorAsignar: parseInt(cajas),
        censoId,
      });
      closeModal && closeModal();
    } catch (error) {
      if (error instanceof Error) {
        setError("root", { message: error.message });
      } else {
        setError("root", { message: "Ocurrio un error inesperado." });
      }
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <Text h2 className="mx-auto"></Text>

      <Grid.Container gap={2} css={{ mt: 0, pt: 0 }}>
        <Input
          label="Cajas asignadas:"
          fullWidth
          bordered
          type="number"
          {...register("cajas", {
            required: { value: true, message: "Campo requerido" },
          })}
          helperText={errors?.cajas?.message}
          helperColor="error"
        />
      </Grid.Container>

      {errors.root && (
        <Text
          color="error"
          h4
          css={{ textTransform: "capitalize", display: "inline-block" }}
          className="my-1"
        >
          {errors?.root?.message}.
        </Text>
      )}

      <Button
        type="submit"
        disabled={isLoading}
        className="mx-auto mt-4 hover:bg-blue-700"
      >
        Guardar
        {isSubmitting && (
          <Loading as={"span"} className="mx-4" color={"secondary"} />
        )}
      </Button>
    </form>
  );
};

export default EditCajaForm;
