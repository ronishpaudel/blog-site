import AuthHeaderlogo from "@/components/AuthHeaderlogo";
import Button from "@/components/Button";
import { InputName } from "@/components/InputName";
import { useRouter } from "next/router";
import React from "react";

const index = () => {
  const { push } = useRouter();
  return (
    <div>
      <AuthHeaderlogo />
      <div
        className="pw-wrapper"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className="inputNbtns">
          <div className="forgetpw-text">
            <span>Reset your password</span>
            <p>Type in your new password</p>
          </div>
          <InputName
            text={"New Password"}
            placeholder={"New Password*"}
            style={{ maxWidth: "345px", width: "100%", marginTop: "41px" }}
            maxWidth="mW345"
          />
          <InputName
            text={"Retype New Password"}
            placeholder={"Retype New Password*"}
            maxWidth="mW345"
          />
          <Button
            text={"Reset"}
            onClick={() => push("/")}
            style={{ marginBottom: "77px" }}
            maxWidth="mW115"
          />
          <Button
            onClick={() => push("/auth/reset-email-password")}
            text={"BACK TO LOGIN"}
            preset="secondary"
            maxWidth="mW345"
          />
        </div>
      </div>
    </div>
  );
};

export default index;
