import { Button, Grid, Input, Text } from "@nextui-org/react";
import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";

interface Props {
  setSearchValue: Dispatch<SetStateAction<string>>;
}

export const SearchForm = ({ setSearchValue }: Props) => {
  const [search, setSearch] = useState("");
  const handlerSubmit = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchValue(search);
  };
  return (
    <div className="rounded p-5">
      <Grid.Container
        as="form"
        className="flex justify-center gap-2 flex-col"
        onSubmit={handlerSubmit}
      >
        <Text h3>Busqueda:</Text>
        <Input
          placeholder="Ej: 102500001"
          bordered
          name="search"
          type="search"
          value={search}
          helperColor="error"
          onChange={({ target }) => setSearch(target.value)}
        />

        <Button type="submit">Buscar</Button>
      </Grid.Container>
    </div>
  );
};
