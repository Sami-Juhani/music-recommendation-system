import React from "react";
import { Playlist } from "../types/PlayListInterface";
import testAlbum from "../assets/album.webp";

interface PlayListContainerProps {
    playlist: Playlist;
    selectedPlaylistIndex: number | null;
    
  }


export const PlayListPreview : React.FC<PlayListContainerProps> = ({ playlist, selectedPlaylistIndex}) => {
    return (
      <div className="playlist">
        
        
          <div className="playlist-preview">
            <div className="image">
              <img src={selectedPlaylistIndex && playlist.images ? playlist.images[0].url : testAlbum} alt="selected playlist" />
            </div>         
          
            <div className="details">
              <span className="type">PLAYLIST</span>
              <h1 className="title">{playlist.name && playlist.name}</h1>
              <p className="description">{playlist.description}</p>
            </div>
        </div>
           
      </div>
    );
}