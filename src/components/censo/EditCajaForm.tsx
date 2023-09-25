import { Button, Card, Input, Spinner } from "@nextui-org/react";
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
      <h2 className="mx-auto"></h2>

      <div className="container">
        <Input
          label="Cajas asignadas:"
          fullWidth
          type="number"
          {...register("cajas", {
            required: { value: true, message: "Campo requerido" },
            min: { value: 0, message: "El numero debe ser natural" },
          })}
          isInvalid={!!errors?.cajas}
          errorMessage={errors?.cajas?.message}
        />
      </div>

      {errors.root && (
        <h4 className="my-1 capitalize text-red-700">
          {errors?.root?.message}.
        </h4>
      )}

      <Button
        fullWidth
        type="submit"
        disabled={isLoading}
        className="mx-auto mt-4 bg-blue-600 text-white hover:bg-blue-700"
      >
        Guardar
        {isSubmitting && <Spinner className="mx-4" color={"secondary"} />}
      </Button>
    </form>
  );
};

export default EditCajaForm;
