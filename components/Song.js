import React from 'react'
import {millisToMinutesAndSeconds} from "../lib/time";

function Song({order,track}) {
    const spotifyApi = useSpotify();
  return (
    <div>
        <div className='flex items-center space-x-4'>
            <p>{order + 1}</p>
            <img className='h-10 w-10' src={track.track.album.images[0].url} alt=""> </img>
        </div>
        <div>
            <p>{track.track.name}</p>
            <p>{track.track.artists[0].name}</p>
        </div>

        <div className='flex items center justify-between ml-auto md:ml-0'>
            <p className='hidden md:inline'>{track.track.album.name}</p>
            <p>{millisToMinutesAndSeconds()}</p>
        </div>
    </div>
  )
}

export default Songs