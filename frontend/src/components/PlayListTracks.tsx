import React from 'react';
import msToMinutesAndSeconds from '../utils/timeConvret';
import PlayListHeader from './PlayListHeader';
import testAlbum from '../assets/album.webp';
import { Playlist } from '../types/PlayListInterface';



interface TracksPlayListProps {
    playlist: Playlist;
    selectedPlaylistIndex: number | null;
}

const TracksPlayList: React.FC<TracksPlayListProps> = ({ playlist, selectedPlaylistIndex }) => {

    return (
        <div className="list">
            <PlayListHeader />
            <div className="tracks">
                {playlist.tracks ? (playlist.tracks.items.map(
                    (item: any, index: number) => {
                        return (
                            <div className="row">
                                <div className="col">
                                    <span>{index + 1}</span>
                                </div>
                                <div className="col detail">
                                    <div className="image">
                                        <img src={item.track.album.images ? item.track.album.images[0].url : testAlbum} alt="track" />
                                    </div>
                                    <div className="info">
                                        <span className="name">{item.track.name}</span>
                                        <span>{item.track.artists ? item.track.artists[0].name : "Artists unknown"}</span>
                                    </div>
                                </div>
                                <div className="col">
                                    <span>{item.track.album.name}</span>
                                </div>
                                <div className="col">
                                    <span>{msToMinutesAndSeconds(item.track.duration_ms)}</span>
                                </div>
                            </div>
                        );
                    }
                )) : (
                    <>
                    <div className="row track-skeleton"></div>
                    <div className="row track-skeleton"></div>
                    <div className="row track-skeleton"></div>
                    </>

                )}
            </div>
        </div>
    );
};

export default TracksPlayList;