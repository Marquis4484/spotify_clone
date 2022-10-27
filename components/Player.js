import React from 'react';
import {useSession} from "next-auth/react"
import useSpotify from "../hooks/useSpotify";
import { isPlayingState } from '../atoms/songAtom';
import useSongInfo from '../hooks/useSongInfo';
import useSpotify from '../hooks/useSpotify';
import spotifyApi from '../lib/spotify';


function Player() {
    const spotifyApi = useSpotify();
    const {data:session,status} = useSession();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [volume, etVolume] = useState(50)
    const [isPlaying,setPlaying] = useRecoilState(isPlayingState);

    const SongInfo = useSongInfo();

    const fetchCurrentSong = () =>{
        if (!songInfo){
            spotifyApi.getMyCurrentPlayingTrack().then(data
                => {
                    setCurrentTrackId(data.body?.item?.id);
                })
        }
    }

   useEffect(() =>{
    if (spotifyApi.getAccessToken) && !currentTrackId)
    {

    }
   },[currentTrackId,spotifyApi,session])

  return (
    <div>

    </div>
  )
}

export default Player