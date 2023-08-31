import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Main from "@/components/Main";
import { SignUp } from "@/components/signUp";
import { SignIn } from "@/components/signIn";
import ForgotPassword from "@/components/forgetPassword";

const index = () => {
  return (
    <>
      <Header />
      <Main />
      <Footer />
      <SignUp />
      <SignIn />
      <ForgotPassword />
    </>
  );
};

export default index;
