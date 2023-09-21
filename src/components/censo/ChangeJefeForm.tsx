import { Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { api } from "~/utils/api";

interface Form {
  email: string;
  familiarId: string;
  telefono: string;
  tipoDocumento: string;
  numeroDocumento: string;
}

interface Props {
  jefeId: number;
  closeModal: () => void;
}

export const ChangeJefeForm = ({ jefeId }: Props) => {
  const { data } = api.familia.getByJefeId.useQuery({ id: jefeId });
  const { mutateAsync, isLoading } = api.jefe.changeJefe.useMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Form>();

  const onSubmit = handleSubmit(
    async (
      { email, familiarId, numeroDocumento, telefono, tipoDocumento },
      event
    ) => {
      event?.preventDefault();

      try {
        await mutateAsync({
          idFamiliar: parseInt(familiarId),
          idJefe: 1,
          newJefe: {
            email,
            numeroDocumento,
            telefono,
            tipoDocumento,
          },
        });
      } catch (error) {
        if (error instanceof Error) {
          setError("root", { message: error.message });
        } else if (typeof error === "string") {
          setError("root", { message: error });
        }
      }
    }
  );
  console.log(errors);

  return (
    <form onSubmit={onSubmit}>
      <h1 className="mx-auto text-center text-2xl font-light">
        Cambio de Jefe de familia
      </h1>
      <div>
        <label className="mb-2 block text-sm font-medium ">
          Escoje el nuevo jefe de la familia:
        </label>

        <select
          className="select-form uppercase"
          {...register("familiarId", {
            required: { message: "Es requerido", value: true },
          })}
        >
          <option value="">Seleccione una opcion porfavor</option>
          {data &&
            data.map(({ apellidos, nombres, id }) => (
              <option
                key={id.toString()}
                value={id.toString()}
                className="uppercase"
              >
                {apellidos} - {nombres}
              </option>
            ))}
        </select>
      </div>

      <div className="grid grid-cols-12 gap-1">
        <div className="col-span-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-50 dark:text-white">
              Tipo documento:
            </label>
            <select
              {...register("tipoDocumento", {
                required: {
                  message: "Este campo no puede estar vacio",
                  value: true,
                },
              })}
              className="select-form"
            >
              <option value={""} disabled>
                Seleccione una opcion
              </option>
              <option value={"v"}>Venezolano</option>
              <option value={"e"}>Extranjero</option>
              <option value={"f"}>Firma</option>
            </select>
          </div>
        </div>
        <div className="col-span-8">
          <Input
            fullWidth
            label="Cedula:"
            placeholder="Ejemplo: 1234578"
            type="text"
            {...register("numeroDocumento", {
              required: {
                value: true,
                message: "Este campo es obligatorio",
              },
              pattern: {
                value: /^[0-9]*$/,
                message: "Debe escribirlo en el siguiente formato: '12345678'",
              },
              maxLength: {
                value: 8,
                message: "Corrija el numero de cedula por favor.",
              },
            })}
            isInvalid={!!errors.numeroDocumento}
            errorMessage={errors.numeroDocumento?.message}
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-1">
        <div className="col-span-6">
          <Input
            fullWidth
            label="Email:"
            {...register("email", {
              required: { message: "Campo requerido", value: true },
              pattern: {
                message: "El correo electronico no es valido.",
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              },
            })}
            placeholder="Ej: pedro"
            type="text"
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
          />
        </div>
        <div className="col-span-6">
          <Input
            fullWidth
            label="Telefono:"
            {...register("telefono", {
              required: { value: true, message: "Campo requerido" },
              pattern: {
                value: /^(0414|0424|0412|0416|0426)[-][0-9]{7}$/,
                message: "El numero no es valido.",
              },
            })}
            placeholder="Ej: pedro"
            type="text"
            isInvalid={!!errors.telefono}
            errorMessage={errors.telefono?.message}
          />
        </div>
      </div>

      {errors?.root && (
        <div className="capitalize text-red-700">{errors?.root?.message}</div>
      )}
      <Button
        disabled={isLoading}
        type="submit"
        className="mx-auto mt-6 bg-orange-600 hover:bg-orange-700"
      >
        Cambiar jefe
      </Button>
    </form>
  );
};
