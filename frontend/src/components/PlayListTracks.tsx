import React from 'react';
import msToMinutesAndSeconds from '../utils/timeConvret';
import PlayListHeader from './PlayListHeader';
import testAlbum from '../assets/album.webp';

interface Playlist {
    collaborative: boolean;
    description: string;
    external_urls: {
        spotify: string;
    };
    followers: {
        href: null;
        total: number;
    };
    href: string;
    id: string;
    images: Array<{
        height: null;
        url: string;
        width: null;
    }>;
    name: string;
    owner: {
        display_name: string;
        external_urls: {
            spotify: string;
        };
        href: string;
        id: string;
        type: string;
        uri: string;
    };
    primary_color: string;
    public: boolean;
    snapshot_id: string;
    tracks: {
        href: string;
        items: Array<{
            added_at: string;
            added_by: {
                external_urls: {
                    spotify: string;
                };
                href: string;
                id: string;
                type: string;
                uri: string;
            };
            is_local: boolean;
            primary_color: null;
            track: {
                album: {
                    available_markets: string[];
                    type: string;
                    album_type: string;
                    href: string;
                    id: string;
                    images: Array<{
                        url: string;
                        width: number;
                        height: number;
                    }>;
                    name: string;
                    release_date: string;
                    release_date_precision: string;
                    uri: string;
                    artists: Array<{
                        external_urls: {
                            spotify: string;
                        };
                        href: string;
                        id: string;
                        name: string;
                        type: string;
                        uri: string;
                    }>;
                    external_urls: {
                        spotify: string;
                    };
                    total_tracks: number;
                };
                artists: Array<{
                    external_urls: {
                        spotify: string;
                    };
                    href: string;
                    id: string;
                    name: string;
                    type: string;
                    uri: string;
                }>;
                disc_number: number;
                track_number: number;
                duration_ms: number;
                explicit: boolean;
                external_ids: {
                    isrc: string;
                };
                external_urls: {
                    spotify: string;
                };
                href: string;
                id: string;
                name: string;
                popularity: number;
                preview_url: string;
                track: boolean;
                episode: boolean;
                available_markets: string[];
                type: string;
                uri: string;
                is_local: boolean;
            };
            video_thumbnail: {
                url: null;
            };
        }>;
    };
}


interface TracksPlayListProps {
    playlist: Playlist;
    selectedPlaylistIndex: number | null;
}

const TracksPlayList: React.FC<TracksPlayListProps> = ({ playlist, selectedPlaylistIndex }) => {

    return (
        <div className="list">
            <PlayListHeader />
            <div className="tracks">
                {playlist.tracks && playlist.tracks.items.map(
                    (item: any, index: number) => {
                        return (
                            <div
                                className="row"
                            >
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
                )}
            </div>
        </div>
    );
};

export default TracksPlayList;