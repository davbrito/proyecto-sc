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

  const onChangeEstado = (event: React.ChangeEvent<HTMLSelectElement> | string) => {
    if (typeof event !== "string" ) {
      const newMunicipios = estados.find(
        (estado) => estado.estado === event.target.value
      )?.municipios;
      if (!newMunicipios) return;
      setMunicipios(newMunicipios);
      setParroquias([]);
    } else if (typeof event === "string") {
      const newMunicipios = estados.find(
        (estado) => estado.estado === event
      )?.municipios;
      if (!newMunicipios) return;
      setMunicipios(newMunicipios);
      setParroquias([]);
    }
  };

  const onMunicipioChange = (event: React.ChangeEvent<HTMLSelectElement> | string) => {
    if (typeof event !== "string") {
      const newParroquias = municipios.find(
        (mun) => mun.municipio === event.target.value
      )?.parroquias;
      if (!newParroquias) return;
      setParroquias(newParroquias);
    } else if (typeof event === "string") {

      const newParroquias = municipios.find(
        (mun) => {
          console.log('UNIQUE',mun.municipio,event)
          return mun.municipio === event
        }
      )?.parroquias;
      if (!newParroquias) return;
      setParroquias(newParroquias);
      console.log("MUNICIPIO:",newParroquias)
    }
  };

  return {
    estados,
    municipios,
    parroquias,
    onChangeEstado,
    onMunicipioChange,
  };
};
