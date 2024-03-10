import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUser} from '@fortawesome/free-solid-svg-icons';
import testAlbum from "../assets/album.webp";
import { Playlist } from '../types/PlayListInterface';
import { SideBarSceleton } from './Skeleton/SideBarSceleton';


interface PlaylistsResponse {
  href: string;
  items: Playlist[];
}

interface SidebarProps {
  playlists: PlaylistsResponse; // Updated to use the new structure
  selectedPlaylistIndex: number | null;
  handlePlaylistClick: (index: number) => void;
  allPLisLoading: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ playlists, selectedPlaylistIndex, handlePlaylistClick, allPLisLoading }) => {

  return (
    <div className="sidebar">    
        <div className="nav">
          <div className="nav-option" id="nav-option-home">
            <FontAwesomeIcon icon={faHouse} />
            <a href="#">Home</a>
          </div>
        </div>
        <div className="library">
            <div className="options">
                <div className="lib-option nav-option">
                    <img src="./assets/library_icon.png" alt="library_icon" />
                    <a href="#">Your library</a>
                </div>
            </div>
            <div className="lib-box">
            <div className="box overflow-y-auto h-97">
              {allPLisLoading 
              ? <SideBarSceleton />
              : ((playlists && playlists.hasOwnProperty('items') )
                ? (
                playlists.items.map((playlist: any, index: number) => (
                    <div
                        key={playlist.id}
                        className={`preview-playlist ${selectedPlaylistIndex === playlist.id ? 'preview-playlist-pushed' : ''}`}
                        data-index={playlist.id}
                        onClick={() => handlePlaylistClick(playlist.id)}
                    >
                        <img src={playlist.images && playlist.images.length > 0 ? playlist.images[0].url : testAlbum} alt="playlist" />
                        <div className="preview-text">
                            <h1>{playlist.name}</h1>
                            <p>{playlist.description}</p>
                        </div>
                    </div>
                ))) 
                : (
                  <div>Something went wrong</div>
                ))}
              </div>
            </div>
        </div>
    </div>
  );
};

export default Sidebar;