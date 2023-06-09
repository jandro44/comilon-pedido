import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <link rel="shortcut icon" href="/assets/logo.png" />
      </Head>
      <body className='bg-gray-200'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
