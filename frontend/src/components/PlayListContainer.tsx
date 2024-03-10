import React from 'react';
import PlayListTracks from './PlayListTracks';
import { Playlist } from '../types/PlayListInterface';
import PlayListPreviewSkeleton from './Skeleton/PlayListPreviewSkeleton';
import { PlayListPreview } from './PlayListPreview';



interface PlayListContainerProps {
  playlist: Playlist;
  selectedPlaylistIndex: number | null;
  generateRecommendation: () => void;
  onePLIsLoading: boolean;
  generatedIsLoading: boolean;
}

const PlayListContainer: React.FC<PlayListContainerProps> = ({ playlist, selectedPlaylistIndex, generateRecommendation, onePLIsLoading, generatedIsLoading }) => {

  return (
    <div className="data-inside">
      {playlist 
        ? <PlayListPreview 
            playlist={playlist} 
            selectedPlaylistIndex={selectedPlaylistIndex}
            onePLIsLoading={onePLIsLoading}/> 
        : <PlayListPreviewSkeleton/>}

      <div className="g-button">
        <button
          className="badge nav-item generate bg-brand"
          onClick={() => generateRecommendation()}
          disabled={(playlist.tracks && !onePLIsLoading) && !generatedIsLoading  ? false : true}
        >Generate recommendation</button>
      </div>
      <PlayListTracks
        playlist={playlist}
        selectedPlaylistIndex={selectedPlaylistIndex}
        onePLIsLoading = {onePLIsLoading} />
    </div>
  )
}


export default PlayListContainer;