import { Html, Head, Main, NextScript } from "next/document";
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head />
      <body>
        <SpeedInsights />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
