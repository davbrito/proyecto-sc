import { Container } from "@nextui-org/react";
import { useRouter } from "next/router";
import React from "react";
import { LayoutContent } from "~/components/Layout";
import { GreatForm } from "~/components/censo/GreatForm";

const CreateCenso = () => {
  const router = useRouter();
  const consejoComunalId = router.query.id ? router.query.id.toString() : "";
  return (
    <LayoutContent>
      <Container css={{ mw: "680px", my: "2rem" }}>
        <GreatForm consejoComunalId={consejoComunalId} />
      </Container>
    </LayoutContent>
  );
};

export default CreateCenso;
