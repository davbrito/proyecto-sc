import { Container } from "@nextui-org/react";
import { type NextPage } from "next";
import { LoginForm } from "~/components/AuthForm";
import { LayoutContent } from "~/components/Layout";

const LoginPage: NextPage = () => {
  return (
    <LayoutContent className="flex flex-col bg-[url('/img/independencia.jpg')] bg-cover py-12">
      <Container xs justify="center" alignItems="center">
        <LoginForm />
      </Container>
    </LayoutContent>
  );
};

export default LoginPage;
