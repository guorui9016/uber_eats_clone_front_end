import React from "react";
import { useForm } from "react-hook-form";
import { isLoggedInVar } from "../apollo";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Signup } from "../pages/signup";
import { Login } from "../pages/login";

export const LoggedOutRouter = () => {
  return (
    
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};
