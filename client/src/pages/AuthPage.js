import React from "react";
import Header from "../components/header/Header";
import SignUp from "../components/signUp/SignUp";
import LogIn from "../components/logIn/LogIn";

const AuthPage = () => {
  return (
    <div
    // className={styles.authContainer}
    >
      <Header authPage={true} />
      <LogIn />
      <SignUp />
    </div>
  );
};

export default AuthPage;
