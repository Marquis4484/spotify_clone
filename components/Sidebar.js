import {useEffect, useState} from 'react';
import {HomeIcon, MagnifyingGlassIcon, BuildingLibraryIcon, PlusCircleIcon,HeartIcon,RssIcon} from '@heroicons/react/24/outline'
import {signOut, useSession} from "next-auth/react";


function Sidebar()  {

        const spotifyAPI = useSpotify();
        const {data: session, status } = useSession();
        const [playlists, setPlaylists] = useState([]);
        const [playlistsID, setPlaylistsID] = useRecoilState(null);
        (playlistIdState);
            useEffect(() => {

                    if (spotifyAPI.getAccessToken()) {
                    spotifyAPI.getUserPlaylists().then((data) => {
                        setPlaylists(data.body.items);
                    });

                    }
            }, [session, spotifyAPI])
               
             

  return (
    <div className="text-gray-500 p-5 text-sm border-r border-gray-900
    overflow-y-scroll scrollbar-hide h-screen">
        <div className='space-y-4'>
            <button className="flex items-center space-x-2 hover:text-white">
                <HomeIcon className="h-5 w-5"/>
                <p> Home </p>
            </button>
            <button className="flex items-center space-x-2 hover:text-white">
                <MagnifyingGlassIcon className="h-5 w-5"/>
                <p> Search </p>
            </button>
            <button className="flex items-center space-x-2 hover:text-white">
                <BuildingLibraryIcon className="h-5 w-5" />
                <p> Your Library </p>
            </button> 
            <hr className="border-t-[0.1px] border-gray-900"/>

            <button className="flex items-center space-x-2 hover:text-white">
                <PlusCircleIcon className="h-5 w-5"/>
                <p> CreatePlaylist </p>
            </button>
            <button className="flex items-center space-x-2 hover:text-white">
                <HeartIcon className="h-5 w-5"/>
                <p> Liked Songs </p>
            </button>
            <button className="flex items-center space-x-2 hover:text-white">
                <RssIcon className="h-5 w-5" />
                <p> Your Episodes </p>
            </button> 
            <hr className="border-t-[0.1px] border-gray-900"/>

           {playlists.map((playlist) => {
            <p key={playlists.id} className="cursor-pointer">
                {playlist.name}
            </p>
            )}
          
        </div>
    </div>
  )
}

export default Sidebar

