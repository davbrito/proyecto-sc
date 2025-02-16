import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useCiudades } from "~/hooks/useCiudades";
import { api } from "~/utils/api";

interface FormState {
  nombre_consejo: string;
  nombre_clap: string;
  circuito: string;
  bms: string;
  comunidad: string;
  sector: string;
  cod_siscod: string;
  estado: string;
  municipio: string;
  parroquia: string;
  rif: string;
}
interface Props {
  consejoId?: number
  onCloseModal?: () => void
}

export const ConsejoForm = ({ consejoId, onCloseModal }: Props) => {
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    control
  } = useForm<FormState>();
  const router = useRouter();

  const { data, isLoading: isLoadingQuery } = api.consejo.getById.useQuery(
    { id: consejoId || 0 },
    { enabled: !!consejoId, refetchOnWindowFocus: false, cacheTime: 60 * 60 } // Solo se ejecuta si hay un ID
  );

  const { estados, municipios, onChangeEstado, onMunicipioChange, parroquias } =
    useCiudades();

  const { mutate, isLoading } = api.consejo.create.useMutation();
  const updateConsejo = api.consejo.updateById.useMutation()

  const onSubmit = handleSubmit(async (data, event) => {
    event?.preventDefault();
    // const { parroquia, estado, municipio } = data
    if (consejoId) {
      await updateConsejo.mutateAsync({
        id: consejoId,
        data: {
          ...data,
          circuito: parseInt(data.circuito.toString()),
        }
      })

      onCloseModal && onCloseModal()
    } else {
      mutate({
        ...data,
        circuito: parseInt(data.circuito.toString()),
      });
      return router.push("/consejo-comunal");
    }

  });

  useEffect(() => {
    if (consejoId && data) {
      console.log("update");
      onChangeEstado(data.estado);
      setValue("estado", data.estado);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [consejoId]);

  useEffect(() => {
    if (municipios.length > 0 && data?.municipio) {
      onMunicipioChange(data.municipio);
      setValue("municipio", data.municipio);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [municipios]);

  useEffect(() => {
    if (parroquias.length > 0 && data?.parroquia) {
      setValue("parroquia", data.parroquia);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parroquias]);

  return (
    <Card as="form" onSubmit={onSubmit}>
      <CardHeader>
        <h3 className="mx-auto text-4xl font-light">
          {consejoId ? 'Editar datos del Consejo Comunal' : 'Datos del Consejo Comunal'}
        </h3>
      </CardHeader>

      <Divider />

      <CardBody>
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-6">
            <Controller
              name="nombre_consejo"
              control={control}
              defaultValue={data?.nombre_consejo || ""}
              rules={{ required: { value: true, message: "El nombre es requerido" } }}
              render={({ field, fieldState }) => <Input
                {...field}
                fullWidth
                label="Nombre consejo comunal:"
                type="text"
                errorMessage={fieldState.error?.message}
                isInvalid={fieldState.invalid}
              />}
            />
          </div>

          <div className="col-span-6">
            <Controller
              name="nombre_clap"
              control={control}
              rules={{ required: { value: true, message: "El nombre de CLAP es requerido" } }}
              defaultValue={data?.nombre_clap || ""}
              render={({ field, fieldState }) => <Input
                {...field}
                fullWidth
                label="Nombre CLAP:"
                type="text"
                errorMessage={fieldState.error?.message}
                isInvalid={fieldState.invalid}
              />}
            />
          </div>
          <div className="col-span-8">
            <Controller
              name="comunidad"
              control={control}
              rules={{
                required: { value: true, message: "La comunidad es requerido" },
              }}
              defaultValue={data?.comunidad || ""}
              render={({ fieldState, field }) => (<Input
                fullWidth
                label="Comunidad:"
                type="text"
                {...field}
                errorMessage={fieldState.error?.message}
                isInvalid={fieldState.invalid}
              />)}
            />
          </div>

          <div className="col-span-4">
            <Controller
              name="circuito"
              control={control}
              rules={{
                required: { value: true, message: "El circuito es requerido" },
                pattern: {
                  value: /^\d+$/,
                  message: "El circuito debe ser un valor numerico",
                },
              }}
              defaultValue={data?.circuito?.toString() || ""}
              render={({ field, fieldState }) => (
                <Input
                  fullWidth
                  label="Circuito:"
                  type="text"
                  {...field}
                  errorMessage={fieldState.error?.message}
                  isInvalid={fieldState.invalid}
                />)
              }
            />
          </div>

          <div className="col-span-6">
            <Controller
              name="sector"
              control={control}
              rules={{
                required: { value: true, message: "El sector es requerido" },
              }}
              defaultValue={data?.sector || ""}
              render={({ field, fieldState }) => (<Input
                fullWidth
                label="Sector:"
                type="text"
                {...field}
                errorMessage={fieldState.error?.message}
                isInvalid={fieldState.invalid}
              />)}
            />

          </div>
          <div className="col-span-6">
            <Controller
              name="rif"
              control={control}
              defaultValue={data?.rif || ""}
              rules={{
                required: {
                  value: true,
                  message: "El nro de RIF es requerido",
                },
                pattern: {
                  value: /^[0-9]{5,9}$/,
                  message: "El nro de RIF no es valido",
                },
              }}
              render={({ field, fieldState }) => (<Input
                fullWidth
                label="RIF:"
                type="text"
                {...field}
                errorMessage={fieldState.error?.message}
                isInvalid={fieldState.invalid}
              />)}
            />
          </div>
          <div className="col-span-6">
            <Controller
              name="bms"
              control={control}
              defaultValue={data?.bms || ""}
              render={({ field, fieldState }) => (<Input
                fullWidth
                label="BMS:"
                type="text"
                {...field}
                errorMessage={fieldState.error?.message}
                isInvalid={fieldState.invalid}
              />)}
            />
          </div>
          <div className="col-span-6">
            <Controller
              name="cod_siscod"
              control={control}
              defaultValue={data?.cod_siscod || ""}
              render={({ field, fieldState }) => (<Input
                fullWidth
                label="Codigo SISCOD:"
                type="text"
                {...field}
                errorMessage={fieldState.error?.message}
                isInvalid={fieldState.invalid}
              />)}
            />
          </div>

          <div className="col-span-4">
            <Controller
              name="estado"
              control={control}

              rules={{ required: { value: true, message: "El Estado es requerido" } }}

              render={({ field, fieldState }) => (
                <Select
                  label="Estado: "
                  items={estados}
                  {...field}
                  selectedKeys={field.value ? new Set([field.value]) : new Set()}
                  placeholder="Seleccione una opción"
                  errorMessage={fieldState.error?.message}
                  isInvalid={fieldState.invalid}
                  onChange={(event) => {
                    console.log("T")
                    field.onChange(event.target.value);
                    setValue("estado", event.target.value);
                    setValue("municipio", "");
                    setValue("parroquia", "");
                    onChangeEstado(event);
                  }}
                >
                  {(items) => (
                    <SelectItem key={items.estado} value={items.estado}>
                      {items.estado}
                    </SelectItem>
                  )}
                </Select>
              )}
            />
          </div>

          <div className="col-span-4">
            <Controller
              name="municipio"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "El municipio es requerido",
                },
              }}

              render={({ field, fieldState }) => (<Select
                label="Municipio: "
                items={municipios}
                placeholder="Seleccione una opcion"
                {...field}
                onChange={(event) => {
                  console.log("D")
                  field.onChange(event.target.value);
                  setValue("parroquia", "");
                  setValue("municipio", event.target.value);
                  onMunicipioChange(event);
                }}
                selectedKeys={field.value ? new Set([field.value]) : new Set()}
                errorMessage={fieldState.error?.message}
                isInvalid={fieldState.invalid}
              >
                {(items) => (
                  <SelectItem key={items.municipio} value={`${items.municipio}`}>
                    {items.municipio}
                  </SelectItem>
                )}
              </Select>)}
            />
          </div>

          <div className="col-span-4">
            <Controller
              name="parroquia"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "La parroquia es requerido",
                },
              }}
              render={({ field, fieldState }) => (<Select
                label="Parroquia: "
                items={parroquias}
                placeholder="Seleccione una opcion"
                {...field}
                selectedKeys={field.value ? new Set([field.value]) : new Set()}
                // errorMessage={errors.parroquia && errors.parroquia.message}
                errorMessage={fieldState.error?.message}
                isInvalid={fieldState.invalid}
              >
                {(item) => {
                  return (
                    <SelectItem key={item.nombre} value={item.nombre}>
                      {item.nombre}
                    </SelectItem>
                  );
                }}
              </Select>)}
            />
          </div>
        </div>
      </CardBody>
      <Divider />

      <CardFooter className="py-6">
        <Button
          fullWidth
          className={`mx-auto text-white ${consejoId ? 'bg-orange-600 hover:bg-orange-800' : 'bg-blue-600 hover:bg-blue-800'} disabled:bg-slate-600`}
          type="submit"
          disabled={isLoading}
        >
          {consejoId ? "Actualizar" : "Crear"}
        </Button>
      </CardFooter>
    </Card>
  );
};
