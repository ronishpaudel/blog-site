import Button from "@/components/Button";
import React, { ElementRef, FC, useRef } from "react";
import { InputName } from "@/components/InputName";
import AuthHeaderlogo from "@/components/AuthHeaderlogo";
import { useRouter } from "next/router";
import AuthFooter from "@/components/AuthFooter";
import { SrLogo } from "../../../public";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignInMutation } from "@/hooks/useSigninMutation";
import { PublicRoute } from "@/components/hoc/PublicRoute";

interface ISignInData {
  id: number;
  email: string;
  password: string;
  token: string;
}

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(18),
});

const index: FC = () => {
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignInData>({
    resolver: zodResolver(schema),
  });
  const { mutateAsync: logIn } = useSignInMutation();
  const onSubmit = async (data: ISignInData) => {
    try {
      const response = await logIn({
        email: data.email,
        password: data.password,
        id: data.id,
      });

      localStorage.setItem("jwtToken", response.token);

      console.log("Token received:", response.token);
      await push("/");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

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
              onSubmit={handleSubmit(onSubmit)}
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
                  onClick={() => "/"}
                  maxWidth="mW115"
                  text={"LOGIN"}
                  preset="primary"
                  className="login-btn"
                />

                <span onClick={() => push("/auth/forget-password")}>
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

export default PublicRoute(index);
