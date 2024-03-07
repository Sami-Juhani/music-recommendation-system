export interface Playlist {
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