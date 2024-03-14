import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import msToMinutesAndSeconds from "../utils/timeConvret";
import PlayListHeader from "./PlayListHeader";
import testAlbum from "../assets/album.webp";
import { Playlist } from "../types/PlayListInterface";
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
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const handleEnd = () => {
      setSelectedSong({ ...selectedSong, isPlaying: false });
    };

    if (audioRef.current == null) return;

    const currentAudioRef = audioRef.current;

    currentAudioRef.addEventListener("ended", handleEnd);

    return () => currentAudioRef.removeEventListener("ended", handleEnd);
  }, [selectedSong]);

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

  const handleAudioToggle = (
    song: any,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    // Prevent the event from propagating to the parent elements
    e.stopPropagation();

    if (audioRef.current == null) return;

    if (selectedSong && selectedSong.id === song.id) {
      // Toggle the playing state for the current song
      setSelectedSong({ ...selectedSong, isPlaying: !selectedSong.isPlaying });

      if (selectedSong.isPlaying) audioRef.current.pause();
      else audioRef.current.play();
    } else {
      // Select the new song and set its playing state to true
      setSelectedSong({ ...song, isPlaying: true });
      audioRef.current.src = song.preview_url;
      audioRef.current.play();
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
                className="row"
                key={index}
                onClick={(e) => handleSongClick(item.track, e)}
              >
                <div className="col">
                  <span>{index + 1}</span>
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
                  {/* Display play/pause button */}
                  {selectedSong && selectedSong.id === item.track.id ? (
                    <button onClick={(e) => handleAudioToggle(item.track, e)}>
                      <FontAwesomeIcon
                        icon={selectedSong.isPlaying ? faPause : faPlay}
                      />
                    </button>
                  ) : null}
                </div>
                <div className="col">
                  {selectedSong && selectedSong.id === item.track.id && (
                    <SongRating spotifyId={item.track.id} songRating={item.rating} />
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
      {/* Audio element for playback */}
      {selectedSong && (
        <audio
          ref={audioRef}
          src={selectedSong.preview_url}
          autoPlay={selectedSong.isPlaying}
        />
      )}
    </div>
  );
};

export default TracksPlayList;
