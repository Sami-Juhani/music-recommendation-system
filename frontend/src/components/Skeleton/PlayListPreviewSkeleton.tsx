import React from 'react';

export default function PlayListPreviewSkeleton(): JSX.Element {
    return (
      
    <div className="playlist">
        <div className="img-playlist-skeleton"></div>
        <div className="info-playlist-skeleton">     
            <div className="title-playlist-skeleton"></div>
            <div className="subtitle-playlist-skeleton"></div>
        </div>
    </div>
    );
}