import type { NextPage } from 'next'
import Sidebar from '../components/Sidebar.js'
import Center from '../components/Center.js'
import Head from 'next/head'


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

      <div>{/*Player*/}</div>
    </div>

  )
}

export default Home
