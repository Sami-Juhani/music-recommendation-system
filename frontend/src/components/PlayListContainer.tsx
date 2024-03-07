import React from 'react';
import PlayListTracks from './PlayListTracks';
import { Playlist } from '../types/PlayListInterface';
import PlayListPreviewSkeleton from './Skeleton/PlayListPreviewSkeleton';
import testAlbum from '../assets/album.webp';
import { PlayListPreview } from './PlayListPreview';



interface PlayListContainerProps {
  playlist: Playlist;
  selectedPlaylistIndex: number | null;
  generateRecommendation: () => void;
}

const PlayListContainer: React.FC<PlayListContainerProps> = ({ playlist, selectedPlaylistIndex, generateRecommendation }) => {

  return (
    <div className="data-inside">
      {playlist 
        ? <PlayListPreview playlist={playlist} selectedPlaylistIndex={selectedPlaylistIndex}/> 
        : <PlayListPreviewSkeleton/>}

      <div className="g-button">
        <button
          className="badge nav-item generate bg-brand"
          onClick={() => generateRecommendation()}
          disabled={playlist.tracks ? false : true}
        >Generate recommendation</button>
      </div>
      <PlayListTracks
        playlist={playlist}
        selectedPlaylistIndex={selectedPlaylistIndex} />
    </div>
  )
}


export default PlayListContainer;