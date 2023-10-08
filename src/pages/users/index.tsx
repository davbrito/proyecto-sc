import { Card, CardBody, CardHeader } from "@nextui-org/react";
import React from "react";
import { LayoutContent } from "~/components/Layout";
import { UserList } from "~/components/user/UserList";

const IndexUserPage = () => {
  return (
    <LayoutContent className="flex flex-col items-center justify-center">
      <div className="container">
        <Card className="my-4 p-5">
          <CardHeader>
            <h1 className="mx-auto text-3xl">Lista de usuarios</h1>
          </CardHeader>
          <CardBody>
            <UserList />
          </CardBody>
        </Card>
      </div>
    </LayoutContent>
  );
};

export default IndexUserPage;
