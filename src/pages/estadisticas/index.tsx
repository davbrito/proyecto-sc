import { Container, Table, Text } from "@nextui-org/react";
import { type GetServerSidePropsContext } from "next";
import React from "react";
import { LayoutContent } from "~/components/Layout";
import { verifySession } from "~/utils/verifySession";

const EstadisticasPage = () => {
  return (
    <LayoutContent>
      <Container>
        <Text h1>Estadisticas de cajas</Text>

        <Table
          aria-label="Example table with static content"
          css={{
            height: "auto",
            minWidth: "100%",
          }}
          bordered
          lined
        >
          <Table.Header>
            <Table.Column>MANZANA</Table.Column>
            <Table.Column>CASAS</Table.Column>
            <Table.Column>FAMILIA</Table.Column>
            <Table.Column>NO CARNET</Table.Column>
            <Table.Column>UNIFAMILIAR</Table.Column>
            <Table.Column>EXTRA</Table.Column>
            <Table.Column>BIFAMILIAR</Table.Column>
            <Table.Column>ENTREGADA</Table.Column>
          </Table.Header>
          <Table.Body>
            <Table.Row key="1">
              <Table.Cell>Tony Reichert</Table.Cell>
              <Table.Cell>CEO</Table.Cell>
              <Table.Cell>Active</Table.Cell>
              <Table.Cell>Technical Lead</Table.Cell>
              <Table.Cell>Paused</Table.Cell>
              <Table.Cell>Active</Table.Cell>
              <Table.Cell>Technical Lead</Table.Cell>
              <Table.Cell>Paused</Table.Cell>
            </Table.Row>
            <Table.Row key="2">
              <Table.Cell>Zoey Lang</Table.Cell>
              <Table.Cell>Technical Lead</Table.Cell>
              <Table.Cell>Paused</Table.Cell>
              <Table.Cell>Technical Lead</Table.Cell>
              <Table.Cell>Paused</Table.Cell>
              <Table.Cell>Active</Table.Cell>
              <Table.Cell>Technical Lead</Table.Cell>
              <Table.Cell>Paused</Table.Cell>
            </Table.Row>
            <Table.Row key="3">
              <Table.Cell>Jane Fisher</Table.Cell>
              <Table.Cell>Senior Developer</Table.Cell>
              <Table.Cell>Active</Table.Cell>
              <Table.Cell>Technical Lead</Table.Cell>
              <Table.Cell>Paused</Table.Cell>
              <Table.Cell>Active</Table.Cell>
              <Table.Cell>Technical Lead</Table.Cell>
              <Table.Cell>Paused</Table.Cell>
            </Table.Row>
            <Table.Row key="4">
              <Table.Cell>William Howard</Table.Cell>
              <Table.Cell>Community Manager</Table.Cell>
              <Table.Cell>Vacation</Table.Cell>
              <Table.Cell>Technical Lead</Table.Cell>
              <Table.Cell>Paused</Table.Cell>
              <Table.Cell>Active</Table.Cell>
              <Table.Cell>Technical Lead</Table.Cell>
              <Table.Cell>Paused</Table.Cell>
            </Table.Row>
            <Table.Row key="4">
              <Table.Cell>William Howard</Table.Cell>
              <Table.Cell>Community Manager</Table.Cell>
              <Table.Cell>Vacation</Table.Cell>
              <Table.Cell>Technical Lead</Table.Cell>
              <Table.Cell>Paused</Table.Cell>
              <Table.Cell>Active</Table.Cell>
              <Table.Cell>Technical Lead</Table.Cell>
              <Table.Cell>Paused</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Container>
    </LayoutContent>
  );
};

export default EstadisticasPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await verifySession(context);
}
