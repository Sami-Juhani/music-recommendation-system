import { useContext } from "react";
import { PlayerContext } from "./PlayerContextProvider";

export function usePlayer() {
  const value = useContext(PlayerContext);

  if (value == null) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }

  return value;
}
