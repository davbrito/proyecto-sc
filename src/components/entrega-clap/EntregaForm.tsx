import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Divider,
  Input,
  Select,
  SelectItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { type ROLE } from "@prisma/client";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { api } from "~/utils/api";

interface Row {}

interface PropsForm {
  jefeFamiliaIds: boolean[];
  costeCajaTotal: string;
  costeCajaUnidad: string;
  costeTransporteUnidad: string;
  costeTransporteTotal: string;
  costeLogisticaTotal: string;
  costeLogisticaUnidad: string;
  fechaEntrega: string;
  consejoComunalId?: string;
}

interface Props {
  role_user: ROLE;
  consejoId: number;
}

export const EntregaForm = ({ consejoId, role_user }: Props) => {
  const { data } = api.jefe.getJefesToEntrega.useQuery({ consejoId });
  const createEntrega = api.entrega.create.useMutation();
  const { data: consejos } = api.consejo.getAll.useQuery();

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<PropsForm>();

  const onSubmit = handleSubmit(async (formData, event) => {
    event?.preventDefault();

    const censadosSeleccionados = buscarRegistrosValidos(
      data,
      formData.jefeFamiliaIds
    );

    if (censadosSeleccionados.length === 0) {
      return setError("root", {
        message: "Debe seleccionar al menos un censado",
      });
    }

    const consejoComunalId = formData.consejoComunalId
      ? parseInt(formData?.consejoComunalId)
      : consejoId;

    await createEntrega.mutateAsync(
      {
        censadosIds: censadosSeleccionados.map((censado) => censado.id),
        entrega: {
          costeCajaUnidad: parseFloat(formData.costeCajaUnidad),
          costeLogistica: parseFloat(formData.costeLogisticaUnidad),
          costeTransporte: parseFloat(formData.costeTransporteUnidad),
          fechaEntrega: formData.fechaEntrega,
        },
        consejoComunalId,
      },
      {
        onSuccess(data, variables, context) {},
        onError(error, variables, context) {
          setError("root", { type: "validate", message: error.message });
        },
      }
    );
  });

  const buscarRegistrosValidos = (registros: any, validos: boolean[]) => {
    const entrega = [];
    const validados = validos.slice(1);
    for (let i = 0; i < registros.length; i++) {
      if (validados[i]) {
        entrega.push(registros[i]);
      }
    }
    return entrega;
  };

  const actualizarCostosUnidad = (censados: number) => {
    setValue(
      "costeCajaUnidad",
      (parseFloat(watch("costeCajaTotal")) * censados).toString()
    );
    setValue(
      "costeLogisticaUnidad",
      (parseFloat(watch("costeLogisticaTotal")) * censados).toString()
    );
    setValue(
      "costeTransporteUnidad",
      (parseFloat(watch("costeTransporteTotal")) * censados).toString()
    );
  };

  const contar = (validos: boolean[]) => {
    let count = 0;
    for (let i = 0; i < validos.length; i++) {
      if (validos[i]) {
        count++;
      }
    }
    return count;
  };

  if (!data) return null;

  return (
    <Card as="form" onSubmit={onSubmit} className="container mx-auto my-4">
      <CardHeader>
        <h3 className="mx-auto text-4xl font-light">
          Datos de la entrega de caja CLAP
        </h3>
      </CardHeader>

      <CardBody>
        <div>
          <div className="rounded-lg border">
            <Table aria-label="Example table with dynamic content">
              <TableHeader>
                <TableColumn className="w-[250px] ">
                  Nombres y Apellidos
                </TableColumn>
                <TableColumn className="w-[50px]">Casa</TableColumn>
                <TableColumn className="w-[50px]">Manzana</TableColumn>
                <TableColumn className="w-[150px]">Cajas asignadas</TableColumn>
                <TableColumn className="w-[32px]">Validar</TableColumn>
              </TableHeader>
              <TableBody>
                {data.map(({ id, jefeFamilia, cajasClapsPorRecibir }) => (
                  <TableRow key={id} className="uppercase">
                    <TableCell className="align-middle">
                      {jefeFamilia?.nombres + " " + jefeFamilia?.apellidos}
                    </TableCell>
                    <TableCell className="align-middle">
                      {jefeFamilia?.casa?.casa}
                    </TableCell>
                    <TableCell className="align-middle">
                      {jefeFamilia?.casa?.manzana}
                    </TableCell>
                    <TableCell className="align-middle">
                      {cajasClapsPorRecibir}
                    </TableCell>
                    <TableCell className="text-center align-middle">
                      <Controller
                        control={control}
                        name={`jefeFamiliaIds.${parseInt(
                          jefeFamilia?.id?.toString() ?? "0"
                        )}`}
                        render={({ field, fieldState }) => (
                          <Checkbox
                            id={field.name}
                            onChange={(e) => {
                              field.onChange(e);
                              const censados = buscarRegistrosValidos(
                                data,
                                watch("jefeFamiliaIds")
                              );
                              const total: number = censados.reduce(
                                (prev, censado) =>
                                  prev + censado.cajasClapsPorRecibir,
                                0
                              );

                              actualizarCostosUnidad(total);
                            }}
                          />
                        )}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <Divider className="my-4" />

        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-8 mb-2">
            <Controller
              name="fechaEntrega"
              control={control}
              rules={{ required: "La fecha es requerida" }}
              render={({ field, fieldState }) => (
                <Input
                  label="Fecha de entrega"
                  type="date"
                  placeholder="Ingrese la fecha de entrega"
                  fullWidth
                  {...field}
                  errorMessage={fieldState.error?.message}
                  isInvalid={!!fieldState.error}
                />
              )}
            />
          </div>

          {role_user === "ADMIN" && (
            <div className="col-span-4 mb-2">
              <Controller
                name="consejoComunalId"
                control={control}
                rules={{ required: "El consejo comunal es requerido" }}
                render={({ field, fieldState }) => (
                  <Select
                    label="Consejo comunal"
                    placeholder="Seleccione"
                    fullWidth
                    {...field}
                    items={consejos}
                    errorMessage={fieldState.error?.message}
                    isInvalid={fieldState.invalid}
                    classNames={{
                      value: "capitalize",
                    }}
                  >
                    {({ id, nombre_clap, nombre_consejo }) => (
                      <SelectItem key={id} value={id} className="capitalize">
                        {nombre_consejo + " " + nombre_clap}
                      </SelectItem>
                    )}
                  </Select>
                )}
              />
            </div>
          )}

          <div className="col-span-6">
            <Controller
              name="costeCajaTotal"
              control={control}
              rules={{ required: "El costo total es requerido" }}
              render={({ field, fieldState }) => (
                <Input
                  fullWidth
                  label="Costo de caja (total):"
                  placeholder="0.00"
                  type="number"
                  {...field}
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-small text-default-400">Bs.</span>
                    </div>
                  }
                  onChange={(e) => {
                    field.onChange(e);
                    const censados = buscarRegistrosValidos(
                      data,
                      watch("jefeFamiliaIds")
                    );
                    const total: number = censados.reduce(
                      (prev, censado) => prev + censado.cajasClapsPorRecibir,
                      0
                    );

                    actualizarCostosUnidad(total);
                  }}
                  errorMessage={fieldState.error?.message}
                  isInvalid={!!fieldState.error}
                />
              )}
            />
          </div>
          <div className="col-span-6">
            <Controller
              name="costeCajaUnidad"
              control={control}
              render={({ field }) => (
                <Input
                  type="number"
                  label="Costo de caja (unidad):"
                  fullWidth
                  isDisabled
                  {...field}
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-small text-default-400">Bs.</span>
                    </div>
                  }
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
              )}
            />
          </div>

          <div className="col-span-6">
            <Controller
              name="costeTransporteTotal"
              control={control}
              rules={{ required: "El costo total del transporte es requerido" }}
              render={({ field, fieldState }) => (
                <Input
                  label="Costo de transporte (total):"
                  fullWidth
                  placeholder="0.00"
                  type="number"
                  {...field}
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-small text-default-400">Bs.</span>
                    </div>
                  }
                  onChange={(e) => {
                    field.onChange(e);
                    const censados = buscarRegistrosValidos(
                      data,
                      watch("jefeFamiliaIds")
                    );
                    const total: number = censados.reduce(
                      (prev, censado) => prev + censado.cajasClapsPorRecibir,
                      0
                    );

                    actualizarCostosUnidad(total);
                  }}
                  errorMessage={fieldState.error?.message}
                  isInvalid={!!fieldState.error}
                />
              )}
            />
          </div>

          <div className="col-span-6">
            <Controller
              name="costeTransporteUnidad"
              control={control}
              render={({ field, fieldState }) => (
                <Input
                  type="number"
                  label="Costo de transporte (unidad):"
                  fullWidth
                  isDisabled
                  {...field}
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-small text-default-400">Bs.</span>
                    </div>
                  }
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
              )}
            />
          </div>

          <div className="col-span-6">
            <Controller
              name="costeLogisticaTotal"
              control={control}
              render={({ field }) => (
                <Input
                  label="Coste Logistica Total"
                  fullWidth
                  placeholder="0.00"
                  type="number"
                  {...field}
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-small text-default-400">Bs.</span>
                    </div>
                  }
                  onChange={(e) => {
                    field.onChange(e);
                    const censados = buscarRegistrosValidos(
                      data,
                      watch("jefeFamiliaIds")
                    );
                    const total: number = censados.reduce(
                      (prev, censado) => prev + censado.cajasClapsPorRecibir,
                      0
                    );

                    actualizarCostosUnidad(total);
                  }}
                />
              )}
            />
          </div>

          <div className="col-span-6">
            <Controller
              name="costeLogisticaUnidad"
              control={control}
              render={({ field }) => (
                <Input
                  label="Coste Logistica (Unidad)"
                  fullWidth
                  isDisabled
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-small text-default-400">Bs.</span>
                    </div>
                  }
                  placeholder="0.00"
                  type="number"
                  {...field}
                />
              )}
            />
          </div>
        </div>
        <div className="mx-auto mt-2 flex w-fit flex-col gap-3">
          {errors?.root && (
            <h4 className="inline-block capitalize text-red-600">
              {errors?.root?.message}.
            </h4>
          )}
          <Button
            disabled={isSubmitting}
            type="submit"
            className=" mt-2 bg-blue-600 text-white hover:bg-blue-800 disabled:bg-gray-600"
            size={"lg"}
          >
            {isSubmitting && (
              <Spinner as="span" color={"secondary"} className="mx-4" />
            )}
            Registrar entrega
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};
