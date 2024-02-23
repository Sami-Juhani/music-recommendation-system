// HorizontalScrollFeed.tsx
import React from 'react';
import Card from '../components/Card';

const HorizontalScrollFeed: React.FC = () => {
  // Example data for 10 cards
  const musicData = [
    { musicTitle: 'Music 1', imageUrl: 'music_imgs/1702315706866-imgonline-com-ua-Resize-TFWx27irTaDE5FR0.jpg' },
    { musicTitle: 'Music 2', imageUrl: 'music_imgs/1702315706866-imgonline-com-ua-Resize-TFWx27irTaDE5FR0.jpg' },
    { musicTitle: 'Music 3', imageUrl: 'music_imgs/1702315706866-imgonline-com-ua-Resize-TFWx27irTaDE5FR0.jpg' },
    { musicTitle: 'Music 4', imageUrl: 'music_imgs/1702315706866-imgonline-com-ua-Resize-TFWx27irTaDE5FR0.jpg' },
    { musicTitle: 'Music 5', imageUrl: 'music_imgs/1702315706866-imgonline-com-ua-Resize-TFWx27irTaDE5FR0.jpg' },
    { musicTitle: 'Music 6', imageUrl: 'music_imgs/1702315706866-imgonline-com-ua-Resize-TFWx27irTaDE5FR0.jpg' },
    { musicTitle: 'Music 7', imageUrl: 'music_imgs/1702315706866-imgonline-com-ua-Resize-TFWx27irTaDE5FR0.jpg' },
    { musicTitle: 'Music 8', imageUrl: 'music_imgs/1702315706866-imgonline-com-ua-Resize-TFWx27irTaDE5FR0.jpg' },
    { musicTitle: 'Music 9', imageUrl: 'music_imgs/1702315706866-imgonline-com-ua-Resize-TFWx27irTaDE5FR0.jpg' },
    { musicTitle: 'Music 10', imageUrl:'music_imgs/1702315706866-imgonline-com-ua-Resize-TFWx27irTaDE5FR0.jpg' }
  ];

  return (
    <div className="horizontal-scroll-feed">
      {musicData.map((music, index) => (
        <Card key={index} musicTitle={music.musicTitle} imageUrl={music.imageUrl} />
      ))}
    </div>
  );
};

export default HorizontalScrollFeed;