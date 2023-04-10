import { Container } from "@nextui-org/react";
import { type NextPage } from "next";
import { LayoutContent } from "~/components/Layout";
import { RegisterForm } from "~/components/RegisterForm";

const RegisterPage: NextPage = () => {
  return (
    <LayoutContent>
      <Container xs>
        <RegisterForm />
      </Container>
    </LayoutContent>
  );
};

export default RegisterPage;
