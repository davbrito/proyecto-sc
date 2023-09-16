import { Button, Card, Grid, Input, Text } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useCiudades } from "~/hooks/useCiudades";
import { api } from "~/utils/api";
import { useRouter } from "next/navigation";

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
      <Card.Header>
        <Text h3 css={{ mx: "auto" }} className="text-4xl font-light">
          Datos del Consejo Comunal
        </Text>
      </Card.Header>

      <Card.Divider />

      <Card.Body>
        <Grid.Container gap={2}>
          <Grid xs={6}>
            <Input
              {...register("nombre_consejo", {
                required: { value: true, message: "El nombre es requerido" },
              })}
              id="nombre_consejo"
              fullWidth
              label="Nombre consejo comunal:"
              bordered
              type="text"
              helperText={errors?.nombre_consejo?.message}
              helperColor="error"
            />
          </Grid>
          <Grid xs={6}>
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
              bordered
              type="text"
              helperText={errors?.nombre_consejo?.message}
              helperColor="error"
            />
          </Grid>
          <Grid xs={8}>
            <Input
              {...register("comunidad", {
                required: { value: true, message: "La comunidad es requerido" },
              })}
              fullWidth
              label="Comunidad:"
              bordered
              type="text"
              helperText={errors?.comunidad?.message}
              helperColor="error"
            />
          </Grid>
          <Grid xs={4}>
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
              bordered
              type="text"
              helperText={errors?.circuito?.message}
              helperColor="error"
            />
          </Grid>
          <Card.Divider css={{ my: "$6" }} />
          <Grid xs={6}>
            <Input
              {...register("sector", {
                required: { value: true, message: "El sector es requerido" },
              })}
              id="sector"
              fullWidth
              label="Sector:"
              bordered
              type="text"
              helperText={errors?.sector?.message}
              helperColor="error"
            />
          </Grid>
          <Grid xs={6}>
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
              bordered
              type="text"
              helperText={errors?.rif?.message}
              helperColor="error"
            />
          </Grid>
          <Grid xs={6}>
            <Input
              {...register("bms")}
              id="bms"
              fullWidth
              label="BMS:"
              bordered
              type="text"
              helperText={errors?.bms?.message}
              helperColor="error"
            />
          </Grid>
          <Grid xs={6}>
            <Input
              {...register("cod_siscod")}
              id="cod_siscod"
              fullWidth
              label="Codigo SISCOD:"
              bordered
              type="text"
              helperText={errors?.nombre_consejo?.message}
              helperColor="error"
            />
          </Grid>
          <Card.Divider css={{ my: "$6" }} />
          <Grid xs={4}>
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
          </Grid>
          <Grid xs={4}>
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
          </Grid>
          <Grid xs={4}>
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
          </Grid>
        </Grid.Container>
      </Card.Body>
      <Card.Divider />

      <Card.Footer className="py-6">
        <Button className="mx-auto" type="submit" disabled={isLoading}>
          Crear
        </Button>
      </Card.Footer>
    </Card>
  );
};
