//@ts-nocheck
import { DialogHeader, Dialog, DialogContent } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useSignInMutation } from "@/hooks/mutationHook/useSigninMutation";
import { saveItemToLocalStorage } from "@/store/storage";
import { authStore } from "@/store/authStore";
import { useState } from "react";
import { THEME_PALETTE, themeStore } from "@/store/colorPalette.store";
import { useSnapshot } from "valtio";
import { modalStore } from "@/store/modalStore";
import { TUser } from "@/hooks/queryHook/useAuthorInfo";
import { useRegistration } from "@/hooks/mutationHook/useRegistration";
import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import { ColorRing } from "react-loader-spinner";
import { useToast } from "./ui/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormMessage } from "./ui/form";

const formSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1),
});

function SignIn({ onClick }: { onClick?: () => void }) {
  const [errorMessage, setErrorMessage] = useState("");
  const { toast } = useToast();

  const { mutate, isLoading, isError } = useSignInMutation({
    onSuccess: async (res: { token: string }) => {
      saveItemToLocalStorage("auth", res.token);
      authStore.setLoggedIn();
      modalStore.signInModal.setOpen(false);
    },
    onError: (error) => {
      console.log({ error: error.errorType });
      if (error) {
        const { errorType, message } = error;
        setErrorMessage(message);

        if (errorType === "USER_NOT_FOUND") {
          setErrorMessage(" Please sign up.User not found ");
        } else if (errorType === "INVALID_CREDENTIALS") {
          setErrorMessage("Password doesn't match");
        } else if (errorType === "USER_NOT_VERIFIED") {
          setErrorMessage("We have sent you a mail.pls,verify your account");
        }
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function handleShowSignUp() {
    modalStore.signUpModal.setOpen(true);
  }
  function handleShowForgotPassword() {
    modalStore.forgotPassword.setOpen(true);
  }
  const themeSnap = useSnapshot(themeStore);
  const { signInModal } = useSnapshot(modalStore);

  const { mutate: googleMutate } = useRegistration({
    onSuccess: () => {
      modalStore.signInModal.setOpen(false);
    },
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
        onSuccess: (data) => {
          console.log("User created:", data);
          saveItemToLocalStorage("auth", JSON.stringify(tokenId));
          window.location.reload();
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  return (
    <div>
      <Dialog open={signInModal.open}>
        <DialogContent
          onCloseClick={() => modalStore.signInModal.setOpen(false)}
        >
          <DialogHeader>
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
                  Sign in
                </h1>
              </div>
              <div>
                <p className="w-24 text-gray-500">No Account ? </p>
                <div
                  className="text-blue-500 cursor-pointer hover:text-blue-600"
                  onClick={handleShowSignUp}
                >
                  Sign up
                </div>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-3">
                  <span
                    style={{ color: THEME_PALETTE[themeSnap.theme].textColor }}
                    className="mt-10"
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
                            className="max-w-sm  border-gray-400 h-12 "
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </>
                    )}
                  />
                  <span
                    style={{
                      color: THEME_PALETTE[themeSnap.theme].textColor,
                    }}
                    className="mt-"
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
                            placeholder="Password"
                            className="max-w-sm  border-gray-400 h-12 "
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </>
                    )}
                  />
                </div>
                <span
                  onClick={handleShowForgotPassword}
                  className="text-base max-w-md mt-1.5 text-blue-500 cursor-pointer hover:text-blue-600 flex justify-end "
                >
                  Forgot password?
                </span>

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
                  ) : null}
                  <Button variant={"blue"} type="submit">
                    Sign in
                  </Button>
                </div>
              </form>
            </Form>
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
            <div className="w-full grid grid-cols-2 gap-4 mt-2  ">
              <GoogleOAuthProvider clientId={CLIENT_ID}>
                <GoogleLogin
                  size="large"
                  shape="square"
                  width={367}
                  onSuccess={handleGoogleLoginSuccess}
                  onError={handleGoogleLoginError}
                  text="continue_with"
                />
              </GoogleOAuthProvider>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export { SignIn };
