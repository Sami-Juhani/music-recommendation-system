import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
//import PlayPause from "/.PlayPause";
//import {playPause, setActiveSongs} from "../redux/features/playerSlice";

const SongCard = ({song, i}: {song: any, i: any}) => {
    return (
        <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
            <h1>SongCard</h1>
        </div>
    );
}

export default SongCard;