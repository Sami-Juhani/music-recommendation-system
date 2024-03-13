import React from "react";
import PlayListTracks from "./PlayListTracks";
import { Playlist } from "../types/PlayListInterface";
import { PlayListPreview } from "./PlayListPreview";

interface PlayListContainerProps {
  playlist: Playlist;
  selectedPlaylistIndex: number | null;
  generateRecommendation: () => void;
  onePLIsLoading: boolean;
  allPLisLoading: boolean;
  generatedIsLoading: boolean;
  searchRecommendationsError: string;
  isVisible: boolean;
}

const PlayListContainer: React.FC<PlayListContainerProps> = ({
  playlist,
  selectedPlaylistIndex,
  generateRecommendation,
  onePLIsLoading,
  allPLisLoading,
  searchRecommendationsError,
  isVisible,
  generatedIsLoading,
}) => {
  return (
    <div className="data-inside">
      <PlayListPreview
        playlist={playlist}
        selectedPlaylistIndex={selectedPlaylistIndex}
        onePLIsLoading={onePLIsLoading}
      />
      <div className="g-button">
        <button
          className="badge nav-item generate bg-brand text-center flex items-center justify-center"
          onClick={() => generateRecommendation()}
          disabled={generatedIsLoading || onePLIsLoading || allPLisLoading}
        >
          {generatedIsLoading ? "Loading..." : "Generate recommendations"}
        </button>
      </div>
      {!generatedIsLoading && !isVisible && !searchRecommendationsError ? (
        <PlayListTracks
          playlist={playlist}
          onePLIsLoading={onePLIsLoading}
        />
      ) : <h2 className="text-center text-xl">{searchRecommendationsError}</h2>}
    </div>
  );
};

export default PlayListContainer;
