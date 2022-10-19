import React from 'react'
import {CheveronDownIcon} from '@heroicons/react/24/outline';
const {data: session} = useSession();

const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-red-500",
    "from-green-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500",
]

export default function Center() {
  return (
    <div className="flex flex-grow text-white">
      <h1>I am center</h1>
      <header className='flex flex-grow'>
        <div className="flex items-center bg-black space-x-3 opacity-90
        hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
            <img className='rounded-full w-10 h-10' src={session?.userimage} 
            alt=""/>
            <h2>{session?.user.name}<h2/>
            <CheveronDownIcon className="h-5 w-5"/>
        </div>
      </header>
      <section className={`flex items-end space-x-7 bg-gradient-to-b to-black from-red-500 h-80 text-white padding-8`}>

      </section>
    </div>
  )
}
