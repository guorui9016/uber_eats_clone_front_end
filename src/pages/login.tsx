import { ApolloError, gql, useMutation } from "@apollo/client";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
import logo from "../images/uber-eats.svg"
import {
  loginMutation,
  loginMutationVariables,
} from "../__generated__/loginMutation";
import {LoginInputDto} from "../__generated__/globalTypes"
import { Button } from "../components/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";


const LOGIN_MUTATION = gql`
  mutation loginMutation($login: LoginInputDto!) {
    login(input: $login) {
      code
      token
      message
    }
  }
`;

interface ILoginForm {
  email: string;
  password: string;
}

export const Login = () => {
  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit
    
  } = useForm<ILoginForm>();

  const onCompleted = (data: loginMutation) => {
    console.log(data);
  };

  const [loginMutation, { loading, error, data: loginMutationResult }] =
    useMutation<loginMutation, loginMutationVariables>(LOGIN_MUTATION, {
      onCompleted
    });

  const onsubmit = () => {
    const { email, password } = getValues();
    if (!loading) {
      console.log(getValues());
      loginMutation({
        variables: {
          login: {
            email,
            password,
          },
        },
      });
    }
  };

  return (
    <div className=" h-screen flex items-center flex-col mt-10 lg:mt-28">
        <Helmet>
        <title>Login | Nuber Eats</title>
      </Helmet>
      <img className=" w-full max-w-xs flex flex-col items-center mb-16" src={logo}/>
      <div className=" bg-white w-full max-w-lg px-5 py-5 font-center font-serif text-lg rounded-lg">
        <h4 className=" font-bold mb-3">Welcome back</h4>
        <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col mb-5">
          <input
            {...register("email", { required: "Email is required!" })}
            name="email"
            type="email"
            required
            placeholder="Email"
            className="input my-3 "
          />
          {errors.email?.message && (
            <FormError errorMessage={errors.email.message} />
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
            <FormError errorMessage={errors.password.message} />
          )}
          <Button canClick= {isValid} loading = {loading}/>
          {loginMutationResult?.login.code === "failed" && (
            <FormError errorMessage={loginMutationResult.login.message} />
          )} 
        </form>
        <div>
          New to Nuber?  <Link to="/signup" className=" text-lime-600 hover:underline"> Sing Up</Link>
        </div>
      </div>
    </div>
  );
};