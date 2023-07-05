import { Container, Text } from "@nextui-org/react";
import React from "react";

const Footer = () => {
  return (
    <footer className="m-0  min-h-[40] bg-slate-900 py-4">
      <Container>
        <Text
          h2
          css={{
            margin: 0,
            textAlign: "center",
            fontSize: "$xl",
          }}
          className=" tracking-wide text-gray-300"
        >
          Censo 2023. Republica Bolivariana de Venezuela.
        </Text>

        <Text
          h6
          css={{ margin: "$10 0", textAlign: "center", fontSize: "$xs" }}
          className=" text-gray-300"
        >
          Hecho con <span className=" text-red-600">❤</span> por estudiantes de
          la UNEG.
        </Text>
      </Container>
    </footer>
  );
};

export default Footer;
