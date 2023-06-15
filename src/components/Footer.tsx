import { Container, Text } from "@nextui-org/react";
import React from "react";

const Footer = () => {
  return (
    <footer className="m-0 mt-4 h-20 bg-red-950 py-4">
      <Container>
        <Text h6 css={{ margin: 0, textAlign: "center" }}>
          Censo 2023. Republica Bolivariana de Venezuela.
        </Text>
      </Container>
    </footer>
  );
};

export default Footer;
