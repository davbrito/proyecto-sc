import { Avatar, Card, Col, Container, Row, Text } from "@nextui-org/react";
import React from "react";
import { api } from "~/utils/api";
import { CustomLoading } from "../Loading";
import Link from "next/link";

export const ProfileData = () => {
  const { data, isLoading } = api.user.getById.useQuery();

  if (isLoading) return <CustomLoading />;
  if (!data) return null;

  return (
    <Card
      variant="bordered"
      css={{
        backgroundColor: "$gray200",
        p: "$10",
        maxWidth: "600px",
        margin: "auto",
      }}
    >
      <Container className="flex justify-between" css={{ padding: 0 }}>
        <Row className="flex flex-col items-center gap-4 sm:flex-row">
          <Col css={{ maxWidth: "180px" }}>
            <Avatar
              css={{ size: "$40" }}
              pointer
              text={data.name}
              src={data.image || "/profile.png"}
              color="gradient"
              bordered
              className="mx-auto"
            />
            <button
              className="mx-auto mt-4
              block w-fit cursor-pointer rounded border border-solid
              bg-orange-600 px-4 py-2 font-semibold transition-all hover:bg-orange-700
          "
            >
              Cambiar
            </button>
          </Col>

          <Row className="flex flex-col sm:self-start">
            <Col>
              <Text h2 className="text-base  text-gray-400">
                Nombre:
              </Text>
              <Text h2 className="ml-2 text-2xl font-light">
                <span className="capitalize">{data.name}</span>{" "}
                <span className="capitalize">{data.lastName}</span>
              </Text>
            </Col>
            <Col>
              <Text h2 className="text-base  text-gray-400">
                Username:
              </Text>
              <Text h2 className="ml-2 text-2xl font-light">
                <span className="capitalize">{data.username}</span>
              </Text>
            </Col>
          </Row>
        </Row>

        <div className="mx-auto mt-4 text-center">
          <Link
            className="inline-block transform-none cursor-pointer
            rounded border border-solid border-red-500 bg-red-500 px-4 py-3 font-semibold  text-white transition-all hover:bg-red-400
          "
            href={"/profile/edit"}
          >
            Actualizar
          </Link>
        </div>
      </Container>
    </Card>
  );
};
