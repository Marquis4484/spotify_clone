import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider} from "next-auth/react";
import {RecoilRoot} from "recoil";

type session = {}

function MyApp({ Component, pageProps,}: AppProps< {session: any;}>)  {

  return ( 
  <SessionProvider session={pageProps.session}>
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  </SessionProvider>
  )
 
  
}

export default MyApp
