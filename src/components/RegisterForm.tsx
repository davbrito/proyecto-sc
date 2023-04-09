import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { api } from "~/utils/api";

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

  const { mutate, isLoading } = api.user.create.useMutation();

  const onSubmit: SubmitHandler<Inputs> = async (data, event) => {
    event?.preventDefault();

    await mutate(data, {
      onError(error) {
        
        setError("username", {
          message:error.message,

        })
      },
      onSuccess(data) {
        console.log(data);
        
      },
    });

    reset(
      { password: "", username: "", lastName: "", name: "" },
      { keepErrors: true }
    );
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
            pattern: {
              value:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
              message:
                "this field must contain 8 characters,at least one letter, one upper letter and one number ",
            },
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
        disabled={isLoading}
      >
        Register
      </button>
    </form>
  );
};
