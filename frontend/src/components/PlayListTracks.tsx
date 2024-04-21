import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import testAlbum from "../assets/album.webp";
import { usePlayer } from "../context/usePlayer";
import { Playlist } from "../types/PlayListInterface";
import msToMinutesAndSeconds from "../utils/timeConvret";
import PlayListHeader from "./PlayListHeader";
import SongRating from "./SongRating";

interface TracksPlayListProps {
  playlist: Playlist;
  onePLIsLoading: boolean;
}

const TracksPlayList: React.FC<TracksPlayListProps> = ({
  playlist,
  onePLIsLoading,
}) => {
  const [selectedSong, setSelectedSong] = useState<any>(null);
  const { currentSong, playSong, setCurrentSong } = usePlayer();

  const handleSongClick = (song: any, e: React.MouseEvent<HTMLDivElement>) => {
    const isRatingInput = (e.target as HTMLElement).classList.contains(
      "rating-input"
    );
    const isSubmitButton = (e.target as HTMLElement).classList.contains(
      "submit-button"
    );

    if (isRatingInput || isSubmitButton) {
      return;
    }

    if (selectedSong && selectedSong.id === song.id) {
      setSelectedSong(null);
    } else {
      setSelectedSong(song);
    }
  };

  return (
    <div className="list">
      <PlayListHeader />
      <div className="tracks">
        {playlist.tracks && !onePLIsLoading ? (
          playlist.tracks.items.map((item: any, index: number) => {
            return (
              <div
                className={`row ${
                  currentSong?.spotifyId === item.track.id ? "playing" : ""
                }`}
                key={item.track.id}
                onClick={(e) => handleSongClick(item.track, e)}
              >
                <div className="col">
                  <span>{index + 1}</span>
                  {currentSong && (
                    <FontAwesomeIcon
                      icon={faPlayCircle}
                      className="tracks-play-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (currentSong === undefined) return;
                        playSong(item.track.id);
                        setCurrentSong({
                          name: item.track?.name,
                          artist: item.track?.artists[0]?.name,
                          progressMs: 0,
                          duration: item.track.duration_ms,
                          imageUrl: item.track.album.images[0].url,
                          isPlaying: true,
                          spotifyId: item.track.id,
                        });
                      }}
                    />
                  )}
                </div>
                <div className="col detail">
                  <div className="image">
                    <img
                      src={
                        item.track.album.images
                          ? item.track.album.images[0].url
                          : testAlbum
                      }
                      alt="track"
                    />
                  </div>
                  <div className="info">
                    <span className="name">{item.track.name}</span>
                    <span>
                      {item.track.artists
                        ? item.track.artists[0].name
                        : "Artists unknown"}
                    </span>
                  </div>
                </div>
                <div className="col">
                  <span>{item.track.album.name}</span>
                </div>
                <div className="col">
                  <span>{msToMinutesAndSeconds(item.track.duration_ms)}</span>
                </div>
                <div className="col">
                  {selectedSong && selectedSong.id === item.track.id && (
                    <SongRating
                      spotifyId={item.track.id}
                      songRating={item.rating}
                    />
                  )}
                </div>
              </div>
            );
          })
        ) : (
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
