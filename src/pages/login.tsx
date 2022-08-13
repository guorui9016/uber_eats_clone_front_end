import { gql, useMutation } from "@apollo/client";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
import { PotatoMutation, PotatoMutationVariables } from "../__generated__/PotatoMutation";

const LOGIN_MUTATION = gql`
  mutation PotatoMutation($email:String!, $password: String!) {
    login(input:{
      email:$email,
      password:$password
    }) {
      code
      message
      token
    }
  }
`

interface ILoginForm {
  email : string;
  password: string;
}

export const Login = () => {
  const [loginMutation, {loading, error, data}] = useMutation<PotatoMutation, PotatoMutationVariables>(LOGIN_MUTATION)
  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm<ILoginForm>();

  const onsubmit = () => {
    const {email, password} = getValues()
    console.log(getValues());
    loginMutation({
      variables:{
        email,
        password
      }
    })
  };

  return (
    <div className=" h-screen flex items-center justify-center bg-gray-600">
      <div className=" bg-white w-full max-w-lg px-5 py-5 font-center font-serif text-lg rounded-lg">
        <h3 className="text-3xl text-center mb-7">Login</h3>
        <form onSubmit={handleSubmit(onsubmit)} className=" flex flex-col">
          <input
            {...register("email", {required: "Email is required!"})}
            name="email"
            type="email"
            required
            placeholder="Email"
            className="input my-3 "
          />
          {errors.email?.message && (
            <FormError errorMessage={errors.email.message}/>
          )}
          <input
            {...register("password", {
              required: "Password is required!",
              minLength: {
                value: 6,
                message: "The password is too short.",
              },
            })}
            name="password"
            type="password"
            required
            placeholder="Password"
            className="input my-3 "
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password.message}/>
          )}
          <button className=" logbutton mx-16 my-4">Login</button>
        </form>
      </div>
    </div>
  );
};
