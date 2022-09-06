import { gql, useMutation } from "@apollo/client";
import { getValue } from "@testing-library/user-event/dist/utils";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Button } from "../components/button";
import { FormError } from "../components/form-error";
import logo from "../images/uber-eats.svg"


const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccountMutation($createAccountInput:CreateAccountInputDto! ) {
    createAccount(input: $createAccountInput){
      code
      message
    }
  }
`;

interface ICreateAccountForm {
  email: string
  password: string
  role: string
}

export const Signup = () => {
    const {
      register,
      getValues,
      formState:{errors, isValid},
      handleSubmit
    } = useForm<ICreateAccountForm>()


  const [createAccountMutation] = useMutation(CREATE_ACCOUNT_MUTATION)
  
  

  return (
    <div className=" h-screen flex items-center flex-col mt-10 lg:mt-28">
        <Helmet>
        <title>Sign Up | Nuber Eats</title>
      </Helmet>
      <img className=" w-full max-w-xs flex flex-col items-center mb-16" src={logo}/>
      <div className=" bg-white w-full max-w-lg px-5 py-5 font-center font-serif text-lg rounded-lg">
        <h4 className=" font-bold mb-3">Let's get started</h4>
        <form className="flex flex-col mb-5">
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
          <Button canClick={isValid} loading={false} btnText="Sign Up"/>
        </form>
        <div>
          New to Nuber?  <Link to="/" className=" text-lime-600 hover:underline"> Sing Up</Link>
        </div>
      </div>
    </div>
  );
};
