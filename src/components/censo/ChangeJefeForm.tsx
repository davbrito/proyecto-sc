import { Button, Input, Select, SelectItem, Spinner } from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import { api } from "~/utils/api";
import { CustomLoading } from "../Loading";

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

export const ChangeJefeForm = ({ jefeId, closeModal }: Props) => {
  const { data } = api.familia.getByJefeId.useQuery({ id: jefeId });
  const { mutateAsync, isLoading } = api.jefe.changeJefe.useMutation();

  const {
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    control,
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

        closeModal();
      } catch (error) {
        if (error instanceof Error) {
          setError("root", { message: error.message });
        } else if (typeof error === "string") {
          setError("root", { message: error });
        }
      }
    }
  );

  if (isLoading) return <CustomLoading className="place-content-center" />;

  if (!data) return null;

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-2 grid grid-cols-1">
        <Controller
          control={control}
          name="familiarId"
          rules={{
            required: { message: "Es requerido", value: true },
          }}
          render={({ field, fieldState }) => (
            <Select
              {...field}
              label="Escoje el nuevo jefe de la familia:"
              placeholder="Seleccione una opcion"
              items={data}
              errorMessage={fieldState.error?.message}
              isInvalid={!!fieldState.error}
              onChange={(e) => {
                const selected = data.find(
                  (familiar) => familiar.id.toString() === e.target.value
                );

                if (selected?.numeroDocumento && selected.tipoDocumento) {
                  setValue("numeroDocumento", selected.numeroDocumento);
                  setValue("tipoDocumento", selected.tipoDocumento);
                  setValue("email", selected.email);
                  setValue("telefono", selected.telefono);
                } else {
                  setValue("numeroDocumento", "");
                  setValue("tipoDocumento", "");
                  setValue("email", "");
                  setValue("telefono", "");
                }
                field.onChange(e);
              }}
            >
              {({ apellidos, nombres, id }) => (
                <SelectItem key={id.toString()} className="uppercase">
                  {apellidos + " " + nombres}
                </SelectItem>
              )}
            </Select>
          )}
        />
      </div>

      <div className="my-2 grid grid-cols-12 gap-2">
        <div className="col-span-4">
          <Controller
            control={control}
            name="tipoDocumento"
            rules={{
              required: {
                message: "Este campo no puede estar vacio",
                value: true,
              },
            }}
            render={({ field, fieldState }) => (
              <Select
                label="Tipo documento:"
                placeholder="Seleccione una opcion"
                selectedKeys={field.value}
                {...field}
                isInvalid={!!fieldState.error}
                errorMessage={fieldState.error?.message}
              >
                <SelectItem key={"v"}>Venezolano</SelectItem>
                <SelectItem key={"e"}>Extranjero</SelectItem>
                <SelectItem key={"f"}>Firma</SelectItem>
              </Select>
            )}
          />
        </div>
        <div className="col-span-8">
          <Controller
            name="numeroDocumento"
            control={control}
            rules={{
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
            }}
            render={({ field, fieldState }) => (
              <Input
                fullWidth
                label="Cedula:"
                placeholder="Ejemplo: 1234578"
                type="text"
                {...field}
                isInvalid={!!fieldState.error}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
        </div>
      </div>

      <div className="my-2 grid grid-cols-12 gap-2">
        <div className="col-span-6">
          <Controller
            control={control}
            name="email"
            rules={{
              required: { message: "Campo requerido", value: true },
              pattern: {
                message: "El correo electronico no es valido.",
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              },
            }}
            render={({ field, fieldState }) => (
              <Input
                fullWidth
                label="Email:"
                {...field}
                placeholder="Ej: pedro"
                type="text"
                isInvalid={!!fieldState.error}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
        </div>
        <div className="col-span-6">
          <Controller
            control={control}
            name="telefono"
            rules={{
              required: { value: true, message: "Campo requerido" },
              pattern: {
                value: /^(0414|0424|0412|0416|0426)[-][0-9]{7}$/,
                message: "El numero no es valido.",
              },
            }}
            render={({ field, fieldState }) => (
              <Input
                fullWidth
                label="Telefono:"
                {...field}
                placeholder="Ej: pedro"
                type="text"
                isInvalid={!!fieldState.error}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
        </div>
      </div>

      {errors?.root && (
        <div className="my-1 capitalize text-red-700">
          {errors?.root?.message}
        </div>
      )}
      <Button
        fullWidth
        disabled={isLoading}
        type="submit"
        className="mx-auto mt-4 bg-orange-600 font-semibold text-white hover:bg-orange-700"
        spinner={<Spinner color="current" size="sm" />}
      >
        {isLoading ? "Cargando..." : "Cambiar jefe"}
      </Button>
    </form>
  );
};
