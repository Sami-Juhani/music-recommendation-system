import React from 'react';

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

interface Generated {
  acousticness: number[];
  artists: string[];
  danceability: number[];
  duration_ms: number[];
  energy: number[];
  explicit: number[];
  id: string[];
  id_artists: string[][];
  instrumentalness: number[];
  key: number[];
  liveness: number[];
  loudness: number[];
  mode: number[];
  name: string[];
  popularity: number[];
  release_date: string[];
  speechiness: number[];
  tempo: number[];
  time_signature: number[];
  url: string[];
  valence: number[];
  year: string[];
}

interface RecommendationsContainerProps {
    playlist: Playlist; 
    selectedPlaylistIndex: number | null;
    generated: Generated;
    isVisible: boolean;
}

const RecommendationsContainer: React.FC<RecommendationsContainerProps> = ({ playlist, selectedPlaylistIndex, generated, isVisible }) => {

  return (

    <div className={`cards-container ${isVisible ? "" : "hidden"}`}>
        <h1>List of recommendations based on {`"${playlist.name}"`}</h1>
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
      </div>
    
  );
};


export default RecommendationsContainer;