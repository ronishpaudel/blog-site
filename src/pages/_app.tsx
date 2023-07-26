import type { AppProps } from "next/app";
import "../styles/style.css";
import "../styles/content.css";
import "../styles/card.css";
import "../styles/footer.css";
import "../styles/newsLetter.css";
import "../pages/[id]/index.css";
import "../pages/auth/index.css";
import "./auth/signup/index.css";
import "./auth/email-confirm/index.css";
import "./auth/forgetPw/index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Work_Sans } from "@next/font/google";

const workSans = Work_Sans({
  subsets: ["latin"],
});
export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <div className={workSans.className}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </div>
  );
}
