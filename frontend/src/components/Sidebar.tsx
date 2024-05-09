import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import testAlbum from "../assets/album.webp";
import { Playlist } from "../types/PlayListInterface";
import { SideBarSceleton } from "./Skeleton/SideBarSceleton";
import { useTranslation } from "react-i18next";

interface PlaylistsResponse {
  href: string;
  items: Playlist[];
}

interface SidebarProps {
  playlists: PlaylistsResponse; // Updated to use the new structure
  selectedPlaylistIndex: number | null;
  handlePlaylistClick: (index: number) => void;
  allPLisLoading: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ playlists, selectedPlaylistIndex, handlePlaylistClick, allPLisLoading }) => {
  const { t } = useTranslation();
  return (
    <div className="sidebar">
      <div className="nav">
        <div className="nav-option" id="nav-option-home">
          <FontAwesomeIcon icon={faHouse} />
          <a data-testid="hometitle" href="/">{t("sidebar.home")}</a>
        </div>
      </div>
      <div className="library">
        <div className="options">
          <div className="lib-option nav-option">
            <img src="./assets/library_icon.png" alt="library_icon" />
            <a href="/">{t("sidebar.library")}</a>
          </div>
        </div>
        <div className="box overflow-y-auto max-height-85">
          {allPLisLoading ? (
            <SideBarSceleton />
          ) : playlists && Object.prototype.hasOwnProperty.call(playlists, "items") ? (
            playlists.items.map((playlist: any) => (
              <div
                key={playlist.id}
                className={`preview-playlist ${selectedPlaylistIndex === playlist.id ? "preview-playlist-pushed" : ""}`}
                data-index={playlist.id}
                onClick={() => handlePlaylistClick(playlist.id)}
              >
                <img
                  src={playlist.images && playlist.images.length > 0 ? playlist.images[0].url : testAlbum}
                  alt="playlist"
                />
                <div className="preview-text">
                  <h1>{playlist.name && playlist.name.slice(0, 20)}</h1>
                  <p>{playlist.type === "playlist" ? t("sidebar.type1") : t("sidebar.type2")}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="sidebar-error">
              {t("sidebar.error")}
              <br /> {t("sidebar.errorMessage")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
