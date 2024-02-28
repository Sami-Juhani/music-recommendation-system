import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUser} from '@fortawesome/free-solid-svg-icons';


interface SidebarProps {
    playLists: any[];
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
                playLists.map((playlist: any, index: number) => (
                    <div
                        key={index}
                        className={`preview-playlist ${selectedPlaylistIndex === index ? 'preview-playlist-pushed' : ''}`}
                        data-index={index}
                        onClick={() => handlePlaylistClick(index)}
                    >
                        <img src={playlist.img} alt="playlist" />
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