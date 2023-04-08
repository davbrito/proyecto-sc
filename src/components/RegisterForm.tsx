import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface Inputs {
  username: string;
  password: string;
  name: string;
  lastName: string;
}

export const RegisterForm = () => {
  const {
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    setError,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (
    { password, username },
    event
  ) => {
    event?.preventDefault();
    console.log({ username, password });
    try {
      const post = await fetch("/api/auth/signin",{
        body: JSON.stringify({ username, password }),
        headers:{
          "content-type": "application/json"
        }
      });
      console.log(post)
    } catch (error) {
      setError("root", {
        message: "Error de servidor",
      });
      reset(
        { password: "", username: "", lastName: "", name: "" },
        { keepErrors: true }
      );
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

      <div className="flex content-between gap-x-4">
        <div className="w-full">
          <label>Name:</label>
          <input
            type="text"
            {...register("name", {
              required: { value: true, message: "field required" },
            })}
            className="input-field"
            placeholder="Type your name..."
          />
          {errors.name && (
            <span className="input-errors">{errors.name.message}</span>
          )}
        </div>

        <div className="w-full">
          <label>Last name:</label>
          <input
            type="text"
            {...register("lastName", {
              required: { value: true, message: "field required" },
            })}
            className="input-field"
            placeholder="Type your lastName..."
          />
          {errors.lastName && (
            <span className="input-errors">{errors.lastName.message}</span>
          )}
        </div>
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          {...register("password", {
            required: { value: true, message: "field required" },
            pattern: { value : /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/ , message:"this field must contain 8 characters,at least one letter, one number and one special character"}
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
        Register
      </button>
    </form>
  );
};
