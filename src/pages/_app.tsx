import { useEffect, useState } from "react";
import { AppProps } from "next/app";
import "../styles/style.css";
import "../styles/header.css";
import "../styles/content.css";
import "../styles/card.css";
import "../styles/footer.css";
import "../styles/newsLetter.css";
import "./[id]/index.css";
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
import { authStore } from "@/store/authStore";
import {
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
} from "@/store/storage";
import { useSnapshot } from "valtio";
import { API } from "@/api/API";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { editorConfig } from "@/components/lexical/Editor";
import { Analytics } from "@vercel/analytics/react";
import Router from "next/router";
import React from "react";
import Loading from "@/components/loading";

const workSans = Work_Sans({
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  const { dbUser } = useSnapshot(authStore);
  const [loading, setLoading] = useState(true);

  const token =
    typeof window !== "undefined" ? getItemFromLocalStorage("auth") : "";

  const fetchDBUser = async () => {
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
    const handleRouteChangeStart = () => setLoading(true);
    const handleRouteChangeComplete = () => setLoading(false);

    Router.events.on("routeChangeStart", handleRouteChangeStart);
    Router.events.on("routeChangeComplete", handleRouteChangeComplete);
    Router.events.on("routeChangeError", handleRouteChangeComplete);

    if (token) {
      authStore.setLoggedIn();
      authStore.setTokenFetching(false);
      try {
        if (!dbUser?.id && token) {
          fetchUser().finally(() => setLoading(false));
        } else {
          setLoading(false);
        }
      } catch (error) {
        authStore.setLogOut();
        removeItemFromLocalStorage("auth");
        setLoading(false);
      }
    } else {
      authStore.setLogOut();
      authStore.setTokenFetching(false);
      setLoading(false);
    }

    return () => {
      Router.events.off("routeChangeStart", handleRouteChangeStart);
      Router.events.off("routeChangeComplete", handleRouteChangeComplete);
      Router.events.off("routeChangeError", handleRouteChangeComplete);
    };
  }, [token]);

  return (
    <div className={workSans.className}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <LexicalComposer initialConfig={editorConfig}>
            {loading ? <Loading /> : <Component {...pageProps} />}
            <Analytics />
          </LexicalComposer>
        </Hydrate>
      </QueryClientProvider>
    </div>
  );
}
