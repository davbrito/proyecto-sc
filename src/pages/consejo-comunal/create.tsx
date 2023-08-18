import { Container } from "@nextui-org/react";
import React from "react";
import { LayoutContent } from "~/components/Layout";
import { ConsejoForm } from "~/components/consejo-comunal/consejoForm";

const Create = () => {
  return (
    <LayoutContent>
      <Container className="my-4 max-w-2xl ">
        <ConsejoForm />
      </Container>
    </LayoutContent>
  );
};

export default Create;
