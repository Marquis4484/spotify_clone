import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider} from "next-auth/react";

function MyApp({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  <SessionProvider session={}>
    return <Component {...pageProps} />
  </SessionProvider>
  
}

export default MyApp
