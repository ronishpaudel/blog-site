//@ts-nocheck
import { Dialog, DialogContent } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useSignUpMutation } from "@/hooks/mutationHook/useSignUpMutation";
import { saveItemToLocalStorage } from "@/store/storage";
import { useSnapshot } from "valtio";
import { THEME_PALETTE, themeStore } from "@/store/colorPalette.store";
import { modalStore } from "@/store/modalStore";
import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { useRegistration } from "@/hooks/mutationHook/useRegistration";
import { TUser } from "@/hooks/queryHook/useAuthorInfo";
import { ColorRing } from "react-loader-spinner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email("Enter a valid email"),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z
    .string()
    .min(2, { message: "Password must be at least 8 characters long" }),
});

function SignUp({ onSignInClick }: { onSignInClick?: () => void }) {
  const [errorMessage, setErrorMessage] = useState("");
  const { mutate, isSuccess, isLoading, isError } = useSignUpMutation({
    onSuccess: async (res: { token: string }) => {
      // console.log(res.token);
    },
    onError: (error) => {
      if (error) {
        const { errorType, message } = error;
        setErrorMessage(message);

        if (errorType === "User_already_exists") {
          setErrorMessage("User already exists");
        }
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    },
  });

  function handleOnClick() {
    modalStore.signUpModal.setOpen(false);
  }
  const themeSnap = useSnapshot(themeStore);
  const { signUpModal } = useSnapshot(modalStore);

  const { mutate: googleMutate } = useRegistration({
    onSuccess: () => {},
  });
  const handleGoogleLoginSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    const tokenId = credentialResponse.credential;

    if (!tokenId) {
      console.log("Token ID is missing");
      return;
    }

    const newUser: TUser = {
      googleAuthToken: tokenId,
    };

    try {
      googleMutate(newUser, {
        onSuccess: (res: { token: string }) => {
          saveItemToLocalStorage("auth", res.token);
        },
        onError: (error) => {
          console.log("Failed to create user:", error);
        },
      });
    } catch (error) {
      console.log("Registration failed:", error);
    }
  };

  const handleGoogleLoginError = () => {
    console.log("Login Failed");
  };
  const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  return (
    <div>
      <Dialog open={signUpModal.open}>
        <DialogContent
          onCloseClick={() => modalStore.signUpModal.setOpen(false)}
        >
          <div className="flex items-center justify-between  ">
            <div>
              <h1
                className="text-black text-xl"
                style={{ color: THEME_PALETTE[themeSnap.theme].textColor }}
              >
                techEra.io
              </h1>
              <h1
                className="text-5xl"
                style={{ color: THEME_PALETTE[themeSnap.theme].textColor }}
              >
                Sign up
              </h1>
            </div>
            <div>
              <p className=" text-gray-500">Have an Account ?</p>
              <p
                className="text-blue-500 cursor-pointer hover:text-blue-600"
                onClick={handleOnClick}
              >
                Sign in
              </p>
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col">
                <span
                  style={{ color: THEME_PALETTE[themeSnap.theme].textColor }}
                  className="mt-5"
                >
                  Email Address
                </span>

                <FormField
                  name="email"
                  render={({ field }) => (
                    <>
                      <FormControl>
                        <Input
                          placeholder=" Email Address"
                          {...field}
                          className="max-w-sm  border-gray-400 h-12 "
                        />
                      </FormControl>

                      <FormMessage />
                    </>
                  )}
                />
                <span
                  className="mt-2"
                  style={{ color: THEME_PALETTE[themeSnap.theme].textColor }}
                >
                  Username
                </span>
                <FormField
                  name="username"
                  render={({ field }) => (
                    <>
                      <FormControl>
                        <Input
                          placeholder="Username"
                          {...field}
                          className="max-w-sm  border-gray-400 h-12"
                        />
                      </FormControl>
                      <FormMessage />
                    </>
                  )}
                />

                <span
                  className="mt-3"
                  style={{ color: THEME_PALETTE[themeSnap.theme].textColor }}
                >
                  Password
                </span>
                <FormField
                  name="password"
                  render={({ field }) => (
                    <>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder=" Password"
                          {...field}
                          className="max-w-sm  border-gray-400 h-12"
                        />
                      </FormControl>

                      <FormMessage />
                    </>
                  )}
                />
              </div>
              <div className="mt-5 mb-5">
                {isLoading ? (
                  <div className="flex justify-center ">
                    <ColorRing
                      visible={true}
                      height="80"
                      width="80"
                      ariaLabel="blocks-loading"
                      wrapperStyle={{}}
                      wrapperClass="blocks-wrapper"
                      colors={[
                        "#4b6bfb",
                        "#4b6bfb",
                        "#4b6bfb",
                        "#4b6bfb",
                        "#4b6bfb",
                      ]}
                    />
                  </div>
                ) : isError ? (
                  <>
                    <div className="flex flex-col items-center">
                      <div className="text-red-500 text-center">
                        {errorMessage}
                      </div>
                    </div>
                  </>
                ) : isSuccess ? (
                  <div
                    className="text-xl text-center"
                    style={{ color: THEME_PALETTE[themeSnap.theme].textColor }}
                  >
                    Check your mail to activate the account
                  </div>
                ) : (
                  <Button
                    type="submit"
                    className="max-w-sm w-full text-center text-white bg-blue-500 hover:bg-blue-600 cursor-pointer"
                  >
                    Sign Up
                  </Button>
                )}
              </div>

              <div className="relative flex justify-center text-xs uppercase">
                <span
                  className="bg-background px-2 text-muted-foreground"
                  style={{
                    color: THEME_PALETTE[themeSnap.theme].textColor,
                    backgroundColor: THEME_PALETTE[themeSnap.theme].cardBg,
                  }}
                >
                  Or continue with
                </span>
              </div>
              <div className="w-full grid grid-cols-2 gap-4   ">
                <GoogleOAuthProvider clientId={CLIENT_ID}>
                  <GoogleLogin
                    size="large"
                    shape="square"
                    width={367}
                    onSuccess={handleGoogleLoginSuccess}
                    onError={handleGoogleLoginError}
                  />
                </GoogleOAuthProvider>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export { SignUp };
