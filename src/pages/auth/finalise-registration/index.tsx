import AuthHeaderlogo from "@/components/AuthHeaderlogo";
import { SrLogo } from "../../../../public";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import { TextInput } from "@/components/TextInput";
import AuthFooter from "@/components/AuthFooter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { PublicRoute } from "@/components/hoc/PublicRoute";

interface IFormPw {
  password: string;
  cPassword: string;
}

const schema = z
  .object({
    password: z.string().min(4).max(20),
    cPassword: z.string().min(4).max(20),
  })
  .refine((data) => data.password === data.cPassword, {
    message: "Password donot match",
    path: ["cPassword"],
  });

const index: FC = () => {
  const { push } = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormPw>({
    resolver: zodResolver(schema),
  });
  return (
    <div className="signup-page">
      <div className="signup-page-wrapper">
        <AuthHeaderlogo />
        <div className="registration-wrapper">
          <div className="registration-btn">
            <div
              className="finalise-header"
              style={{ color: "rgba(0, 0, 0, 0.87", fontWeight: " 500" }}
            >
              SET YOUR PASSWORD
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
                  text="password"
                  placeholder="Enter your password"
                  name="password"
                  register={register}
                />
              </div>
              <div>
                <TextInput
                  text="Confirm password"
                  placeholder="Confirm your password"
                  name="cPassword"
                  register={register}
                />
                <span style={{ color: "red" }}>
                  {errors.cPassword?.message}
                </span>
              </div>
              <Button
                onClick={() => push("/")}
                text={"SIGN UP"}
                preset="primary"
                maxWidth="mW440"
              />
            </form>
            <Button
              onClick={() => push("/auth/email-confirm")}
              text={"BACK TO LOGIN"}
              preset="secondary"
              maxWidth="mW440"
            />
          </div>
        </div>
        <div>
          <AuthFooter style={{ marginTop: "-30px" }} />
        </div>
      </div>

      <div className="promo" style={{ backgroundColor: "#C9CCD3" }}>
        <div className="promo-logo">
          <SrLogo />
        </div>
      </div>
    </div>
  );
};

export default PublicRoute(index);
