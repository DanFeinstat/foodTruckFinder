import React from "react";
import SignUp from "../components/signUp/SignUp";
import LogIn from "../components/logIn/LogIn";

const AuthPage = () => {
  return (
    <div className={StyleSheet.authContainer}>
      <SignUp />
      <LogIn />
    </div>
  );
};

export default AuthPage;
