import Button from "@/components/Button";
import React, { ElementRef, FC, useRef } from "react";
import { TextInput } from "@/components/TextInput";
import AuthHeaderlogo from "@/components/AuthHeaderlogo";
import { useRouter } from "next/router";
import AuthFooter from "@/components/AuthFooter";
import { SrLogo } from "../../../public";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignInMutation } from "@/hooks/useSigninMutation";
import { authStore } from "@/store/authStore";
import { saveItemToLocalStorage } from "@/store/storage";
import { PublicRoute } from "../../../PublicRoute";

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

  const { mutate: logIn } = useSignInMutation({
    onSuccess: async (res: { token: string }) => {
      saveItemToLocalStorage("auth", res.token);

      // console.log({ res });

      authStore.setLoggedIn();

      console.log("Token received:", res.token);
      await push("/");
    },
  });

  const onSubmit = async (data: ISignInData) => {
    logIn({
      email: data.email,
      password: data.password,
      id: data.id,
    });
  };

  return (
    <div>
      <div className="signup-page">
        <div className="signup">
          <AuthHeaderlogo
            onClick={() => push("/")}
            style={{ cursor: "pointer" }}
          />
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
              <TextInput
                text="Email Address*"
                maxWidth="mW345"
                name="email"
                register={register}
              />
              {errors.email && (
                <p style={{ color: "red" }}>{errors.email.message}</p>
              )}
              <TextInput
                text="Password*"
                maxWidth="mW345"
                name="password"
                type="password"
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
