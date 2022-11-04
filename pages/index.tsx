import type { NextPage } from 'next'
import Sidebar from '../components/Sidebar.js'
import Center from '../components/Center.js'
import Player from '../components/Player.js'
import Head from 'next/head'
import { getSession } from 'next-auth/react'

const Home: NextPage = () => {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Spotify Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <h1>Spotify But Better</h1> 
    
    <main>
      <Sidebar/>
      <Center/>
    </main>

      <div className="sticky-bottom-0"><Player/></div>
    </div>

  )
}

export default Home

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  return{
    props: {
      session,
    }
  }
}