import {
  Button,
  Card,
  Divider,
  Grid,
  Input,
  Loading,
  Text,
  Textarea,
} from "@nextui-org/react";
import { type JefeFamilia } from "@prisma/client";
import React from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { api } from "~/utils/api";

interface EditJefe {
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  fechaNacimiento: string;
  genero: string;
  telefono: string;
  email: string;
  tipoDocumento: string;
  numeroDocumento: string;
  serialCarnetPatria: string;
  codCarnetPatria: string;
  observacion: string;
}

interface Props {
  jefe: JefeFamilia;
  onClose: () => void;
}

const JefeEditForm = ({ jefe, onClose }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<EditJefe>({
    defaultValues: {
      primerApellido: jefe.apellidos.split(" ")[0],
      segundoApellido: jefe.apellidos.split(" ")[1],
      primerNombre: jefe.nombres.split(" ")[0],
      segundoNombre: jefe.nombres.split(" ")[1],
      codCarnetPatria: jefe.codCarnetPatria,
      email: jefe.email,
      fechaNacimiento: jefe.fechaNacimiento?.toISOString()?.split("T")[0],
      genero: jefe.genero,
      numeroDocumento: jefe.genero,
      observacion: jefe.observacion,
      serialCarnetPatria: jefe.serialCarnetPatria,
      telefono: jefe.telefono,
      tipoDocumento: jefe.tipoDocumento,
    },
  });

  const updateJefe = api.jefe.update.useMutation();

  const onSubmit: SubmitHandler<EditJefe> = async (value, event) => {
    event?.preventDefault();

    await updateJefe.mutateAsync(
      {
        id: jefe.id,
        documentos: {
          numeroDocumento: value.numeroDocumento,
          tipoDocumento: value.tipoDocumento,
          codCarnetPatria: value.codCarnetPatria,
          observacion: value.observacion,
          serialCarnetPatria: value.serialCarnetPatria,
        },
        jefe: {
          email: value.email,
          fechaNacimiento: value.fechaNacimiento,
          genero: value.genero,
          primerApellido: value.primerApellido,
          primerNombre: value.primerNombre,
          segundoApellido: value.segundoApellido,
          segundoNombre: value.segundoNombre,
          telefono: value.telefono,
        },
      },
      {
        onSuccess(data, variables, context) {
          onClose();
        },
        onError(error, variables, context) {
          setError("root", { type: "validate", message: error.message });
        },
      }
    );
  };

  return (
    <Card as={"form"} onSubmit={handleSubmit(onSubmit)}>
      <Card.Header css={{ mt: 0, pt: 0 }}>
        <Text h2 className="mx-auto">
          {" "}
          Datos personales
        </Text>
      </Card.Header>
      <Card.Body css={{ mt: 0, pt: 0 }}>
        <Grid.Container gap={2} css={{ mt: 0, pt: 0 }}>
          <Grid xs={6}>
            <Input
              fullWidth
              label="Primer nombre:"
              placeholder="Ej: pedro"
              bordered
              type="text"
              {...register("primerNombre", {
                required: { value: true, message: "Campo requerido" },
                pattern: {
                  value:
                    /^(?=.{1,40}$)[a-zA-ZáéíóúüñÁÉÍÓÚÑ]+(?:[\s][a-zA-ZáéíóúüñÁÉÍÓÚÑ]+)*$/,
                  message: "El nombre no es valido",
                },
              })}
              helperText={errors?.primerNombre?.message}
              helperColor="error"
            />
          </Grid>

          <Grid xs={6}>
            <Input
              fullWidth
              label="Segundo nombre:"
              placeholder="Ej: jose"
              bordered
              type="text"
              {...register("segundoNombre", {
                required: { value: true, message: "Campo requerido" },
                pattern: {
                  value:
                    /^(?=.{1,40}$)[a-zA-ZáéíóúüñÁÉÍÓÚÑ]+(?:[\s][a-zA-ZáéíóúüñÁÉÍÓÚÑ]+)*$/,
                  message: "El nombre no es valido",
                },
              })}
              helperText={errors?.segundoNombre?.message}
              helperColor="error"
            />
          </Grid>

          <Grid xs={6}>
            <Input
              fullWidth
              label="Primer apellido:"
              placeholder="Ej: perez"
              bordered
              type="text"
              {...register("primerApellido", {
                required: { value: true, message: "Campo requerido" },
                pattern: {
                  value:
                    /^(?=.{1,40}$)[a-zA-ZáéíóúüñÁÉÍÓÚÑ]+(?:[\s][a-zA-ZáéíóúüñÁÉÍÓÚÑ]+)*$/,
                  message: "El apellido no es valido",
                },
              })}
              helperText={errors?.primerApellido?.message}
              helperColor="error"
            />
          </Grid>

          <Grid xs={6}>
            <Input
              fullWidth
              label="Segundo apellido:"
              placeholder="Ej: jimenez"
              bordered
              type="text"
              {...register("segundoApellido", {
                required: { value: true, message: "Campo requerido" },
                pattern: {
                  value:
                    /^(?=.{1,40}$)[a-zA-ZáéíóúüñÁÉÍÓÚÑ]+(?:[\s][a-zA-ZáéíóúüñÁÉÍÓÚÑ]+)*$/,
                  message: "El apellido no es valido",
                },
              })}
              helperText={errors?.segundoApellido?.message}
              helperColor="error"
            />
          </Grid>

          <Divider css={{ mt: "1rem" }} />

          <Grid xs={6}>
            <Input
              fullWidth
              label="Fecha de nacimiento:"
              placeholder="Ingrese la fecha de nacimiento..."
              bordered
              type="date"
              max={new Date().toISOString().split("T")[0]}
              {...register("fechaNacimiento", {
                required: { value: true, message: "Campo requerido" },
              })}
              helperText={errors?.fechaNacimiento?.message}
              helperColor="error"
            />
          </Grid>

          <Grid xs={6}>
            <div className="w-full">
              <label className="mb-2 block text-sm font-medium text-gray-50 dark:text-white">
                Genero:
              </label>
              <select
                {...register("genero", {
                  required: {
                    value: true,
                    message: "Este campo no puede estar vacio",
                  },
                })}
                className="select-form"
              >
                <option value="f">Femenino</option>
                <option value="m">Masculino</option>
              </select>
            </div>
          </Grid>

          <Grid xs={6}>
            <Input
              fullWidth
              label="Email:"
              placeholder="Ej: pedro@gmail.com"
              bordered
              type="text"
              {...register("email", {
                required: { value: true, message: "Campo requerido" },
                pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: "La direccion del correo no es valida.",
                },
              })}
              helperText={errors?.email?.message}
              helperColor="error"
            />
          </Grid>
          <Grid xs={6}>
            <Input
              fullWidth
              label="Numero de contacto:"
              placeholder="Ej: 0414-1234567"
              bordered
              type="text"
              {...register("telefono", {
                required: { value: true, message: "Campo requerido" },
                pattern: {
                  value: /^(0414|0424|0412|0416|0426)[-][0-9]{7}$/,
                  message: "El numero no es valido.",
                },
              })}
              helperText={errors?.telefono?.message}
              helperColor="error"
            />
          </Grid>
        </Grid.Container>
      </Card.Body>

      <Card.Header css={{ mt: 0, pt: 0 }}>
        <Text h2 className="mx-auto">
          Documentos personales
        </Text>
      </Card.Header>
      <Card.Body css={{ mt: 0, pt: 0 }}>
        <Grid.Container gap={2} css={{ mt: 0, pt: 0 }}>
          <Grid xs={4}>
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
          </Grid>
          <Grid xs={8}>
            <Input
              fullWidth
              label="Cedula:"
              placeholder="Ejemplo: 1234578"
              bordered
              type="text"
              {...register("numeroDocumento", {
                required: {
                  value: true,
                  message: "Este campo es obligatorio",
                },
                pattern: {
                  value: /^[0-9]*$/,
                  message:
                    "Debe escribirlo en el siguiente formato: '12345678'",
                },
                maxLength: {
                  value: 8,
                  message: "Corrija el numero de cedula por favor.",
                },
              })}
              helperText={errors?.numeroDocumento?.message}
              helperColor="error"
            />
          </Grid>
          <Grid xs={6}>
            <Input
              fullWidth
              label="Serial Carnet de la patria:"
              placeholder="Escriba el serial del carnet de la patria..."
              bordered
              type="text"
              {...register("serialCarnetPatria")}
              helperText={errors?.serialCarnetPatria?.message}
              helperColor="error"
            />
          </Grid>

          <Grid xs={6}>
            <Input
              fullWidth
              label="Codigo del carnet de la patria:"
              placeholder="Escriba el codigo del carnet de la patria..."
              bordered
              type="text"
              {...register("codCarnetPatria")}
              helperText={errors?.codCarnetPatria?.message}
              helperColor="error"
            />
          </Grid>

          <Grid xs={12}>
            <Textarea
              fullWidth
              label="Observacion:"
              placeholder="Escriba alguna observacion (opcional)"
              bordered
              {...register("observacion")}
              helperText={errors?.observacion?.message}
              helperColor="error"
            />
          </Grid>
        </Grid.Container>
      </Card.Body>
      <Card.Footer css={{ flexDirection: "column", pt: 0 }}>
        {errors?.root && (
          <Text
            color="error"
            h4
            css={{ textTransform: "capitalize", display: "inline-block" }}
          >
            {errors?.root?.message}.
          </Text>
        )}
        <Button
          type="submit"
          disabled={isSubmitting}
          css={{ width: "100%", margin: "8px 12px", mt: "0" }}
        >
          {isSubmitting && (
            <Loading as={"span"} className="mx-4" color={"secondary"} />
          )}
          Actualizar.
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default JefeEditForm;
