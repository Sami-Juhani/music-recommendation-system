import React, { useEffect } from 'react';

const TenorGifEmbed = ({ postId, aspectRatio = 1.25, width = "100%" }: { postId: string, aspectRatio?: number, width?: string }) => {
  useEffect(() => {
    // Create the script element
    const script = document.createElement('script');
    script.src = "https://tenor.com/embed.js";
    script.async = true;
    
    // Append the script to the body
    document.body.appendChild(script);
    
    // Remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="tenor-gif-embed w-32 h-32" data-postid={postId} data-share-method="host" data-aspect-ratio={aspectRatio} data-width={width}>
      <a href={`https://tenor.com/view/${postId}`}>Music Sticker</a>from <a href="https://tenor.com/search/music-stickers">Music Stickers</a>
    </div>
  );
};

export default TenorGifEmbed;