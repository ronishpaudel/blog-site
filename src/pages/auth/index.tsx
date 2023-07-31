import Button from "@/components/Button";
import React, { ElementRef, useRef } from "react";
import { InputName } from "@/components/InputName";
import AuthHeaderlogo from "@/components/AuthHeaderlogo";
import { useRouter } from "next/router";
import AuthFooter from "@/components/AuthFooter";
import { SrLogo } from "../../../public";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email().min(4).max(18),
  password: z.string().min(4).max(18),
});

const index = () => {
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  console.log(errors);
  return (
    <div>
      <div className="signup-page">
        <div className="signup">
          <AuthHeaderlogo />
          <div className="signup-form">
            <div>
              <p className="signin">Sign in</p>
            </div>
            <form
              onSubmit={handleSubmit(
                (data) => console.log(data),
                (err) => {
                  console.log({ err });
                }
              )}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "18px",
                maxWidth: "343px",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <InputName
                placeholder="Email Address*"
                text="Email Address"
                maxWidth="mW345"
                name="email"
                register={register}
              />
              {errors.email && (
                <p style={{ color: "red" }}>{errors.email.message}</p>
              )}
              <InputName
                placeholder="Password*"
                text="Password"
                maxWidth="mW345"
                name="password"
                register={register}
              />
              {errors.password && (
                <p style={{ color: "red" }}>{errors.password.message}</p>
              )}
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
            </form>
            <Button
              onClick={() => push("/auth/signup")}
              text={"CREATE NEW ACCOUNT"}
              preset="secondary"
              maxWidth="mW345"
            />
          </div>
          <div>
            <AuthFooter />
          </div>
        </div>
        <div className="promo">
          <div className="promo-logo">
            <SrLogo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
