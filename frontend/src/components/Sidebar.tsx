import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUser} from '@fortawesome/free-solid-svg-icons';
import testAlbum from "../assets/album.webp";


interface Playlist {
  collaborative: boolean;
  description: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: Array<{
    height: null | number;
    url: string;
    width: null | number;
  }>;
  name: string;
  owner: {
    display_name: string;
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  primary_color: null | string;
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
  };
  type: string;
  uri: string;
}

interface PlaylistsResponse {
  href: string;
  items: Playlist[];
}

interface SidebarProps {
  playLists: PlaylistsResponse; // Updated to use the new structure
  selectedPlaylistIndex: number | null;
  handlePlaylistClick: (index: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ playLists, selectedPlaylistIndex, handlePlaylistClick }) => {

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
            <div className="box">
                {playLists ? (
                playLists.items.map((playlist: any, index: number) => (
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
                ))
                ) : (
                  <div>
                    <p className="box-p1">Create your first playlist</p>
                    <p className="box-p2">It's easy we'll help you</p>
                    <button className="badge">Create playlist</button>
                  </div>
                )}
              </div>
            </div>
        </div>
    </div>
  );
};

export default Sidebar;