import { signIn, useSession ,} from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface Inputs {
  username: string;
  password: string;
}

export const LoginForm = () => {
  const {
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    setError,
  } = useForm<Inputs>();
  const session = useSession()
  console.log(session)
  const router = useRouter()


  const onSubmit: SubmitHandler<Inputs> = async (
    { password, username },
    event
  ) => {
    event?.preventDefault();
    console.log({ username, password });
    try {
      const res = await signIn("credentials",{
        username,
        password,
        redirect:false,
        callbackUrl:"/"
      })
      console.log(res)
      if(res?.error) throw { message : res.error , status: res.status}
      
    } catch (error ) {
      if(error){
         const {message} = error as {message : string , status: number}
        
         setError("root", {
           message ,
         });
        
         setTimeout(() => {
          setError("root", {
            message :"",
          });
         },3000)

      } 
      else{
        setError("root", {
          message:  "Server Error",
        });
      }
      
      reset({ password: "", username: "" }, { keepErrors: true });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <div>
        <label>Username:</label>
        <input
          type="text"
          {...register("username", {
            required: { value: true, message: "field required" },
          })}
          className="input-field"
          placeholder="Type your username..."
        />
        {errors.username && (
          <span className="input-errors">{errors.username.message}</span>
        )}
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          {...register("password", {
            required: { value: true, message: "field required" },
          })}
          className="input-field"
          placeholder="Type your password..."
        />
        {errors.password && (
          <span className="input-errors">{errors.password.message}</span>
        )}
      </div>

      {errors.root && (
        <span className="input-errors">{errors.root.message}</span>
      )}

      <button
        className="mx-auto rounded bg-blue-600 py-3 px-5 font-bold transition-all hover:bg-blue-500"
        disabled={isSubmitting}
      >
        Log in
      </button>
    </form>
  );
};
