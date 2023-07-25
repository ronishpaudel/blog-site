import React from "react";
import { Vector } from "../../../public";
import { useRouter } from "next/router";
import AuthHeaderlogo from "@/components/AuthHeaderlogo";
import { InputName } from "@/components/InputName";

const index = () => {
  const { push } = useRouter();
  return (
    <>
      <div className="page">
        <div className="login">
          <AuthHeaderlogo />
          <div className="login-form">
            <h6>Sign in</h6>
            <InputName
              text="Email Address"
              placeholder="Email Address"
              style={{ width: "333px", margin: "0px" }}
            />
            <InputName
              text="Password"
              placeholder="Password"
              style={{ width: "333px", margin: "0px" }}
            />
            <div className="login-btn">
              <button>
                <img src="/Arrow.png" />
              </button>
              <p>Forgot you password?</p>
            </div>
            <button className="create-btn" onClick={() => push("/signup")}>
              CREATE NEW ACCOUNT
            </button>
          </div>
        </div>
        <div className="promo">
          <div className="login-promotion">
            <div className="promo-text">
              <span>Schedule</span>
              <span>Posts</span>
              <span>And Monitor</span>
              <span>Success</span>
            </div>
            <div className="vector">
              <Vector />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
