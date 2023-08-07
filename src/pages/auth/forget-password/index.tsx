import AuthFooter from "@/components/AuthFooter";
import AuthHeaderlogo from "@/components/AuthHeaderlogo";
import Button from "@/components/Button";
import { InputName } from "@/components/InputName";
import { PublicRoute } from "@/components/hoc/PublicRoute";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
});
const index: FC = () => {
  const { push } = useRouter();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });
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
              <InputName
                text="Email Address"
                placeholder="Email Address*"
                maxWidth="mW345"
                register={register}
                name="email"
              />
              <p style={{ color: "red" }}>{errors.email?.message}</p>
              <Button
                onClick={() => push("/auth/reset-email-password")}
                text={"NEXT"}
                style={{ maxWidth: "110px", marginBottom: "77px" }}
                preset="primary"
              />
            </form>
            <Button
              onClick={() => push("/auth/finalise-registration")}
              text={"BACK TO LOGIN"}
              style={{ backgroundColor: "black" }}
              maxWidth="mW345"
            />
          </div>
        </div>
        <div>
          <AuthFooter style={{ marginTop: "-30px" }} />
        </div>
      </div>
    </>
  );
};

export default PublicRoute(index);
