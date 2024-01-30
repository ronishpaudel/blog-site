import Document, { Html, Head, Main, NextScript } from "next/document";
import BlogPage from "./head";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <BlogPage />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
