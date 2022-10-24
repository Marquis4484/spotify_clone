import React from 'react'
import {useRecoilValue} from "recoil";
import {playlistState} from "../atoms/playlistenAtom";

function Songs() {
    const playlist = useReciolValue(playlistState);

  return (
    <div className='px-8 flex flex-col space-y-1 pd-28 text-white'>
        {playlist?.tracks.items.map(
            (track) => (
            <Song key={track.track.id} track={track} order={i}/>
            ))}
    </div>
  )
}

export default Songs;