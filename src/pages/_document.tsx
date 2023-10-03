import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  const seoContent = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://tosinamuda.com/',
        url: 'https://tosinamuda.com/',
        name: 'Tosin Amuda',
        description:
          'Tosin Amuda Website',
        inLanguage: 'en-US',
      }
    ],
  }

  return (
    <Html lang="en-US">
      <Head>
        <link rel="icon" type="image/png" href="favicon.png" />
        <Script
          id="app-ld-json"
          type="application/ld+json"
          className="yoast-schema-graph"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(seoContent, null, '\t'),
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
