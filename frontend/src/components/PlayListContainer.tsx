import React from 'react';
import PlayListTracks from './PlayListTracks';
import testAlbum from "../assets/album.webp";
import { Playlist } from './interfaces/interface';


interface PlayListContainerProps {
  playlist: Playlist;
  selectedPlaylistIndex: number | null;
  generateRecommendation: () => void;
}

const PlayListContainer: React.FC<PlayListContainerProps> = ({ playlist, selectedPlaylistIndex, generateRecommendation }) => {

  return (
    <div className="data-inside">
      <div className="playlist">
        <div className="img-playlist-skeleton">
        </div>
        <div className="info-playlist-skeleton">
          {/* {playlist ? (
              <div className="image">
              <img src={selectedPlaylistIndex && playlist.images ? playlist.images[0].url : testAlbum} alt="selected playlist" />
            </div>
          ):(
            <div className="playlist-skeleton">
            </div>
          )} */}
          
          {/* <div className="details">
            <span className="type">PLAYLIST</span>
            <h1 className="title">{playlist.name ? playlist.name : "Name"}</h1>
            <p className="description">{playlist.description}</p>
          </div> */}
        
        <div className="title-playlist-skeleton">
        </div>
        <div className="subtitle-playlist-skeleton">
        </div>
      </div>
      </div>
      <div className="g-button">
        <button
          className="badge nav-item generate bg-brand"
          onClick={() => generateRecommendation()}
          disabled={true}
        >Generate recommendation</button>
      </div>
      <PlayListTracks
        playlist={playlist}
        selectedPlaylistIndex={selectedPlaylistIndex} />
    </div>
  )
}


export default PlayListContainer;