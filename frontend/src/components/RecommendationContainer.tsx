import React from "react";
import { Playlist } from "../types/PlayListInterface";
import { Generated } from "../types/GeneratedInterface";
import { CardContainer } from "./CardContainer";

interface RecommendationsContainerProps {
  playlist: Playlist;
  selectedPlaylistIndex: number | null;
  isVisible: boolean;
  generated: Generated;
  generatedIsLoading: boolean;
}

const RecommendationsContainer: React.FC<RecommendationsContainerProps> = ({
  isVisible,
  playlist,
  generated,
}) => {
  return isVisible && generated?.name?.length > 0 ? (
    <div className="cards-container">
      <h1>List of recommendations based on {`"${playlist.name}"`}</h1>
      <CardContainer generated={generated} />
    </div>
  ) : null;
};

export default RecommendationsContainer;
