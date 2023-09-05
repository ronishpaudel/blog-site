import { useRouter } from "next/router";
import { useSignUpVerifyTokenMutation } from "@/hooks/useSignUpVerifyTokenMutation";
import { FC, useEffect } from "react";
import { PublicRoute } from "@/components/hoc/PublicRoute";
import { saveItemToLocalStorage } from "@/store/storage";
import { authStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { useSnapshot } from "valtio";
import { THEME_PALETTE, themeStore } from "@/store/colorPalette.store";

const index: FC = () => {
  const { push, query } = useRouter();
  const { mutate, isLoading, isSuccess, isError } =
    useSignUpVerifyTokenMutation({
      onSuccess: async (res: { token: string }) => {
        saveItemToLocalStorage("auth", res.token);
        authStore.setLoggedIn();
      },
    });
  console.log({ token: query.token });

  useEffect(() => {
    if (query.token && typeof query.token === "string") {
      mutate(query.token);
    }
  }, [query.token]);

  function handleOnClick() {
    const token = query.token;
    if (token) {
      saveItemToLocalStorage("auth", token);
      authStore.setLoggedIn();
      push("/");
    } else {
      return;
    }
  }
  const themeSnap = useSnapshot(themeStore);
  return (
    <>
      <Header />
      <div
        style={{
          backgroundColor: THEME_PALETTE[themeSnap.theme].cardBg,
        }}
        className=" h-[100vh] "
      >
        <div
          style={{
            backgroundColor: THEME_PALETTE[themeSnap.theme].inputBg,
            border: `1px solid ${THEME_PALETTE[themeSnap.theme].footerBg}`,
          }}
          className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full"
        >
          <div className="reset-wrapper">
            {isLoading && (
              <div
                style={{
                  color: THEME_PALETTE[themeSnap.theme].textColor,
                }}
                className="flex flex-col items-center text-xl"
              >
                <h3>Loading...</h3>
                <h4>Pls wait for a while </h4>
                <h4>We are verfying your acc</h4>
              </div>
            )}
            <div>
              <div
                className="email-txt text-center text-xl"
                style={{ color: THEME_PALETTE[themeSnap.theme].textColor }}
              >
                {isSuccess && <h2>Your acc has been verified successfully</h2>}
                {isError && <h1>Invalid userInfo</h1>}
              </div>

              <Button
                onClick={handleOnClick}
                variant={"blue"}
                className="mt-10"
              >
                CONTINUE TO HOMEPAGE
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PublicRoute(index);
