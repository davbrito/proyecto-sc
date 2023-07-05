import { Container } from "@nextui-org/react";
import { type NextPage } from "next";
import { LoginForm } from "~/components/AuthForm";
import { LayoutContent } from "~/components/Layout";

const LoginPage: NextPage = () => {
  return (
    <LayoutContent className="bg-[url('/img/independencia.jpg')] bg-contain">
      <Container xs>
        <LoginForm />
      </Container>
    </LayoutContent>
  );
};

export default LoginPage;
