import React, {useState, useEffect} from "react";
import { Playlist } from "../types/PlayListInterface";
import testAlbum from "../assets/album.webp";
import PlayListPreviewSkeleton from "./Skeleton/PlayListPreviewSkeleton";
import { useNavigation } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface PlayListContainerProps {
    playlist: Playlist;
    selectedPlaylistIndex: number | null;
    onePLIsLoading: boolean;
    
  }
  export const PlayListPreview: React.FC<PlayListContainerProps> = ({ playlist, selectedPlaylistIndex, onePLIsLoading }) => {
    const { state } = useNavigation();
    const isLoading = state === "loading";
    const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
    const { t } = useTranslation();

    useEffect(() => {
        if (playlist.images && playlist.images.length > 0 && playlist.images[0].url) {
            const image = new Image();
            image.src = playlist.images[0].url;
            image.onload = () => {
                setIsImageLoaded(true);
            };
            image.onerror = () => {
                setIsImageLoaded(false);
            };
        } else {
            setIsImageLoaded(false);
        }
    }, [playlist]);

    return (
        <div>
            {onePLIsLoading || isLoading || !isImageLoaded ? (
                <PlayListPreviewSkeleton />
            ) : (
                <div className="playlist">
                    <div className="playlist-preview">
                        <div className="image">
                            <img src={playlist.images ? playlist.images[0].url : testAlbum} alt="selected playlist" />
                        </div>
                        <div className="details">
                            <span className="type">{t('playListPreview.type')}</span>
                            <h1 className="title">{playlist.name && playlist.name}</h1>
                            <p className="description">{playlist.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};