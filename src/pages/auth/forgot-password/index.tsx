import AuthHeaderlogo from "@/components/AuthHeaderlogo";
import Button from "@/components/Button";
import { InputName } from "@/components/InputName";
import { useRouter } from "next/router";

import React from "react";

const index = () => {
  const { push } = useRouter();
  return (
    <>
      <div className="password-page-wrapper">
        <AuthHeaderlogo />
        <div className="pw-input">
          <div className="inputNbtns">
            <div className="forgetpw-text">
              <span> RESET YOUR PASSWORD</span>
              <p>Type in your registered email address to reset password</p>
            </div>
            <InputName
              text="Email Address"
              placeholder="Email Address*"
              maxWidth="mW345"
            />
            <Button
              onClick={() => push("/auth/reset-email-password")}
              text={"NEXT"}
              style={{ maxWidth: "110px", marginBottom: "77px" }}
              preset="primary"
            />
            <Button
              onClick={() => push("/auth/finalise-registration")}
              text={"BACK TO LOGIN"}
              style={{ backgroundColor: "black" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
