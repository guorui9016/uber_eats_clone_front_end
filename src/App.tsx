import { gql, useQuery, useReactiveVar } from "@apollo/client";
import React from "react";
import { isLoggedInVar } from "./apollo";
import { LoggedOutRouter } from "./routers/loged-out-router";
import { LoggedInRouter } from "./routers/login-in-router";



function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar )
  return isLoggedIn ? <LoggedInRouter/> : <LoggedOutRouter/>
}

export default App;