import { gql, useMutation } from "@apollo/client";
import { getValue } from "@testing-library/user-event/dist/utils";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/button";
import { FormError } from "../components/form-error";
import logo from "../images/uber-eats.svg";
import {
  createAccountMutation,
  createAccountMutationVariables,
} from "../__generated__/createAccountMutation";
import { Role } from "../__generated__/globalTypes";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccountMutation($createAccountInput: CreateAccountInputDto!) {
    createAccount(input: $createAccountInput) {
      code
      message
    }
  }
`;

interface ICreateAccountForm {
  name: string;
  email: string;
  role: Role;
  password: string;
}

export const Signup = () => {
  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
    watch,
  } = useForm<ICreateAccountForm>({
    mode: "onChange",
    defaultValues: {
      role: Role.client,
    },
  });

  const nav = useNavigate()

  const onCompleted = (data: createAccountMutation) => {
    const {createAccount:{code, message}} = data
    if(code==='success'){
      alert('The account is created. Login right now')
      nav('/')
    }
    console.log("signup -> onCompleted: " + data)
  }

  const [
    createAccountMutation,
    { loading, data: createAccountMutationResult },
  ] = useMutation<createAccountMutation, createAccountMutationVariables>(
    CREATE_ACCOUNT_MUTATION,
    { onCompleted }
  );

  const onSubmit = () => {
    if (!loading) {
      const { name, email, role, password } = getValues();
      console.log(role)
      createAccountMutation({
        variables: {
          createAccountInput: {
            name,
            email,
            role,
            password,
          },  
        },
      });
    }
  };


  return (
    <div className=" h-screen flex items-center flex-col mt-10 lg:mt-28">
      <Helmet>
        <title>Sign Up | Nuber Eats</title>
      </Helmet>
      <img
        className=" w-full max-w-xs flex flex-col items-center mb-16"
        src={logo}
      />
      <div className=" bg-white w-full max-w-lg px-5 py-5 font-center font-serif text-lg rounded-lg">
        <h4 className=" font-bold mb-3">Let's get started</h4>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mb-5">
          <input
            {...register("name", { required: "Name is required!" })}
            name="name"
            type="name"
            required
            placeholder="Name"
            className="input my-3 "
          />
          {errors.name?.message && (
            <FormError errorMessage={errors.name.message} />
          )}
          <input
            {...register("email", {
              required: "Email is required!",
              pattern:
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            name="email"
            type="email"
            required
            placeholder="Email"
            className="input my-3 "
          />
          {errors.email?.message && (
            <FormError errorMessage={errors.email.message} />
          )}
          {errors.email?.type === "pattern" && (
            <FormError errorMessage="Please enter a valid email address!" />
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
          <select
            {...register("role", { required: true })}
            name="role"
            className="input my-3"
          >
            {Object.keys(Role).map((role, index) => (
              <option key={index}>{role}</option>
            ))}
          </select>
          <Button canClick={isValid} loading={loading} btnText="Sign Up" />
          {createAccountMutationResult?.createAccount.code==='failed' && (
            <FormError errorMessage={createAccountMutationResult.createAccount.message} />
          )}
        </form>
        <div>
          Existing Nuber?{" "}
          <Link to="/" className=" text-lime-600 hover:underline">
            {" "}
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};
