import { Button, Card, CardBody, Input } from "@nextui-org/react";
import {
  useState,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
  useId,
} from "react";

interface Props {
  setSearchValue: Dispatch<SetStateAction<string>>;
}

export const SearchForm = ({ setSearchValue }: Props) => {
  const id = useId();
  const [search, setSearch] = useState("");

  const handlerSubmit = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchValue(search);
  };

  return (
    <Card className="mx-auto p-5" style={{ maxWidth: "350px" }}>
      <CardBody
        as="form"
        className="flex flex-col justify-center gap-2"
        onSubmit={handlerSubmit}
      >
        <label htmlFor={id} className="text-xl font-medium">
          Busqueda:
        </label>
        <Input
          placeholder="Ej: 102500001"
          id={id}
          name="search"
          type="search"
          value={search}
          onChange={({ target }) => setSearch(target.value)}
        />
        <Button
          type="submit"
          className="bg-blue-600 transition-all hover:bg-blue-950"
        >
          Buscar
        </Button>
      </CardBody>
    </Card>
  );
};
