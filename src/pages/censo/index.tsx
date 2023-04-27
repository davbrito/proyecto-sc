import { LayoutContent } from "~/components/Layout";
import { CensoForm } from "../../components/censo/CasaForm";
import { PersonaForm } from "~/components/censo/PersonaForm";
import { Container } from "@nextui-org/react";

const CensoIndex = () => {
  return (
    <LayoutContent>
      <h1>Datos</h1>
      <Container css={{ my: "1rem" }}>
        <CensoForm />
      </Container>
      <Container>
        <PersonaForm />
      </Container>
    </LayoutContent>
  );
};

export default CensoIndex;
