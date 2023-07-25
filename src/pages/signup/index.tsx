import AuthHeaderlogo from "@/components/AuthHeaderlogo";
import { useRouter } from "next/router";
import React from "react";
import { SrLogo } from "../../../public";
import { InputName } from "@/components/InputName";
import { CompanyName } from "@/components/CompanyName";
import Button from "@/components/Button";

const SignUp = () => {
  const { push } = useRouter();
  return (
    <>
      <div className="signup-page">
        <div className="signup">
          <AuthHeaderlogo />
          <div className="signup-form">
            <p>Sign up to socialRepeat</p>
            <div className="input-box">
              <InputName placeholder="First Name" text="First Name" />
              <InputName placeholder="Last Name" text="Last Name" />
            </div>
            <CompanyName />
            <div className="signup-name">
              <div className="input-box-name">
                <input
                  className="input-phone-n-country"
                  style={{ width: "195px" }}
                  placeholder="Country"
                  required
                />
                <img src="/Dropdown.png" />
                <span>Country</span>
              </div>
              <div className="input-box-name">
                <input
                  className="input-phone-n-country"
                  style={{ width: "195px" }}
                  placeholder="Phone #"
                  required
                />
                <span>Phone #</span>
              </div>
            </div>
            <div className="input-box-name">
              <input
                style={{ width: "410px", padding: "15px 12px" }}
                placeholder="Default Timezone"
                required
              />
              <img src="/Dropdown.png" />
              <span>Default Timezone</span>
            </div>
            <Button
              onClick={() => push("/auth")}
              style={{
                borderRadius: "4px",
                backgroundColor: "#0057FF",
                color: "white",
                maxWidth: "440px",
                width: "100%",
                height: "42px",
                marginTop: "28px",
                border: "none",
              }}
              text={"SIGN UP"}
            />
            <Button
              onClick={() => push("/auth")}
              style={{
                borderRadius: "4px",
                backgroundColor: "#000",
                color: "white",
                maxWidth: "440px",
                width: "100%",
                height: "42px",
                marginTop: "20px",
                border: "none",
              }}
              text={"BACK TO LOGIN"}
            />
          </div>
        </div>
        <div className="promotion">
          <SrLogo />
        </div>
      </div>
    </>
  );
};

export default SignUp;
