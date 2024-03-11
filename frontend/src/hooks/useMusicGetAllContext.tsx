import { MusicGetAllContext } from "../context/MusicGetAllContext"
import { useContext } from "react";

export const useMusicGetAllContext = () => {
    const context = useContext(MusicGetAllContext);
    if (context === undefined) {
      throw new Error(
        "useMusicGetAllContext must be used within a MusicGetAllContextProvider"
      );
    }
    return context;
  }