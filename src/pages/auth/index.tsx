import EmailInputBox from "@/components/EmailInputBox";
import PasswordInputBox from "@/components/PasswordInputBox";
import React from "react";

const index = () => {
  return (
    <>
      <div className="page">
        <div className="login">
          <div className="login-header-logo">
            <img src="sr-logo.png" />
          </div>
          <div className="login-form">
            <h6>Sign in</h6>
            <EmailInputBox />
            <PasswordInputBox />
            <div className="login-btn">
              <button>
                <img src="/Arrow.png" />
              </button>
              <p>Forgot you password?</p>
            </div>
            <button className="create-btn"> CREATE NEW ACCOUNT</button>
          </div>
        </div>
        <div className="promo">
          <div className="login-promotion">
            <div className="vector"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
