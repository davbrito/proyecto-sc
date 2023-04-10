import { NextPage } from "next";
import { use } from "react";
import { api } from "~/utils/api";

const TestPage: NextPage = () => {
    const {data} = api.user.getUsers.useQuery()
    console.log(data)
  return (
    <div>
      <h1>Pagina de prueba</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
        consequatur consectetur ipsam nulla laudantium ipsum nisi dolore laborum
        minus sapiente, aliquam autem. Consequatur veniam culpa nesciunt omnis
        inventore eos est?
      </p>
    </div>
  );
};


export default TestPage