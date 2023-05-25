import { Button, Table } from "@nextui-org/react";
import React from "react";
import { api } from "~/utils/api";
import { CustomLoading } from "../Loading";

export const CasaList = () => {
  const { data, isLoading, refetch } = api.casa.getAllCasas.useQuery();
  const deleteCasa = api.casa.deleteCasaById.useMutation();

  const deleteById = (id: bigint) => {
    try {
      deleteCasa.mutate(
        { casaId: id },
        {
          onSuccess(data, variables, context) {
            refetch();
            console.log(data);
          },
          onError(error, variables, context) {
            console.log(error);
          },
        }
      );
    } catch (error) {}
  };

  if (isLoading) return <CustomLoading />;

  if (!data) return <h1>Error</h1>;
  return (
    <Table css={{ mt: "0.5rem" }} className="text-center">
      <Table.Header>
        <Table.Column align="center">N° Calle</Table.Column>
        <Table.Column align="center">N° Manzana</Table.Column>
        <Table.Column align="center">N° Casa</Table.Column>
        <Table.Column align="center">Direccion</Table.Column>
        <Table.Column align="center">Acciones</Table.Column>
      </Table.Header>
      <Table.Body>
        {data &&
          data.map(({ id, calle, casa, direccion, manzana }) => (
            <Table.Row key={`${id}`}>
              <Table.Cell>{calle}</Table.Cell>
              <Table.Cell>{manzana}</Table.Cell>
              <Table.Cell>{casa}</Table.Cell>
              <Table.Cell>{direccion}</Table.Cell>

              <Table.Cell>
                <Button
                  flat
                  color={"error"}
                  css={{ mx: "auto" }}
                  onClick={() => deleteById(id)}
                >
                  Eliminar
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
};
