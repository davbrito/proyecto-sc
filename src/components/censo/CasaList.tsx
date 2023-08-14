import { Button, Table, Grid, Text } from "@nextui-org/react";
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
    <>
      {data.length === 0 && (
        <Grid.Container
          css={{
            border: "1px solid $gray400",
            borderRadius: "$3xl",
            padding: "$10 $6",
          }}
          className="mx-auto min-h-[40vh] w-full place-content-center"
        >
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <Text
            h2
            className="text-2xl font-light"
            css={{ textAlign: "center" }}
          >
            Aun no se han registrados familiares.
          </Text>
        </Grid.Container>
      )}
      {data.length > 0 && (
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
      )}
    </>
  );
};
