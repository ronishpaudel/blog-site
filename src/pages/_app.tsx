import type { AppProps } from "next/app";
import "../styles/style.css";
import "../styles/header.css";
import "../styles/content.css";
import "../styles/card.css";
import "../styles/footer.css";
import "../styles/newsLetter.css";
import "../pages/[id]/index.css";
import "../pages/auth/index.css";
import "./auth/signup/index.css";
import "./auth/email-confirm/index.css";
import "./auth/forget-password/index.css";
import "./create-blog/index.css";
import "../components/lexical/editor.css";
import "../styles/cardSkeleton.css";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Work_Sans } from "@next/font/google";
import { useEffect } from "react";
import { authStore } from "@/store/authStore";
import {
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
} from "@/store/storage";
import { useSnapshot } from "valtio";
import { API } from "@/api/API";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { editorConfig } from "@/components/lexical/Editor";
import React from "react";

const workSans = Work_Sans({
  subsets: ["latin"],
});
export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  const { dbUser } = useSnapshot(authStore);

  const token =
    typeof window !== "undefined" ? getItemFromLocalStorage("auth") : "";

  const fetchDBUser = async () => {
    console.log("hello user");
    const res = await API.get("/user/me");
    return res.data;
  };

  const fetchUser = async () => {
    const data = await fetchDBUser();
    console.log({ data });
    if (data) {
      authStore.setDbUser(data);
    }
  };

  useEffect(() => {
    if (token) {
      authStore.setLoggedIn();
      authStore.setTokenFetching(false);
      try {
        if (!dbUser?.id && token) {
          fetchUser();
        }
      } catch (error) {
        authStore.setLogOut();
        removeItemFromLocalStorage("auth");
      }
    } else {
      authStore.setLogOut();
      authStore.setTokenFetching(false);
    }
  }, [token]);
  return (
    <div className={workSans.className}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <LexicalComposer initialConfig={editorConfig}>
            <Component {...pageProps} />
          </LexicalComposer>
        </Hydrate>
      </QueryClientProvider>
    </div>
  );
}
