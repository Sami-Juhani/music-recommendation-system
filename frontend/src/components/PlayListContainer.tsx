import React from 'react';
import PlayListTracks from './PlayListTracks';



interface PlayListContainerProps {
    playLists: any[]; 
    selectedPlaylistIndex: number | null;
    generateRecommendation: () => void;
}

const PlayListContainer: React.FC<PlayListContainerProps> = ({ playLists, selectedPlaylistIndex, generateRecommendation }) => {

  return (
    <div className="data-inside">
    <div className="playlist">
      <div className="image">
        <img src={selectedPlaylistIndex ? playLists[selectedPlaylistIndex].img : playLists[0].img} alt="selected playlist" />
      </div>
      <div className="details">
        <span className="type">PLAYLIST</span>
        <h1 className="title">{selectedPlaylistIndex ? playLists[selectedPlaylistIndex].name : playLists[0].name}</h1>
        <p className="description">{selectedPlaylistIndex ? playLists[selectedPlaylistIndex].description : playLists[0].description}</p>
      </div>
    </div>
    <div className="g-button">
      <button 
        className="badge nav-item generate bg-brand"
        onClick={() => generateRecommendation()}
      >Generate recommendation</button>
    </div>
    <PlayListTracks 
      playLists={playLists} 
      selectedPlaylistIndex={selectedPlaylistIndex} />
  </div>
      )}


export default PlayListContainer;