import AuthHeaderlogo from "@/components/AuthHeaderlogo";
import Button from "@/components/Button";
import { InputName } from "@/components/InputName";
import { useRouter } from "next/router";

import React from "react";

const index = () => {
  const { push } = useRouter();
  return (
    <>
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
              <span> RESET YOUR PASSWORD</span>
              <p>Type in your registered email address to reset password</p>
            </div>
            <InputName
              text="Email Address"
              placeholder="Email Address*"
              style={{ maxWidth: "345px", width: "100%" }}
            />
            <Button
              onClick={() => push("/auth/resetEmailPw")}
              text={"NEXT"}
              style={{ maxWidth: "110px", marginBottom: "77px" }}
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
