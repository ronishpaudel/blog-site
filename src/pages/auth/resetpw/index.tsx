import AuthHeaderlogo from "@/components/AuthHeaderlogo";
import Button from "@/components/Button";
import { InputName } from "@/components/InputName";
import { useRouter } from "next/router";
import React from "react";

const index = () => {
  const { push } = useRouter();
  return (
    <div className="signup-page">
      <AuthHeaderlogo />
      <div
        className="signup"
        style={{
          width: "75%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="inputNbtns"
          style={{ maxWidth: "440px", width: "100%" }}
        >
          <div className="forgetpw-text">
            <span>Reset your password</span>
            <p style={{ fontSize: "14px" }}>Type in your new password</p>
          </div>
          <InputName
            text={"New Password"}
            placeholder={"New Password*"}
            style={{ maxWidth: "345px", width: "100%", marginTop: "41px" }}
          />
          <InputName
            text={"Retype New Password"}
            placeholder={"Retype New Password*"}
            style={{ maxWidth: "345px", width: "100%" }}
          />
          <Button
            text={"Reset"}
            style={{ maxWidth: "117px", width: "100%", marginBottom: "77px" }}
          />
          <Button
            onClick={() => push("/auth/resetpw")}
            text={"BACK TO LOGIN"}
            style={{ backgroundColor: "black", width: "344px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default index;
