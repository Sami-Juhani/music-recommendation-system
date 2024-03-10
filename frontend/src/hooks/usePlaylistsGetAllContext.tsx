import { PlaylistsGetAllContext } from "../context/PlaylistsGetAllContext"
import { useContext } from "react";

export const usePlaylistsGetAllContext = () => {
    const context = useContext(PlaylistsGetAllContext);
    if (context === undefined) {
      throw new Error(
        "usePlaylistsGetAllContext must be used within a PlaylistsGetAllContextProvider"
      );
    }
    return context;
  }