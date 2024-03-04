import React from 'react';
import PlayListTracks from './PlayListTracks';
import testAlbum from "../assets/album.webp";

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


interface PlayListContainerProps {
  playlist: Playlist;
  selectedPlaylistIndex: number | null;
  generateRecommendation: () => void;
}

const PlayListContainer: React.FC<PlayListContainerProps> = ({ playlist, selectedPlaylistIndex, generateRecommendation }) => {

  return (
    <div className="data-inside">
      <div className="playlist">
        <div className="image">
          <img src={selectedPlaylistIndex && playlist.images ? playlist.images[0].url : testAlbum} alt="selected playlist" />
        </div>
        <div className="details">
          <span className="type">PLAYLIST</span>
          <h1 className="title">{playlist.name ? playlist.name : "Name"}</h1>
          <p className="description">{playlist.description}</p>
        </div>
      </div>
      <div className="g-button">
        <button
          className="badge nav-item generate bg-brand"
          onClick={() => generateRecommendation()}
        >Generate recommendation</button>
      </div>
      <PlayListTracks
        playlist={playlist}
        selectedPlaylistIndex={selectedPlaylistIndex} />
    </div>
  )
}


export default PlayListContainer;