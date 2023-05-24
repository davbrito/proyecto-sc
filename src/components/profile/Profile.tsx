import { Container } from "@nextui-org/react";
import React from "react";
import { api } from "~/utils/api";
import { CustomLoading } from "../Loading";
import Image from "next/image";
import Link from "next/link";

export const ProfileData = () => {
  const { data, isLoading } = api.user.getById.useQuery();

  if (isLoading) return <CustomLoading />;
  if (!data) return null;

  return (
    <Container
      css={{
        backgroundColor: "$gray200",
        border: "$gray100",
        borderRadius: "$md",
        p: "$10",
      }}
    >
      <h1>Datos del perfil</h1>

      <div className="flex justify-between">
        <div className="flex flex-col ">
          <h2>
            <b>Nombre:</b> {data.name}
          </h2>
          <h2>
            <b>Apellido:</b> {data.lastName}
          </h2>

          <h2>
            <b>Usuario:</b> {data.username}
          </h2>
        </div>
        <div className="mx-12 my-6 flex flex-col items-center justify-center gap-4 rounded-md bg-slate-300 p-4 px-6">
          <Image
            src={data.image || "/profile.png"}
            alt={data.username}
            width={102}
            height={102}
          />

          <button
            className="cursor-pointer rounded border
            border-solid border-orange-300  bg-orange-400 py-2 font-semibold transition-all hover:bg-orange-300
          "
          >
            Cambiar
          </button>
        </div>
      </div>
      <div className="mx-auto text-center">
        <Link
          className="cursor-pointer rounded border
            border-solid border-red-500 bg-red-500 inline-block transform-none text-white py-3 px-4  font-semibold transition-all hover:bg-red-400
          "
          href={"/profile/edit"}
        >
          Actualizar
        </Link>
      </div>
    </Container>
  );
};
