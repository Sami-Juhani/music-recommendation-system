import React, { useLayoutEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPauseCircle, faPlayCircle, faStepBackward, faStepForward } from "@fortawesome/free-solid-svg-icons";
import "../styles/Player.css";
import { usePlayer } from "../context/usePlayer";
import msToMinutesAndSeconds from "../utils/timeConvret";

export function Player() {
  const { currentSong, isLoading, progressBarRef, playPrevSong, playSong, pause, playNextSong } = usePlayer();
  const [isClosing, setIsClosing] = useState(false);
  const prevIsOpenRef = useRef<boolean>();

  useLayoutEffect(() => {
    if (!currentSong && prevIsOpenRef.current) {
      setIsClosing(true);
    }
    prevIsOpenRef.current = currentSong !== undefined;
  }, [currentSong]);

  if (!currentSong && !isClosing) return null;

  return (
    <div onAnimationEnd={() => setIsClosing(false)} className={`player ${isClosing ? "closing" : ""}`}>
      {currentSong && (
        <div className="player-song-information">
          <img src={!isLoading ? currentSong?.imageUrl : "./assets/album.webp"} alt="artist" />
          <div className="player-song-details">
            <p className="player-artist-name">{currentSong?.artist}</p>
            <p className="player-song-text">{currentSong?.name}</p>
          </div>
        </div>
      )}
      <div className="player-control-container">
        <div className="player-center-items">
          <div className="player-controls">
            <button onClick={playPrevSong} disabled={!currentSong}>
              <FontAwesomeIcon icon={faStepBackward} />
            </button>
            {currentSong?.isPlaying ? (
              <button onClick={pause} disabled={!currentSong}>
                <FontAwesomeIcon icon={faPauseCircle} />
              </button>
            ) : (
              <button onClick={() => playSong()} disabled={!currentSong}>
                <FontAwesomeIcon icon={faPlayCircle} onClick={() => playSong()} />
              </button>
            )}
            <button onClick={playNextSong} disabled={!currentSong}>
              <FontAwesomeIcon icon={faStepForward} />
            </button>
          </div>
          <div className="player-progress">
            <span>{currentSong ? msToMinutesAndSeconds(currentSong?.progressMs) : ""}</span>
            <div className="player-progress-bar" ref={progressBarRef}></div>
            <span>{currentSong ? msToMinutesAndSeconds(parseFloat(currentSong?.duration)) : ""}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
