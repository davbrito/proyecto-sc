import { type NextPage } from "next";
import { LayoutContent } from "~/components/Layout";
import { RegisterForm } from "~/components/RegisterForm";

const RegisterPage: NextPage = () => {
  return (
    <LayoutContent className=" flex-col bg-independencia bg-cover py-12">
      <div className="container mx-auto">
        <RegisterForm />
      </div>
    </LayoutContent>
  );
};

export default RegisterPage;
