import { useState } from "react";
import {
  type Ciudad,
  type Municipio,
  ciudades,
  type Parroquia,
} from "~/utils/venezuela";

export const useCiudades = () => {
  const [estados, setEstados] = useState<Ciudad[]>(() => ciudades);
  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  const [parroquias, setParroquias] = useState<Parroquia[]>([]);

  const onChangeEstado = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newMunicipios = estados.find(
      (estado) => estado.estado === event.target.value
    )?.municipios;

    if (!newMunicipios) return;
    setMunicipios(newMunicipios);
    setParroquias([]);
  };

  const onMunicipioChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    const newParroquias = municipios.find(
      (mun) => mun.municipio === event.target.value
    )?.parroquias;
    if (!newParroquias) return;

    const objeto = {
      parroquias: newParroquias,
    };

    setParroquias(newParroquias);
  };

  return {
    estados,
    municipios,
    parroquias,
    onChangeEstado,
    onMunicipioChange,
  };
};
