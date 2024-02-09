import { Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { type FieldErrors, type UseFormRegister } from "react-hook-form";
import { type JefeProps } from "./GreatForm";
import { Checkbox } from "../Checkbox";

interface Props {
  register: UseFormRegister<JefeProps>;
  errors: FieldErrors<JefeProps>;
}

export const DocumentosForm = ({ register, errors }: Props) => {
  return (
    <div className="grid grid-cols-12 gap-2">
      <div className="col-span-4">
        <Select
          label="Tipo documento:"
          className="max-w-xs"
          placeholder="Seleccione una opcion"
          {...register("documentos.tipoDocumento", {
            required: {
              message: "Este campo no puede estar vacio",
              value: true,
            },
          })}
          isInvalid={!!errors.documentos?.tipoDocumento}
          errorMessage={errors.documentos?.tipoDocumento?.message}
        >
          <SelectItem value={"v"} key={"v"}>
            Venezolano
          </SelectItem>
          <SelectItem value={"e"} key={"e"}>
            Extranjero
          </SelectItem>
          <SelectItem value={"f"} key={"f"}>
            Firma
          </SelectItem>
        </Select>
      </div>
      <div className="col-span-8">
        <Input
          fullWidth
          label="Cedula:"
          placeholder="Ejemplo: 1234578"
          type="text"
          variant="bordered"
          {...register("documentos.numeroDocumento", {
            required: "Este campo es obligatorio",
            pattern: {
              value: /^[0-9]*$/,
              message: "Debe escribirlo en el siguiente formato: '12345678'",
            },
            maxLength: {
              value: 8,
              message: "Corrija el numero de cedula por favor.",
            },
          })}
          maxLength={8}
          autoFocus
          isInvalid={!!errors?.documentos?.numeroDocumento}
          errorMessage={errors?.documentos?.numeroDocumento?.message}
        />
      </div>
      <div className="col-span-6">
        <Input
          fullWidth
          label="Serial Carnet de la patria:"
          placeholder="Escriba el serial del carnet de la patria..."
          type="text"
          {...register("documentos.serialCarnetPatria")}
          isInvalid={!!errors?.documentos?.serialCarnetPatria}
          errorMessage={errors?.documentos?.serialCarnetPatria?.message}
        />
      </div>

      <div className="col-span-6">
        <Input
          fullWidth
          label="Codigo del carnet de la patria:"
          placeholder="Escriba el codigo del carnet de la patria..."
          type="text"
          {...register("documentos.codCarnetPatria")}
          isInvalid={!!errors?.documentos?.codCarnetPatria}
          errorMessage={errors?.documentos?.codCarnetPatria?.message}
        />
      </div>

      <div className="col-span-8">
        <Textarea
          fullWidth
          label="Observacion:"
          placeholder="Escriba alguna observacion (opcional)"
          {...register("documentos.observacion")}
          isInvalid={!!errors?.documentos?.observacion}
          errorMessage={errors?.documentos?.observacion?.message}
        />
      </div>
      <div className="col-span-4">
        <Textarea
          fullWidth
          label="Discapacidad:"
          placeholder="Escriba si tiene alguna discapacidad"
          {...register("documentos.discapacidad")}
        />
      </div>

      <div className="col-span-12">
        <Textarea
          fullWidth
          label="Sufre enfermedad cronica? (especifique):"
          placeholder="Escriba si tiene alguna enfermedad cronica"
          {...register("documentos.enfermedad_cronica")}
        />
      </div>

      <div className="col-span-12 grid grid-cols-12  place-content-center  gap-4">
        <div className="col-span-4">
          <Checkbox
            label="¿Posee Carnet CONAPDIS?"
            name="documentos.carnet_conapdis"
            register={register}
          />
        </div>
        <div className="col-span-4">
          <Checkbox
            label="Vacuna COVID"
            name="documentos.vacuna_covid"
            register={register}
          />
        </div>
        <div className="col-span-4">
          <Checkbox
            label="¿Recibe pension?"
            name="documentos.recibe_pension"
            register={register}
          />
        </div>
      </div>
    </div>
  );
};
