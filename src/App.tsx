import { gql, useQuery, useReactiveVar } from "@apollo/client";
import React from "react";
import { isLoggedInVar } from "./apollo";
import { LogInRouter } from "./routers/login-in-router";
import { LoggedInRouter } from "./routers/logged-in-router";



export const App = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar)
  console.log("App -> isLoggedInVar: " + isLoggedIn)
  return isLoggedIn ? <LoggedInRouter /> : <LogInRouter />
  // return <LogInRouter />
}

export default App;