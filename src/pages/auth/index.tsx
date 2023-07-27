import Button from "@/components/Button";
import React from "react";
import { SrLogo } from "../../../public";
import { InputName } from "@/components/InputName";
import AuthHeaderlogo from "@/components/AuthHeaderlogo";
import { useRouter } from "next/router";
import AuthFooter from "@/components/AuthFooter";

const index = () => {
  const { push } = useRouter();
  return (
    <div>
      <div className="signup-page">
        <div className="signup">
          <AuthHeaderlogo />
          <div className="signup-form">
            <p className="signin">Sign in</p>
            <InputName
              placeholder="Email Address"
              text="Email Address"
              maxWidth="mW345"
            />
            <InputName placeholder="Password*" text="Passw" maxWidth="mW345" />
            <div className="text-btn">
              <Button
                onClick={() => push("/")}
                maxWidth="mW115"
                text={"LOGIN"}
                preset="primary"
                className="login-btn"
              />
              <span onClick={() => push("/auth/forgot-password")}>
                Forgot your password?
              </span>
            </div>
            <Button
              onClick={() => push("/auth/signup")}
              text={"CREATE NEW ACCOUNT"}
              preset="secondary"
              maxWidth="mW345"
            />
          </div>
        </div>
        <div className="promo" style={{ backgroundColor: "white" }}></div>
      </div>
    </div>
  );
};

export default index;
