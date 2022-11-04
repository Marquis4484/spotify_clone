import {PauseIcon, SwitchHorizonIcon, VolumeDownIcon} from "@heroicons/react/24/outline";
import {RewindIcon, SwitchHorizontalIcon, VolumeUpIcon} from "@heroicons/react/24/solid";
import {useState,useEffect} from 'react';
import {useSession} from "next-auth/react";
import { useRecoilState } from 'recoil';
import useSpotify from "../hooks/useSpotify";
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';
import useSongInfo from '../hooks/useSongInfo';


function Player() {
    const spotifyApi = useSpotify();
    const {data:session,status} = useSession();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [volume, etVolume] = useState(50)
    const [isPlaying,setPlaying] = useRecoilState(isPlayingState);

    const SongInfo = useSongInfo();

    const fetchCurrentSong = () =>{
        if (!songInfo){
            spotifyApi.getMyCurrentPlayingTrack().then((data) => {
                console.log('Now playing: ', data.body?.item);
                    setCurrentTrackId(data.body?.item?.id);

                    spotifyApi.getMyCurrentPlaybackState().then((data)=> {
                        setIsPlaying(data.body?.is_playing);
                    });
                });
        }
    };

    const handlePlayPause = () => { 
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
            if (data.body.is_playing){
                spotifyApi.pause();
                setIsPlaying(false);
            } else {
                spotifyApi.play();
                setIsPlaying(true)
            }
        })
    }
     
   useEffect(() =>{
    if (spotifyApi.getAccessToken() && !currentTrackId) {
        fetchCurrentSong();
        setVolume(50);
    }
   },[currentTrackId,spotifyApi,session]);

   useEffect(() =>{
    if (volume > 0 && volume < 100) {
        debouncedAdjustVolume(volume);
    } 
   }, [volume]);

   const debouncedAdjustVolume = useCallback(
    debounce((volume) =>{
        spotifyApi.setVolume(volume).catch((err) =>{});

    }, 500),
    []
   );

  return (
    <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
        <div className='flex items-center space-x-4'>
            <img 
            className='hidden md:inline h-10 w-10' 
            src={songInfo?.album.images?.[0]?.url}
            alt=""/>
        
        <div>
            <h3>{songInfo?.name}</h3>
            <p>
                {songInfo?.artist?.[0]?.name}
            </p>
        </div> 

        <div className="flex items-center justify-evenly">
            <SwitchHorizonIcon className="button"/>
            <RewindIcon className='button'/>

            {isPlaying ? (
                <PauseIcon onClick={handlePlayPause} classNamr="button w-10 h-10"/>
            ) : (
                <PlayIcon onClick={handlePlayPause} classNamr="button w-10 h-10"/>
            )}

            <FastFowardIcon className="button"/>

            <ReplyIcon className="button"/>
        </div>   
        <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
            <VolumeDownIcon className="button" onClick={() => volume > 0 && setVolume(volume - 10)}/>
            <input className="w-14 md:w-28" type="range" value={volume} onChange={(e)=> setVolume(Number(e.target.value))} min={0} max={100}/>
            <VolumeUpIcon className="button" onClick={() => volume < 100 && setVolume(volume + 10)}/>
        </div>
    </div>
</div>
  );
}

export default Player