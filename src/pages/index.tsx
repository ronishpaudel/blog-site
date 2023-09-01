import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Main from "@/components/Main";
import { SignUp } from "@/components/signUp";
import { SignIn } from "@/components/signIn";
import ForgotPassword from "@/components/forgetPassword";
import { SkeletonTheme } from "react-loading-skeleton";
import { useSnapshot } from "valtio";
import { THEME_PALETTE, themeStore } from "@/store/colorPalette.store";

const index = () => {
  const themeSnap = useSnapshot(themeStore);
  return (
    <>
      <SkeletonTheme
        baseColor={THEME_PALETTE[themeSnap.theme].baseColor}
        highlightColor={THEME_PALETTE[themeSnap.theme].highlightColor}
      >
        <Header />
        <Main />
        <Footer />
        <SignUp />
        <SignIn />
        <ForgotPassword />
      </SkeletonTheme>
    </>
  );
};

export default index;
