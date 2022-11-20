import { gql, useQuery } from "@apollo/client";
import { loadavg } from "os";
import React from "react";
import { authTokenVar, isLoggedInVar } from "../apollo";

const ME_QUERY = gql`
    query meQuery {
        me {
            email  
            role
            verified
        }
    }
`

export const LoggedInRouter = () => {

    const {data, loading, error} = useQuery(ME_QUERY)
    console.log("LoggedInRouter -> me query: " + data)

    if(!data || loading){
        return (
            <div className="h-screen flex justify-center items-center">
                <span className=" font-medium text-xl tracking-wide">Loading ...</span>
            </div>
        )
    }

    if(error){
        return (
            <div className=" h-screen flex justify-start items-start">
                <span>{error.message}</span>
            </div>
        )
    }

    return (
        <div>
            <h1>Logged In</h1>
            <h1>{data.role}</h1>
            <h1>{data.email}</h1>
            <button onClick={()=> localStorage.setItem('token', '' )}>Logout Button</button>
        </div>
    )
}
