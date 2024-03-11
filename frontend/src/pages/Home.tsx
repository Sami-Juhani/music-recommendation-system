// HorizontalScrollFeed.tsx
import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../components/Sidebar';
import RecommendationsContainer from '../components/RecommendationContainer';
import PlayListContainer from '../components/PlayListContainer';
import { usePlaylistsGetAllContext } from "../hooks/usePlaylistsGetAllContext";
import { usePlaylistGetContext } from "../hooks/usePlaylistGetContext";
import { useGeneratedContext } from "../hooks/useGeneratedContext";
import { useLogout } from "../hooks/useLogout";
import { UserContext } from "../context/UserContextProvider";
import { Link } from "react-router-dom";
import PathConstants from "../routes/PathConstants";


const Home: React.FC = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const { logout } = useLogout();

  const { user }  = useContext(UserContext);
  console.log(user);

  const [selectedPlaylistIndex, setSelectedPlaylistIndex] = useState<number | null>(null);
  const [allPLisLoading, setAllPLIsLoading] = useState(false);
  const [onePLIsLoading, setOnePLIsLoading] = useState(false);
  const [generatedIsLoading, setGeneratedIsLoading] = useState(false);
  const { playlists, dispatchPlaylists } = usePlaylistsGetAllContext();
  const { playlist, dispatchSingle } = usePlaylistGetContext();
  const { generated, dispatchGenerated } = useGeneratedContext();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const getPlaylists = async () => {
      setAllPLIsLoading(true); // Start loading
      try {

        const response = await fetch(BASE_URL + "/api/spotify/playlists/", {
          credentials: 'include',
        });
        if (!response.ok) {
          // If the response is not ok, log the error before calling response.json()
          console.log("Error with the response");
          dispatchPlaylists({ type: "SET_PLAYLISTS", payload: [...playlists] });
        } else {
          const data = await response.json(); // Only parse JSON if response is ok
          console.log(data);
          dispatchPlaylists({ type: "SET_PLAYLISTS", payload: data });
          setSelectedPlaylistIndex(data.items[0].id);
        }
      } catch (error) {
        console.log(error);
        dispatchPlaylists({ type: "SET_PLAYLISTS", payload: [playlists] });
        //setError(true);
      }

      setAllPLIsLoading(false);
    };
    getPlaylists();
  }, [dispatchPlaylists]);

  useEffect(() => {
    const getPlaylist = async () => {
      setOnePLIsLoading(true); // Start loading
      try {
        const id = selectedPlaylistIndex; // Replace with the actual id you want to use


        const response = await fetch(BASE_URL + `/api/spotify/playlist/${id}/`, {
          
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
      setOnePLIsLoading(false);
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
    dispatchGenerated({ type: "SET_GENERATED", payload: [] });
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
    setGeneratedIsLoading(true); // Start loading
    document
    ?.querySelector(`.list`)
    ?.classList.add('hidden');
    document
    ?.querySelector(`.cards-container`)
    ?.classList.remove('hidden');
    try {
      const id = selectedPlaylistIndex; // Replace with the actual id you want to use


      const response = await fetch(BASE_URL + `/api/recommendations/generate/${id}`, {
        
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
    ?.querySelector(`.generate`)
    ?.classList.add('hidden');
    setGeneratedIsLoading(false);
  }

  return (
    <div className="main">
      <Sidebar
        playlists={playlists}
        selectedPlaylistIndex={selectedPlaylistIndex}
        handlePlaylistClick={handlePlaylistClick} 
        allPLisLoading={allPLisLoading}/>

      <div className="main-content">
        <div className="sticky-nav">
          <div className="sticky-nav-icons">
            <FontAwesomeIcon icon={faUser} />
            <p>{user && user.firstname}</p>
          </div>
          <div className="sticky-nav-optons">
            <button>
              <Link to={PathConstants.PROFILE_UPDATE} className="text-white py-2 px-4 rounded-lg bg-green-500 mr-2">
                Edit User
              </Link>
            </button>
            <button
                  onClick={logout} 
                  className="badge nav-item hide">Log out</button>
                {/* <button className="badge nav-item dark-badge">Sign up</button> */}
            
          </div>
        </div>

        {playlist ? (
            <div>
              <PlayListContainer
                playlist={playlist}
                selectedPlaylistIndex={selectedPlaylistIndex}
                generateRecommendation={generateRecommendation}
                onePLIsLoading = {onePLIsLoading}
                generatedIsLoading = {generatedIsLoading}
                 />
            </div>) : null}
        {generated ? (
        <div>
          <RecommendationsContainer
            playlist={playlist}
            selectedPlaylistIndex={selectedPlaylistIndex}
            generated={generated}
            isVisible={isVisible}
            onePLIsLoading = {onePLIsLoading}
            generatedIsLoading = {generatedIsLoading}/>
        </div>) : null}

      </div>
    </div>


  );
};

export default Home;


