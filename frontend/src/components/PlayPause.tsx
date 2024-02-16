// PlayPause.tsx
import React from "react";
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';

// Define props type for better type checking
interface PlayPauseProps {
  song: any; // Consider defining a more specific type
  handlePause: () => void;
  handlePlay: () => void;
  isPlaying: any;
    activeSong: any;
}

const PlayPause: React.FC<PlayPauseProps> = ({ song, handlePause, handlePlay, isPlaying, activeSong }) => (
    isPlaying && activeSong?.title === song.title ? (
        <FaPauseCircle 
        size={35}
        className="text-gray-300"
        onClick={handlePause}/>
    ) : (
        <FaPlayCircle 
        size={35}
        className="text-gray-300"
        onClick={handlePlay}
        />
    )
)

export default PlayPause;
