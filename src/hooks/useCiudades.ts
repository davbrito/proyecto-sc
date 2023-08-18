import { useState } from "react";
import { type Ciudad, type Municipio, ciudades } from "~/utils/venezuela";

export const useCiudades = () => {
  const [estados, setEstados] = useState<Ciudad[]>(() => ciudades);
  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  const [parroquias, setParroquias] = useState<string[]>([]);

  const onChangeEstado = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newMunicipios = estados.find(
      (estado) => estado.estado === event.target.value
    )?.municipios;
    if (!newMunicipios) return;
    setMunicipios(newMunicipios);
    setParroquias([]);
  };

  const onMunicipioChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newParroquias = municipios.find(
      (mun) => mun.municipio === event.target.value
    )?.parroquias;
    if (!newParroquias) return;

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
