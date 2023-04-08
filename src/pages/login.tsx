import { NextPage } from "next";
import { LoginForm } from "~/components/AuthForm";
import { LayoutContent } from "~/components/Layout";

const LoginPage: NextPage = () => {
  return (
    <LayoutContent>
      <div className=" w-full max-w-md rounded-md border border-gray-800 bg-gray-800 p-4  shadow mt-8">
        <h1 className="text-2xl text-center text-white font-bold">CENSO {new Date().getFullYear()}</h1>
        <LoginForm />
      </div>
    </LayoutContent>
  );
};

export default LoginPage;
