import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useCiudades } from "~/hooks/useCiudades";
import { api } from "~/utils/api";

interface FormState {
  nombre_consejo: string;
  nombre_clap: string;
  circuito: number;
  bms: string;
  comunidad: string;
  sector: string;
  cod_siscod: string;
  estado: string;
  municipio: string;
  parroquia: string;
  rif: string;
}

export const ConsejoForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormState>();
  const router = useRouter();

  const { estados, municipios, onChangeEstado, onMunicipioChange, parroquias } =
    useCiudades();

  const { mutate, isLoading } = api.consejo.create.useMutation();

  const onSubmit = handleSubmit(async (data, event) => {
    event?.preventDefault();

    mutate({ ...data, circuito: parseInt(data.circuito.toString()) });
    return router.push("/consejo-comunal");
  });

  return (
    <Card as="form" onSubmit={onSubmit}>
      <CardHeader>
        <h3 className="mx-auto text-4xl font-light">
          Datos del Consejo Comunal
        </h3>
      </CardHeader>

      <Divider />

      <CardBody>
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-6">
            <Input
              {...register("nombre_consejo", {
                required: { value: true, message: "El nombre es requerido" },
              })}
              id="nombre_consejo"
              fullWidth
              label="Nombre consejo comunal:"
              type="text"
              errorMessage={errors?.nombre_consejo?.message}
              isInvalid={!!errors?.nombre_consejo}
            />
          </div>
          <div className="col-span-6">
            <Input
              {...register("nombre_clap", {
                required: {
                  value: true,
                  message: "El nombre de CLAP es requerido",
                },
              })}
              id="nombre_clap"
              fullWidth
              label="Nombre CLAP:"
              type="text"
              errorMessage={errors?.nombre_consejo?.message}
              isInvalid={!!errors?.nombre_consejo}
            />
          </div>
          <div className="col-span-8">
            <Input
              {...register("comunidad", {
                required: { value: true, message: "La comunidad es requerido" },
              })}
              fullWidth
              label="Comunidad:"
              type="text"
              errorMessage={errors?.comunidad?.message}
              isInvalid={!!errors?.comunidad}
            />
          </div>

          <div className="col-span-4">
            <Input
              {...register("circuito", {
                required: { value: true, message: "El circuito es requerido" },
                pattern: {
                  value: /^\d+$/,
                  message: "El circuito debe ser un valor numerico",
                },
              })}
              id="circuito"
              fullWidth
              label="Circuito:"
              type="text"
              errorMessage={errors?.circuito?.message}
              isInvalid={!!errors?.circuito}
            />
          </div>
          <Divider className="my-6" />
          <div className="col-span-6">
            <Input
              {...register("sector", {
                required: { value: true, message: "El sector es requerido" },
              })}
              id="sector"
              fullWidth
              label="Sector:"
              type="text"
              errorMessage={errors?.sector?.message}
              isInvalid={!!errors?.sector}
            />
          </div>
          <div className="col-span-6">
            <Input
              {...register("rif", {
                required: {
                  value: true,
                  message: "El nro de RIF es requerido",
                },
                pattern: {
                  value: /^[0-9]{5,9}$/,
                  message: "El nro de RIF no es valido",
                },
              })}
              id="rif"
              fullWidth
              label="RIF:"
              type="text"
              errorMessage={errors?.rif?.message}
              isInvalid={!!errors?.rif}
            />
          </div>
          <div className="col-span-6">
            <Input
              {...register("bms")}
              id="bms"
              fullWidth
              label="BMS:"
              type="text"
              errorMessage={errors?.bms?.message}
              isInvalid={!!errors?.bms}
            />
          </div>
          <div className="col-span-6">
            <Input
              {...register("cod_siscod")}
              id="cod_siscod"
              fullWidth
              label="Codigo SISCOD:"
              type="text"
              errorMessage={errors?.nombre_consejo?.message}
              isInvalid={!!errors?.nombre_consejo}
            />
          </div>
          <Divider className="my-6" />

          <div className="col-span-4">
            <div className="w-full">
              <label className="mb-2 block text-sm font-medium text-gray-50 dark:text-white">
                Estado:
              </label>
              <select
                {...register("estado", {
                  required: { value: true, message: "El Estado es requerido" },
                })}
                className="select-form"
                onChange={onChangeEstado}
              >
                <option value="">Elija una opcion</option>
                {estados.map((ciudad) => (
                  <option value={ciudad.estado} key={ciudad.id_estado}>
                    {ciudad.estado}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="col-span-4">
            <div className="w-full">
              <label className="mb-2 block text-sm font-medium text-gray-50 dark:text-white">
                Municipio:
              </label>
              <select
                {...register("municipio", {
                  required: {
                    value: true,
                    message: "El municipio es requerido",
                  },
                })}
                className="select-form"
                onChange={onMunicipioChange}
              >
                <option value="">Elija una opcion</option>

                {municipios.map((mun) => (
                  <option value={mun.municipio} key={mun.municipio}>
                    {mun.municipio}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="col-span-4">
            <div className="w-full">
              <label className="mb-2 block text-sm font-medium text-gray-50 dark:text-white">
                Parroquia:
              </label>
              <select
                {...register("parroquia", {
                  required: {
                    value: true,
                    message: "La parroquia es requerido",
                  },
                })}
                className="select-form"
              >
                <option value="">Elija una opcion</option>

                {parroquias.map((par) => (
                  <option value={par} key={par}>
                    {par}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </CardBody>
      <Divider />

      <CardFooter className="py-6">
        <Button className="mx-auto" type="submit" disabled={isLoading}>
          Crear
        </Button>
      </CardFooter>
    </Card>
  );
};
