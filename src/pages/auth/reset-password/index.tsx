import AuthFooter from "@/components/AuthFooter";
import AuthHeaderlogo from "@/components/AuthHeaderlogo";
import Button from "@/components/Button";
import { TextInput } from "@/components/TextInput";
import { PublicRoute } from "@/components/hoc/PublicRoute";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z
  .object({
    newPassword: z.string().min(4).max(20),
    retypeNewPassword: z.string().min(4).max(20),
  })
  .refine((data) => data.newPassword === data.retypeNewPassword, {
    message: "password dont match",
    path: ["retypeNewPassword"],
  });
const index: FC = () => {
  const { push } = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      newPassword: "",
      retypeNewPassword: "",
    },
  });
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
          <form
            onSubmit={handleSubmit((data) => console.log(data))}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              maxWidth: "440px",
              width: "100%",
            }}
          >
            <div>
              <TextInput
                text={"New Password"}
                placeholder={"New Password*"}
                style={{ maxWidth: "345px", width: "100%", marginTop: "41px" }}
                maxWidth="mW345"
                register={register}
                name="newPassword"
              />
            </div>
            <div>
              <TextInput
                text={"Retype New Password"}
                placeholder={"Retype New Password*"}
                maxWidth="mW345"
                name="retypeNewPassword"
                register={register}
              />
              {errors.retypeNewPassword?.message}
            </div>
            <Button
              text={"Reset"}
              onClick={() => push("/")}
              style={{ marginBottom: "77px" }}
              maxWidth="mW115"
            />
          </form>
          <Button
            onClick={() => push("/auth/reset-email-password")}
            text={"BACK TO LOGIN"}
            preset="secondary"
            maxWidth="mW345"
          />
        </div>
      </div>
      <div>
        <AuthFooter style={{ marginTop: "-30px" }} />
      </div>
    </div>
  );
};

export default PublicRoute(index);
