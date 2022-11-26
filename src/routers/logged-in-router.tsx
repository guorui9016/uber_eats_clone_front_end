import { gql, useQuery } from "@apollo/client";
import { loadavg } from "os";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { NotFound } from "../pages/404";
import { Store } from "../pages/client/store";


const ClientRoutes = () => (
<Routes>
    <Route path="/" element={<Store />} />
</Routes>
)

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
    // console.log("LoggedInRouter -> me - role: " + data.me.role)

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
        // <div>
        //     <h1>Logged In</h1>
        //     <h1>{data.me.role}</h1>
        //     <h1>{data.email}</h1>
        //     <button onClick={()=> localStorage.setItem('token', '' )}>Logout Button</button>
        // </div>
        <Router>
            <Routes>
                {/* <Route {data.me.role === 'Client' && <ClientRoutes/>} /> */}
                <Route path="/" element = {<ClientRoutes/>} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </Router>
    )
}
