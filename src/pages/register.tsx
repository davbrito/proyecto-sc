import { Container } from "@nextui-org/react";
import { type NextPage } from "next";
import { LayoutContent } from "~/components/Layout";
import { RegisterForm } from "~/components/RegisterForm";

const RegisterPage: NextPage = () => {
  return (
    <LayoutContent className="flex flex-col bg-[url('/img/independencia.jpg')] bg-cover py-12">
      <Container xs justify="center" alignItems="center">
        <RegisterForm />
      </Container>
    </LayoutContent>
  );
};

export default RegisterPage;
