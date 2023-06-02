import { KioskoProvider } from '@/context/KioskoProvider'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <KioskoProvider>
      <Component {...pageProps} />
    </KioskoProvider>
  )
}
