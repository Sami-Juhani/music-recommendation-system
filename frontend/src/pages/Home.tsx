import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Languages from "../components/LanguageMenu";
import Modal from "../components/Modal";
import PlayListContainer from "../components/PlayListContainer";
import RecommendationsContainer from "../components/RecommendationContainer";
import Sidebar from "../components/Sidebar";
import CardSkeleton from "../components/Skeleton/CardSkeleton";
import PlayListPreviewSkeleton from "../components/Skeleton/PlayListPreviewSkeleton";
import { UserContext } from "../context/UserContextProvider";
import { useGeneratedContext } from "../hooks/useGeneratedContext";
import { useLogout } from "../hooks/useLogout";
import { usePlaylistGetContext } from "../hooks/usePlaylistGetContext";
import { usePlaylistsGetAllContext } from "../hooks/usePlaylistsGetAllContext";
import PathConstants from "../routes/PathConstants";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Home: React.FC = () => {
  const { logout } = useLogout();
  const [selectedPlaylistIndex, setSelectedPlaylistIndex] = useState<number | null>(null);
  const [allPLisLoading, setAllPLIsLoading] = useState(true);
  const [onePLIsLoading, setOnePLIsLoading] = useState(true);
  const [generatedIsLoading, setGeneratedIsLoading] = useState(false);
  const { playlists, dispatchPlaylists } = usePlaylistsGetAllContext();
  const { playlist, dispatchSingle } = usePlaylistGetContext();
  const { generated, dispatchGenerated } = useGeneratedContext();
  const [isVisible, setIsVisible] = useState(false);
  const [searchRecommendationsError, setSearchRecommendationsError] = useState("");
  const [modalMessage, setModalMessage] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const { user } = useContext(UserContext);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.body.dir = i18n.dir();
  }, [i18n, i18n.language]);

  const showModal = (message: string) => {
    setModalMessage(message);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const controller = new AbortController();

    const getPlaylists = async () => {
      setAllPLIsLoading(true);

      try {
        const response = await fetch(BASE_URL + "/api/spotify/playlists/", {
          headers: { "Accept-Language": i18n.language },
          credentials: "include",
          signal: controller.signal,
        });

        if (!response.ok) {
          console.log(`ERROR: ${await response.text()}`);
          return;
        } else {
          const data = await response.json();
          dispatchPlaylists({ type: "SET_PLAYLISTS", payload: data });
          setSelectedPlaylistIndex(data.items[0].id);
          setAllPLIsLoading(false);
        }
      } catch (error: any) {
        if (error.name === "AbortError") return;
        console.log(`ERROR: ${error.message}`);
        return;
      }
    };

    getPlaylists();

    return () => controller.abort();
  }, [dispatchPlaylists, i18n.language]);

  useEffect(() => {
    const controller = new AbortController();

    const getPlaylist = async () => {
      if (selectedPlaylistIndex == null) return;
      setOnePLIsLoading(true);

      try {
        const response = await fetch(BASE_URL + `/api/spotify/playlist/${selectedPlaylistIndex}/`, {
          headers: { "Accept-Language": i18n.language },
          credentials: "include",
          signal: controller.signal,
        });

        if (!response.ok) {
          console.log(`ERROR: ${await response.text()}`);
          return;
        } else {
          const data = await response.json();
          dispatchSingle({ type: "SET_PLAYLIST", payload: data });
          setOnePLIsLoading(false);
        }
      } catch (error: any) {
        if (error.name === "AbortError") return;
        console.log(`ERROR: ${error.message}`);
      }
    };
    getPlaylist();

    return () => controller.abort();
  }, [dispatchSingle, selectedPlaylistIndex, i18n.language]);

  const generateRecommendation = async () => {
    try {
      setGeneratedIsLoading(true);
      setSearchRecommendationsError("");
      const response = await fetch(BASE_URL + `/api/recommendations/generate/${selectedPlaylistIndex}`, {
        headers: { "Accept-Language": i18n.language },
        credentials: "include",
      });
      if (!response.ok) {
        const responseError = await response.json();
        setSearchRecommendationsError(responseError.message);
        return;
      } else {
        const data = await response.json();
        dispatchGenerated({ type: "SET_GENERATED", payload: data });
        setIsVisible(true);
      }
    } catch (error: any) {
      console.log(`ERROR: ${error.message}`);
    } finally {
      setGeneratedIsLoading(false);
    }
  };

  const handlePlaylistClick = (index: number) => {
    setSearchRecommendationsError("");

    if (selectedPlaylistIndex !== null) {
      document?.querySelector(`.preview-playlist[data-index="${selectedPlaylistIndex}"]`)?.classList.remove("pushed");
    }

    setIsVisible(false);
    setSelectedPlaylistIndex(index);
    dispatchGenerated({ type: "SET_GENERATED", payload: [] });
    document?.querySelector(`.list`)?.classList.remove("hidden");
    document?.querySelector(`.cards-container`)?.classList.add("hidden");

    document?.querySelector(`.preview-playlist[data-index="${index}"]`)?.classList.add("pushed");
    document?.querySelector(`.generate`)?.classList.remove("hidden");
  };

  console.log(playlists);

  return (
    <div className="main">
      <Sidebar
        playlists={playlists}
        selectedPlaylistIndex={selectedPlaylistIndex}
        handlePlaylistClick={handlePlaylistClick}
        allPLisLoading={allPLisLoading}
      />

      <div className="main-content">
        <div className="sticky-nav">
          <div className="sticky-nav-icons">
            <FontAwesomeIcon icon={faUser} />
            <p>{user?.firstName}</p>
          </div>
          <div className="flex sticky-nav-optons">
            <Languages setSearchRecommendationsError={setSearchRecommendationsError} />
            <button className="badge nav-item dark-badge">
              <Link to={PathConstants.PROFILE_UPDATE}>{t("main.profile")}</Link>
            </button>
            <button onClick={logout} className="badge nav-item hide">
              {t("main.logout")}
            </button>
          </div>
        </div>
        {playlist ? (
          <div>
            <PlayListContainer
              playlist={playlist}
              selectedPlaylistIndex={selectedPlaylistIndex}
              generateRecommendation={generateRecommendation}
              onePLIsLoading={onePLIsLoading}
              allPLisLoading={allPLisLoading}
              generatedIsLoading={generatedIsLoading}
              searchRecommendationsError={searchRecommendationsError}
              isVisible={isVisible}
            />
          </div>
        ) : (
          <PlayListPreviewSkeleton />
        )}
        {!generatedIsLoading && playlist ? (
          <div>
            <RecommendationsContainer
              playlist={playlist}
              selectedPlaylistIndex={selectedPlaylistIndex}
              generated={generated}
              isVisible={isVisible}
              generatedIsLoading={generatedIsLoading}
            />
          </div>
        ) : (
          <div className="cards-container-skeleton">
            {[...Array(6)].map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        )}
      </div>
      <Modal isVisible={isModalVisible} message={modalMessage} onClose={closeModal} />
    </div>
  );
};

export default Home;
