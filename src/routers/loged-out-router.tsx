import React from "react";
import { useForm } from "react-hook-form";
import { isLoggedInVar } from "../apollo";

export const LoggedOutRouter = () => {

    type LoginForm = {
        email: string
        password: string
    }

    const onClick = () => {
        isLoggedInVar(true)
    }

    const { register, watch, handleSubmit, formState: { errors } } = useForm<LoginForm>()

    const onSubmit = () => {
       
    }

    
    console.log(errors)
    return (
        <div>
            <h1>Logged Out</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input {...register("email", { required: "This is a required field", validate: (email:string) => email.includes("gmail.com") })} type="email" placeholder="Email" />
                    { errors.email && <p>{errors.email.message}</p> } 
                </div>
                <div>
                    <input {...register("password", { required: true })} name="password" type="password" required placeholder="Password" />
                </div>
                <div>
                    <button className="bg-blue-300 text-white">Submit</button>
                </div>
            </form>
        </div>
    )
}

