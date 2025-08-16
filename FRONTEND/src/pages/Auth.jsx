import React from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { useState } from "react";

const Auth = () => {
  const [login, setLogin] = useState(true);
  return (
    <div>
      {login ? (
        <LoginForm onToggleForm={setLogin} />
      ) : (
        <RegisterForm onToggleForm={setLogin} />
      )}
    </div>
  );
};

export default Auth;
