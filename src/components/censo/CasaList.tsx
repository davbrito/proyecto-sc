import { Button, Table } from "@nextui-org/react";
import React from "react";
import { api } from "~/utils/api";
import { CustomLoading } from "../Loading";
import Link from "next/link";

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

  if (isLoading) return <CustomLoading className="place-content-center" />;

  if (!data) return <h1>Error</h1>;
  return (
    <Table
      css={{ mt: "0.5rem", height: "auto", minWidth: "100%" }}
      className="text-center"
      bordered
      lined
      headerLined
      hoverable
    >
      <Table.Header>
        <Table.Column
          align="center"
          css={{ fontSize: "16px", fontWeight: 600 }}
        >
          N° Calle{" "}
        </Table.Column>
        <Table.Column
          align="center"
          css={{ fontSize: "16px", fontWeight: 600 }}
        >
          N° Manzana{" "}
        </Table.Column>
        <Table.Column
          align="center"
          css={{ fontSize: "16px", fontWeight: 600 }}
        >
          N° Casa{" "}
        </Table.Column>
        <Table.Column
          align="center"
          width={50}
          css={{ fontSize: "16px", fontWeight: 600 }}
        >
          Acciones
        </Table.Column>
      </Table.Header>
      <Table.Body>
        {data &&
          data.map(({ id, calle, casa, manzana, Censo }) => (
            <Table.Row key={`${id}`}>
              <Table.Cell>{calle.toUpperCase()}</Table.Cell>
              <Table.Cell>{manzana}</Table.Cell>
              <Table.Cell>{casa}</Table.Cell>
              <Table.Cell>
                {Censo[0]?.jefeFamiliaId ? (
                  <Link
                    href={`/censo/${Censo[0]?.jefeFamiliaId.toString()}`}
                    className="block rounded-xl bg-blue-700 px-3 py-2 text-[0.875rem]  text-white transition-all hover:bg-blue-950"
                  >
                    Ver informacion
                  </Link>
                ) : (
                  <Button disabled>Ver informacion</Button>
                )}
              </Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
};
