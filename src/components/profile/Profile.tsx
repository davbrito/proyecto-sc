import { Avatar, Button, Card } from "@nextui-org/react";
import React from "react";
import { api } from "~/utils/api";
import { CustomLoading } from "../Loading";
import NextLink from "next/link";

export const ProfileData = () => {
  const { data, isLoading } = api.user.getById.useQuery();

  if (isLoading) return <CustomLoading />;
  if (!data) return null;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex flex-col items-center gap-8 sm:flex-row">
        <div className="flex flex-col gap-4">
          <Avatar
            name={data.name}
            src={data.image || "/profile.png"}
            className="mx-auto"
            isBordered
            size="lg"
          />
          <Button type="button" color="secondary">
            Cambiar
          </Button>
        </div>

        <div className="flex flex-col gap-3 sm:self-start">
          <div>
            <div className="text-small leading-none text-default-500">
              Nombre:
            </div>
            <div className="text-2xl font-light  leading-tight">
              <span className="capitalize">
                {data.name} {data.lastName}
              </span>
            </div>
          </div>
          <div>
            <div className="text-small leading-none text-default-500">
              Username:
            </div>
            <div className="text-2xl font-light leading-tight">
              {data.username}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-4 text-center">
        <Button as={NextLink} href="/profile/edit" color="danger">
          Actualizar
        </Button>
      </div>
    </div>
  );
};
