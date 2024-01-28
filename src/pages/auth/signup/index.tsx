import AuthHeaderlogo from "@/components/AuthHeaderlogo";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { SrLogo } from "../../../../public";
import { TextInput } from "@/components/TextInput";
import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown";
import { useForm } from "react-hook-form";
import { useSignUpMutation } from "@/hooks/mutationHook/useSignUpMutation";
import { PublicRoute } from "@/components/hoc/PublicRoute";

interface IFormData {
  fname: string;
  lname: string;
  email: string;
  phoneNumber: number;
  password: string;
  cPassword: string;
  username: string;
}

const SignUp: FC = () => {
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>();
  const { mutateAsync: createUser } = useSignUpMutation({
    onSuccess: () => {
      push("/auth/email-sent");
    },
    onError(E: any) {
      console.log(E);
    },
  });

  const onSubmit = async (data: IFormData) => {
    console.log("Input userData:", data);
    try {
      await createUser({
        email: data.email,

        password: data.password,
        username: data.username,
      });
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <>
      <div className="signup-page">
        <div className="signup">
          <AuthHeaderlogo
            onClick={() => push("/auth")}
            style={{ cursor: "pointer" }}
          />
          <div className="signup-form">
            <div>
              <p>Sign up to socialRepeat</p>
            </div>
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
                  <TextInput
                    text="First Name*"
                    name="fname"
                    register={register}
                  />
                  {errors.fname && (
                    <p style={{ color: "red" }}>{errors.fname.message}</p>
                  )}
                </div>
                <div style={{ maxWidth: "440px", width: "100%" }}>
                  <TextInput
                    text="Last Name*"
                    name="lname"
                    register={register}
                  />
                  {errors.lname && (
                    <p style={{ color: "red" }}>{errors.lname.message}</p>
                  )}
                </div>
              </div>
              <TextInput
                text="Email Address*"
                maxWidth="mW438"
                name="email"
                register={register}
              />
              {errors.email && (
                <p style={{ color: "red" }}>{errors.email.message}</p>
              )}

              <div className="signup-name">
                <div
                  className="input-box-name"
                  style={{ maxWidth: "440px", width: "100%" }}
                >
                  <Dropdown
                    style={{ color: "black" }}
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
                  <TextInput
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
                <TextInput
                  text="Password*"
                  name="password"
                  type="password"
                  register={register}
                />
              </div>
              <div>
                <TextInput
                  text="Confirm password*"
                  name="cPassword"
                  type="password"
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

export default PublicRoute(SignUp);
