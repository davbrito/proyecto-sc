import { NextPage } from "next"
import { LayoutContent } from "~/components/Layout"
import { RegisterForm } from "~/components/RegisterForm"

const RegisterPage : NextPage = () => {

    return (
        <LayoutContent>
            <div className="w-full max-w-2xl bg-slate-800 rounded-md border border-slate-700 p-5">
                <h1 className="text-2xl text-center text-white font-bold">Register Form</h1>
                <RegisterForm />
            </div>
        </LayoutContent>
    )
}


export default RegisterPage