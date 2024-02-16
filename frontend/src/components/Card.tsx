// Card.tsx
import React from 'react';

interface CardProps {
  musicTitle: string;
  imageUrl: string;
}

const Card: React.FC<CardProps> = ({ musicTitle, imageUrl }) => {
  return (
    <div className="card">
      <img src={imageUrl} alt={musicTitle} />
      <p>{musicTitle}</p>
    </div>
  );
};

export default Card;