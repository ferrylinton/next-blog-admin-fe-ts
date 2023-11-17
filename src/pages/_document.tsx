import { Html, Head, Main, NextScript } from 'next/document';
import type { DocumentProps } from 'next/document';
import i18nextConfig from '../../next-i18next.config';

export default function Document(props: DocumentProps) {

  const currentLocale = props.__NEXT_DATA__.locale || i18nextConfig.i18n.defaultLocale;

  return (
    <Html lang={currentLocale}>
      <Head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.8.0/build/styles/github.min.css"></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
