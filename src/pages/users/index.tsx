import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Link,
} from "@nextui-org/react";
import React from "react";
import { LayoutContent } from "~/components/Layout";
import { UserList } from "~/components/user/UserList";

const IndexUserPage = () => {
  return (
    <LayoutContent className="flex flex-col items-center justify-center">
      <div className="container">
        <Card className="my-4 p-5">
          <CardHeader className="flex flex-col gap-4">
            <h1 className="mx-auto text-3xl">Lista de usuarios</h1>
            <Link
              href={"/register"}
              className="mx-auto inline-block cursor-pointer rounded-md   bg-green-600 px-3 py-2 text-white transition-all hover:bg-green-900"
            >
              Crear usuario
            </Link>
          </CardHeader>
          <CardBody>
            <UserList />
          </CardBody>
          <CardFooter></CardFooter>
        </Card>
      </div>
    </LayoutContent>
  );
};

export default IndexUserPage;
