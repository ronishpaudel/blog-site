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

interface IFormData {
  fname: string;
  lname: string;
  emailAddress: string;
  companyName: string;
  phNo: number;
}
const schema = z.object({
  fname: z.string().min(4).max(20),
  lname: z.string().min(4).max(20),
  emailAddress: z.string().email(),
  companyName: z.string().min(4).max(20),
  phNo: z.number(),
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
  return (
    <>
      <div className="signup-page">
        <div className="signup">
          <AuthHeaderlogo />
          <div className="signup-form">
            <p>Sign up to socialRepeat</p>
            <form
              onSubmit={handleSubmit((data) => console.log(data))}
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
                name="emailAddress"
                register={register}
              />
              {errors.emailAddress && (
                <p style={{ color: "red" }}>{errors.emailAddress.message}</p>
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
                    name="phNo"
                    register={register}
                    number={true}
                    maxWidth="mW440"
                  />
                  {errors.phNo && (
                    <p style={{ color: "red" }}>{errors.phNo.message}</p>
                  )}
                </div>
              </div>
              <Button
                // onClick={() => {}}
                onClick={() => push("/auth/email-confirm")}
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
