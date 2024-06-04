import { type ROLE } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { LayoutContent } from "~/components/Layout";
import { EntregaForm } from "~/components/entrega-clap/EntregaForm";

const Create = () => {
  const router = useRouter();
  const { data } = useSession();
  const role_user = data?.user.role_user;
  const consejoId = router.query?.id ? router.query.id.toString() : "";

  if (!data?.user) return <LayoutContent className=" "></LayoutContent>;

  return (
    <LayoutContent className=" ">
      <EntregaForm
        consejoId={parseInt(consejoId)}
        role_user={role_user as ROLE}
      />
    </LayoutContent>
  );
};

export default Create;
