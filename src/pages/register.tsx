import { type NextPage } from "next";
import { LayoutContent } from "~/components/Layout";
import { RegisterForm } from "~/components/RegisterForm";

const RegisterPage: NextPage = () => {
  return (
    <LayoutContent>
      <div className="w-full max-w-2xl rounded-md border border-slate-700 bg-slate-800 p-5">
        <h1 className="text-center text-2xl font-bold text-white">
          Register Form
        </h1>
        <RegisterForm />
      </div>
    </LayoutContent>
  );
};

export default RegisterPage;
