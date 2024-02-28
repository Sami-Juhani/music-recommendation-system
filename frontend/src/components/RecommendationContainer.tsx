import React from 'react';



interface RecommendationsContainerProps {
    playLists: any[]; 
    selectedPlaylistIndex: number | null;
    generated: any[];   
}

const RecommendationsContainer: React.FC<RecommendationsContainerProps> = ({ playLists, selectedPlaylistIndex, generated }) => {

  return (

    <div className="cards-container hidden">
        <h1>List of recommendations based on {`"${playLists[selectedPlaylistIndex ? selectedPlaylistIndex : 0].name}"`}</h1>
        <div className="cards-container">          
            {generated.length > 0 && generated.map(
              (
              ({
                id,
                name,
                artists,
                image,
                album
              }) => {
                return (

                    <div 
                    key={id}
                    className="card">
                        <img src={image} className="card-img" alt="card5img"/>
                        <p className="card-title">{name}</p>
                        <p className="card-info">{artists}</p>
                        <p className="card-info">{album}</p>
                    </div>
                );
              }
            ))}
        </div>
      </div>
    
  );
};

export default RecommendationsContainer;