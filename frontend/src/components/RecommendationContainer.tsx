import React from 'react';
import { Playlist } from '../types/PlayListInterface';
import { Generated } from '../types/GeneratedInterface';
import CardSkeleton from './Skeleton/CardSkeleton';
import { CardContainer } from './CardContainer';

interface RecommendationsContainerProps {
    playlist: Playlist; 
    selectedPlaylistIndex: number | null;
    isVisible: boolean;
    generated: Generated;
    onePLIsLoading: boolean;
    generatedIsLoading: boolean;
  
}

const RecommendationsContainer: React.FC<RecommendationsContainerProps> = ({ selectedPlaylistIndex, isVisible, playlist, generated, onePLIsLoading, generatedIsLoading }) => {

  return (

    <div className={`cards-container ${isVisible ? "" : "hidden"}`}>
        <h1>List of recommendations based on {`"${playlist.name}"`}</h1>
        {generatedIsLoading
        ? (
        <div className="cards-container-skeleton">
          {[...Array(6)].map((_, index) => (
              <CardSkeleton key={index} />
          ))}
        </div>)
        : (generated && generated.name && generated.name.length > 0 
          ? <CardContainer generated={generated} />
          : <h2>Sorry. Something went wrong. Try again</h2>)
        }
                
    </div>
    
  );
};


export default RecommendationsContainer;


