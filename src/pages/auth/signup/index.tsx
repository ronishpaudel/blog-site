import AuthHeaderlogo from "@/components/AuthHeaderlogo";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { SrLogo } from "../../../../public";
import { InputName } from "@/components/InputName";
import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown";
import AuthFooter from "@/components/AuthFooter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSignUpMutation } from "@/hooks/useSignUpMutation";

interface IFormData {
  fname: string;
  lname: string;
  email: string;
  companyName: string;
  phoneNumber: number;
  password: string;
  cPassword: string;
}
const schema = z
  .object({
    fname: z.string().min(4).max(20),
    lname: z.string().min(4).max(20),
    email: z.string().email(),
    companyName: z.string().min(4).max(20),
    phoneNumber: z.number(),
    password: z.string().min(4).max(20),
    cPassword: z.string().min(4).max(20),
  })
  .refine((data) => data.password === data.cPassword, {
    message: "Password donot match",
    path: ["cPassword"],
  });

const SignUp = () => {
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: zodResolver(schema),
  });
  const { mutateAsync: createUser } = useSignUpMutation();

  const onSubmit = async (data: IFormData) => {
    try {
      await createUser({
        companyName: data.companyName,
        email: data.email,
        fname: data.fname,
        lname: data.lname,
        phoneNumber: data.phoneNumber,
        password: data.password,
      });

      await push("/auth/email-confirm");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <>
      <div className="signup-page">
        <div className="signup">
          <AuthHeaderlogo />
          <div className="signup-form">
            <p>Sign up to socialRepeat</p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                maxWidth: "440px",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <div className="input-box">
                <div style={{ maxWidth: "440px", width: "100%" }}>
                  <InputName
                    placeholder="First Name"
                    text="First Name"
                    name="fname"
                    register={register}
                  />
                  {errors.fname && (
                    <p style={{ color: "red" }}>{errors.fname.message}</p>
                  )}
                </div>
                <div style={{ maxWidth: "440px", width: "100%" }}>
                  <InputName
                    placeholder="Last Name"
                    text="Last Name"
                    name="lname"
                    register={register}
                  />
                  {errors.lname && (
                    <p style={{ color: "red" }}>{errors.lname.message}</p>
                  )}
                </div>
              </div>
              <InputName
                placeholder="Email Address"
                text="Email Address"
                maxWidth="mW438"
                name="email"
                register={register}
              />
              {errors.email && (
                <p style={{ color: "red" }}>{errors.email.message}</p>
              )}
              <InputName
                placeholder="Company Name"
                text="Company Name"
                maxWidth="mW438"
                register={register}
                name="companyName"
              />
              {errors.companyName && (
                <p style={{ color: "red" }}>{errors.companyName.message}</p>
              )}
              <div className="signup-name">
                <div
                  className="input-box-name"
                  style={{ maxWidth: "440px", width: "100%" }}
                >
                  <Dropdown
                    style={{}}
                    options={[
                      { displayName: "usa", id: 1 },
                      { displayName: "nepal", id: 2 },
                      { displayName: "canada", id: 3 },
                    ]}
                    onChange={(val) => console.log(val)}
                    label="Select Country"
                  />
                </div>
                <div style={{ maxWidth: "440px", width: "100%" }}>
                  <InputName
                    placeholder="Phone #"
                    text={"Phone #"}
                    name="phoneNumber"
                    register={register}
                    number={true}
                    maxWidth="mW440"
                  />
                  {errors.phoneNumber && (
                    <p style={{ color: "red" }}>{errors.phoneNumber.message}</p>
                  )}
                </div>
              </div>
              <div>
                <InputName
                  text="password"
                  placeholder="Enter your password"
                  name="password"
                  register={register}
                />
              </div>
              <div>
                <InputName
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
                // onClick={() => {}}

                text={"SIGN UP"}
                maxWidth="mW438"
              />
            </form>
            <Button
              onClick={() => push("/auth")}
              text={"BACK TO LOGIN"}
              preset="secondary"
              maxWidth="mW438"
            />
          </div>
          <div>
            <AuthFooter style={{ marginTop: "90px" }} />
          </div>
        </div>
        <div className="promo">
          <div className="promo-logo">
            <SrLogo />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
