import { type NextPage } from "next";
import { LoginForm } from "~/components/AuthForm";
import { LayoutContent } from "~/components/Layout";

const LoginPage: NextPage = () => {
  return (
    <LayoutContent className="flex flex-col bg-independencia bg-cover py-12">
      <LoginForm />
    </LayoutContent>
  );
};

export default LoginPage;
