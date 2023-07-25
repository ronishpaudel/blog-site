import AuthHeaderlogo from "@/components/AuthHeaderlogo";
import { useRouter } from "next/router";
import React from "react";
import { SrLogo } from "../../../public";
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
              style={{ width: "438px" }}
            />
            <InputName
              placeholder="Company Name"
              text="Company Name"
              style={{ width: "438px" }}
            />
            <div className="signup-name">
              <div className="input-box-name">
                <Dropdown
                  style={{ width: "195px" }}
                  options={[
                    { displayName: "usa", id: 1 },
                    { displayName: "nepal", id: 2 },
                    { displayName: "canada", id: 3 },
                  ]}
                  onChange={(val) => console.log(val)}
                  label="Select Country"
                />
              </div>
              <div className="input-box-name">
                <input
                  style={{ width: "195px" }}
                  placeholder="Phone #"
                  required
                />
                <span>Phone #</span>
              </div>
            </div>
            <Button onClick={() => push("/auth")} text={"SIGN UP"} />
            <Button
              onClick={() => push("/auth")}
              text={"BACK TO LOGIN"}
              style={{ backgroundColor: "black" }}
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
