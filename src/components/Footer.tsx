import { Container, Text, Row } from "@nextui-org/react";
import React from "react";

const Footer = () => {
  return (
    <Row
      className="m-0 mx-auto  min-h-[40]  w-full py-4"
      css={{ backgroundColor: "$footerBg" }}
      as="footer"
    >
      <Container>
        <Text
          h2
          css={{
            margin: 0,
            textAlign: "center",
            fontSize: "$xl",
          }}
          className="tracking-wide "
        >
          Censo 2023. Republica Bolivariana de Venezuela.
        </Text>

        <Text
          h6
          css={{
            margin: "$10 0",
            textAlign: "center",
            fontSize: "$xs",
          }}
          className=" "
        >
          Hecho con <span className=" text-red-600">❤</span> por estudiantes de
          la UNEG.
        </Text>
      </Container>
    </Row>
  );
};

export default Footer;
