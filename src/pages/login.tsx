import { type NextPage } from "next";
import { LoginForm } from "~/components/AuthForm";
import { LayoutContent } from "~/components/Layout";

const LoginPage: NextPage = () => {
  return (
    <LayoutContent className="place-content-center bg-independencia bg-cover ">
      <LoginForm />
    </LayoutContent>
  );
};

export default LoginPage;
