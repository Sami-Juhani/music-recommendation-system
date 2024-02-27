import React from 'react';
import msToMinutesAndSeconds from '../utils/timeConvret';
import PlayListHeader from './PlayListHeader';


interface TracksPlayListProps {
    playLists: any[]; 
    selectedPlaylistIndex: number | null;
}

const TracksPlayList: React.FC<TracksPlayListProps> = ({ playLists, selectedPlaylistIndex }) => {

  return (
    <div className="list">
        <PlayListHeader />
        <div className="tracks">
            {playLists && playLists[selectedPlaylistIndex ? selectedPlaylistIndex : 0].tracks.map(
                (
                    {
                        id,
                        name,
                        artists,
                        image,
                        duration,
                        album,
                    }: {
                        id: string;
                        name: string;
                        artists: string;
                        image: string;
                        duration: number;
                        album: string;
                    },
                    index: number
                ) => {
                return (
                    <div
                    className="row"
                    >
                    <div className="col">
                        <span>{index + 1}</span>
                    </div>
                    <div className="col detail">
                        <div className="image">
                        <img src={image} alt="track" />
                        </div>
                        <div className="info">
                        <span className="name">{name}</span>
                        <span>{artists}</span>
                        </div>
                    </div>
                    <div className="col">
                        <span>{album}</span>
                    </div>
                    <div className="col">
                        <span>{msToMinutesAndSeconds(duration)}</span>
                    </div>
                    </div>
                );
                }
            )}
        </div>
  </div>
  );
};

export default TracksPlayList;