import React from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { useState } from "react";
import { useSearch } from "@tanstack/react-router";

const Auth = () => {
  const search = useSearch({ from: "/auth" });
  const mode = search.mode || "login";
  return <div>{mode == "login" ? <LoginForm /> : <RegisterForm />}</div>;
};

export default Auth;
