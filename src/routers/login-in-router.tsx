import React from "react";
import { useForm } from "react-hook-form";
import { isLoggedInVar } from "../apollo";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Signup } from "../pages/signup";
import { Login } from "../pages/login";
import { NotFound } from "../pages/404";

export const LogInRouter = () => {
  return (
    
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />}/>
        <Route element={<NotFound />} />
      </Routes>
    </Router>
  );
};
