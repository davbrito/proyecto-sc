import { type NextPage } from "next";
import { LayoutContent } from "~/components/Layout";
import { RegisterForm } from "~/components/RegisterForm";

const RegisterPage: NextPage = () => {
  return (
    <LayoutContent className=" place-content-center bg-independencia bg-cover ">
      <div className="container mx-auto">
        <RegisterForm />
      </div>
    </LayoutContent>
  );
};

export default RegisterPage;
