import { type UseFormRegister } from "react-hook-form";

type CheckboxProps = {
  name:
    | "documentos.recibe_pension"
    | "documentos.carnet_conapdis"
    | "documentos.vacuna_covid"
    | "recibe_pension"
    | "carnet_conapdis"
    | "vacuna_covid";
  label: string;
  register: UseFormRegister<any>;
};

export const Checkbox = ({ name, label, register }: CheckboxProps) => {
  return (
    <div className="mb-4 flex items-center">
      <input
        type="checkbox"
        value=""
        {...register(name)}
        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600   dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
      />
      <label
        htmlFor={name}
        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {label}
      </label>
    </div>
  );
};
