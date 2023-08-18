import { Button, Card, Container, Grid, Input, Text } from "@nextui-org/react";
import React, {
  type Dispatch,
  type FormEvent,
  type SetStateAction,
  useState,
} from "react";

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
    <Card className=" mx-auto p-5" css={{ maxW: "350px" }}>
      <Grid.Container
        as="form"
        className="flex flex-col justify-center gap-2"
        onSubmit={handlerSubmit}
      >
        <Text as="label" h3 className="text-xl font-medium">
          Busqueda:
        </Text>
        <Input
          placeholder="Ej: 102500001"
          bordered
          id="search-input"
          name="search"
          type="search"
          value={search}
          helperColor="error"
          onChange={({ target }) => setSearch(target.value)}
        />
        <Button
          type="submit"
          className="bg-blue-600 transition-all hover:bg-blue-950"
        >
          Buscar
        </Button>
      </Grid.Container>
    </Card>
  );
};
