import { Table, Container, Grid, Text } from '@nextui-org/react';
import React, { useState } from "react";
import { api } from "~/utils/api";
import { CustomLoading } from "../Loading";
import Link from "next/link";
import { SearchForm } from "./SearchForm";

export const PersonasList = ({search}:{search?:string}) => {
  
  const { data, isLoading ,} = api.censo.getCensoInfor.useQuery(search);

  if (isLoading) return <CustomLoading />;

  if (!data) return null;
  
  if(data.length === 0) return (
    <Container css={{
      border:'1px solid $gray400',
      borderRadius:"$3xl",
      padding:"$10 $6",
      
    }} className='max-w-xl mx-4'>
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <Text h2 css={{textAlign:"center"}}>No hay resultados para la busqueda del censo: '{search}'</Text>
    </Container>
  )


 return (
    <div>
      <Table bordered lined headerLined >
        <Table.Header >
          <Table.Column align="center">Codigo</Table.Column>
          <Table.Column align="center">Manzana</Table.Column>
          <Table.Column align="center">Casa</Table.Column>
          <Table.Column align="center">Nombres</Table.Column>
          <Table.Column align="center">Documento</Table.Column>
          <Table.Column align="center">Casa</Table.Column>
          <Table.Column align="center">Fecha</Table.Column>
          <Table.Column align="center">Familia</Table.Column>
          <Table.Column align="center">Genero</Table.Column>
          <Table.Column align="center">Acciones</Table.Column>
        </Table.Header>
        <Table.Body>
       
          
          {data.map(({ jefeFamilia, id, casa, tipoFamilia }) => (
            <Table.Row key={id.toString()}>
              <Table.Cell css={{ textAlign: "center" ,fontSize:'$sm'}}>
                <Link href={`/censo/${jefeFamilia.id.toString()}`}>
                  {id.toString().padStart(8, "0")}
                </Link>
              </Table.Cell>
              <Table.Cell css={{ textAlign: "center" ,fontSize:'$sm'}}>
                {casa.manzana}
              </Table.Cell>
              <Table.Cell css={{ textAlign: "center" ,fontSize:'$sm'}}>
                {casa.casa.padStart(2, "0")}
              </Table.Cell>
              <Table.Cell css={{ textAlign: "center" ,fontSize:'$sm'}}>
                {jefeFamilia.apellidos.toUpperCase()},{" "}
                {jefeFamilia.nombres.toUpperCase()}.
              </Table.Cell>
              <Table.Cell css={{ textAlign: "center" ,fontSize:'$sm'}}>
                {jefeFamilia.tipoDocumento.toUpperCase()}-
                {jefeFamilia.numeroDocumento}
              </Table.Cell>
              <Table.Cell css={{ textAlign: "center" ,fontSize:'$sm'}}>
                {jefeFamilia.genero}
              </Table.Cell>
              <Table.Cell css={{ textAlign: "center" ,fontSize:'$sm'}}>
                {jefeFamilia.fechaNacimiento.toLocaleString()}
              </Table.Cell>
              <Table.Cell css={{ textAlign: "center" ,fontSize:'$sm'}}>
                {tipoFamilia.toUpperCase()}
              </Table.Cell>
              <Table.Cell css={{ textAlign: "center" ,fontSize:'$sm'}}>
                {jefeFamilia.genero.toUpperCase() === "F"
                  ? "Femenino"
                  : "Masculino"}
              </Table.Cell>
              <Table.Cell>
                <Link href={"/familiares/create"}>Añadir Pariente</Link>
              </Table.Cell>
            </Table.Row>
          ))}

          
        </Table.Body>
          
      </Table>

    </div>
  );
};
