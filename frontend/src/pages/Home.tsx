// HorizontalScrollFeed.tsx
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { playLists, generatedSuggestions } from '../assets/dataset';
import Sidebar from '../components/Sidebar';
import RecommendationsContainer from '../components/RecommendationContainer';
import PlayListContainer from '../components/PlayListContainer';
import { usePlaylistsGetAllContext } from "../hooks/usePlaylistsGetAllContext";
import { usePlaylistGetContext } from "../hooks/usePlaylistGetContext";
import { useGeneratedContext } from "../hooks/useGeneratedContext";

const Home: React.FC = () => {

  const [generated1, setGenerated] = useState<{
    name: string;
    image: string;
    id: number;
    artists: string;
    duration: number;
    album: string;
    context_uri: string;
    track_number: number;
  }[]>([]);

  const [selectedPlaylistIndex, setSelectedPlaylistIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { playlists, dispatchPlaylists } = usePlaylistsGetAllContext();
  const { playlist, dispatchSingle } = usePlaylistGetContext();
  const { generated, dispatchGenerated } = useGeneratedContext();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const getPlaylists = async () => {
      //setIsLoading(true); // Start loading
      try {
        const response = await fetch("http://127.0.0.1:8000/api/spotify/playlists/", {
          credentials: 'include'
        });
        if (!response.ok) {
          // If the response is not ok, log the error before calling response.json()
          console.log("Error with the response");
          dispatchPlaylists({ type: "SET_PLAYLISTS", payload: [...playLists] });
        } else {
          const data = await response.json(); // Only parse JSON if response is ok
          console.log(data);
          dispatchPlaylists({ type: "SET_PLAYLISTS", payload: data });
          setSelectedPlaylistIndex(data.items[0].id);
        }
      } catch (error) {
        console.log(error);
        dispatchPlaylists({ type: "SET_PLAYLISTS", payload: [...playLists] });
        //setError(true);
      }

      //setIsLoading(false);
    };
    getPlaylists();
  }, [dispatchPlaylists]);

  useEffect(() => {
    const getPlaylist = async () => {
      setIsLoading(true); // Start loading
      try {
        const id = selectedPlaylistIndex; // Replace with the actual id you want to use

        const response = await fetch(`http://127.0.0.1:8000/api/spotify/playlist/${id}/`, {
          credentials: 'include'
        });

        if (!response.ok) {
          // If the response is not ok, log the error before calling response.json()
          console.log("Error with the response");
          dispatchSingle({ type: "SET_PLAYLIST", payload: [] });
        } else {
          const data = await response.json(); // Only parse JSON if response is ok
          console.log(data);
          dispatchSingle({ type: "SET_PLAYLIST", payload: data });
        }
      } catch (error) {
        console.log(error);
        dispatchSingle({ type: "SET_PLAYLIST", payload: [] });
        //setError(true);
      }
      setIsLoading(false);
    };
    getPlaylist();
  }, [dispatchSingle, selectedPlaylistIndex]);

  const handlePlaylistClick = (index: number) => {
    
    console.log('clicked', index);
    if (selectedPlaylistIndex !== null) {
      document
        ?.querySelector(`.preview-playlist[data-index="${selectedPlaylistIndex}"]`)
        ?.classList.remove('pushed');
    }
    setIsVisible(false);
    setSelectedPlaylistIndex(index);
    setGenerated([]);
    document
      ?.querySelector(`.list`)
      ?.classList.remove('hidden');
    document
      ?.querySelector(`.cards-container`)
      ?.classList.add('hidden');

    document
      ?.querySelector(`.preview-playlist[data-index="${index}"]`)
      ?.classList.add('pushed');
    document
      ?.querySelector(`.generate`)
      ?.classList.remove('hidden');
  };



  const generateRecommendation = async () => {
    try {
      const id = selectedPlaylistIndex; // Replace with the actual id you want to use

      const response = await fetch(`http://127.0.0.1:8000/api/recommendations/generate/${id}`, {
        credentials: 'include'
      });

      if (!response.ok) {
        // If the response is not ok, log the error before calling response.json()
        console.log("Error with the response");
        dispatchGenerated({ type: "SET_GENERATED", payload: [] });
      } else {
        const data = await response.json(); // Only parse JSON if response is ok
        console.log(data);
        dispatchGenerated({ type: "SET_GENERATED", payload: data });
        setIsVisible(true);
      }
    } catch (error) {
      console.log(error);
      dispatchGenerated({ type: "SET_GENERATED", payload: [] });
      //setError(true);
    }
    document
      ?.querySelector(`.list`)
      ?.classList.add('hidden');
    document
      ?.querySelector(`.cards-container`)
      ?.classList.remove('hidden');
    document
      ?.querySelector(`.generate`)
      ?.classList.add('hidden');
  }

  return (
    <div className="main">
      <Sidebar
        playLists={playlists}
        selectedPlaylistIndex={selectedPlaylistIndex}
        handlePlaylistClick={handlePlaylistClick} />

      <div className="main-content">
        <div className="sticky-nav">
          <div className="sticky-nav-icons">
            <FontAwesomeIcon icon={faUser} />
            <p>Username</p>
          </div>
          <div className="sticky-nav-optons">
            <button className="badge nav-item hide">Log in</button>
            <button className="badge nav-item dark-badge">Sign up</button>
          </div>
        </div>

        {playlist ? (
            <>
              <PlayListContainer
                playlist={playlist}
                selectedPlaylistIndex={selectedPlaylistIndex}
                generateRecommendation={generateRecommendation} />
            </>) : null}
        {generated ? (
        <>
          <RecommendationsContainer
            playlist={playlist}
            selectedPlaylistIndex={selectedPlaylistIndex}
            generated={generated}
            isVisible={isVisible} />
        </>) : null}

      </div>
    </div>


  );
};

export default Home;


