import { PlaylistGetContext } from "../context/PlaylistGetContext"
import { useContext } from "react";

export const usePlaylistGetContext = () => {
    const context = useContext(PlaylistGetContext);
    if (context === undefined) {
      throw new Error(
        "usePlaylistGetContext must be used within a PlaylistGetContextProvider"
      );
    }
    console.log(context);
    return context;
  }