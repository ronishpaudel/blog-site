import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="Explore insightful articles and updates on technology, business, and innovation at techEra Blog."
        />
        <meta
          name="keywords"
          content="Technology, Business, Blog, Innovation, Software Development"
        />
        <meta name="author" content="techEra" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>techEra Blog | Explore Tech, Business, and Innovation</title>

        <meta
          property="og:title"
          content="techEra Blog | Explore Tech, Business, and Innovation"
        />
        <meta
          property="og:description"
          content="Explore insightful articles and updates on technology, business, and innovation at techEra Blog."
        />
        <meta
          property="og:image"
          content="URL to your blog logo or featured image"
        />
        <meta property="og:url" content="URL to your blog" />
        <meta name="twitter:card" content="summary_large_image" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
