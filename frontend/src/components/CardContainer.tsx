import { Generated } from "../types/GeneratedInterface";
import React from 'react';

interface CardContainerProps {
  generated: Generated;
}



export const CardContainer:React.FC<CardContainerProps> = ({generated}) => {
    return (
        <div className="cards-container">          
        {generated.name && generated.name.map((name, index) => {
          const artists = generated.artists[index]; // Assuming artists is an array of strings
          const imageUrl = generated.url[index]; // Assuming this is the image URL
          const albumYear = generated.year[index];
          
          return (
            <div key={generated.id[index]} className="card">
              <img src={imageUrl} className="card-img" alt={`${name} album cover`} />
              <div className="card-content">
                <h2 className="card-title">{name}</h2>
                <p className="card-artists">{artists}</p>
                <p className="card-year">Year: {albumYear}</p>
              </div>
            </div>
          );
        })}
        </div>
    )
}


