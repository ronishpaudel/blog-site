import AuthHeaderlogo from "@/components/AuthHeaderlogo";
import { useRouter } from "next/router";
import React from "react";
import { SrLogo } from "../../../../public";
import { InputName } from "@/components/InputName";
import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown";

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
            <InputName
              placeholder="Email Address"
              text="Email Address"
              maxWidth="mW438"
            />
            <InputName
              placeholder="Company Name"
              text="Company Name"
              maxWidth="mW438"
            />
            <div className="signup-name">
              <div className="input-box-name">
                <Dropdown
                  style={{ maxWidth: "205px", width: "100%" }}
                  options={[
                    { displayName: "usa", id: 1 },
                    { displayName: "nepal", id: 2 },
                    { displayName: "canada", id: 3 },
                  ]}
                  onChange={(val) => console.log(val)}
                  label="Select Country"
                />
              </div>

              <InputName
                style={{ maxWidth: "205px", width: "100%" }}
                placeholder="Phone #"
                text={"Phone #"}
              />
            </div>
            <Button
              onClick={() => push("/auth/email-confirm")}
              text={"SIGN UP"}
              maxWidth="mW438"
            />
            <Button
              onClick={() => push("/auth")}
              text={"BACK TO LOGIN"}
              preset="secondary"
              maxWidth="mW438"
            />
          </div>
        </div>
        <div className="promo">
          <div className="promo-logo">
            <SrLogo />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
