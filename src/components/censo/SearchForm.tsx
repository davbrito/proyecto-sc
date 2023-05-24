import { Button, Grid, Input } from "@nextui-org/react";
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
    <div className="mx-auto my-4 max-w-xs rounded p-5">
      <Grid.Container
        as="form"
        className="flex justify-center gap-2"
        onSubmit={handlerSubmit}
      >
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
