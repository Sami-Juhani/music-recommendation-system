// HorizontalScrollFeed.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { playLists, generatedSuggestions } from '../assets/dataset';
import Sidebar from '../components/Sidebar';
import RecommendationsContainer from '../components/RecommendationContainer';
import PlayListContainer from '../components/PlayListContainer';
import { useLogout } from '../hooks/useLogout';

const Home: React.FC = () => {
  const { logout } = useLogout();

  const [generated, setGenerated] = useState<{ 
    name: string; 
    image: string; 
    id: number; 
    artists: string; 
    duration: number; 
    album: string; 
    context_uri: string; 
    track_number: number; }[]>([]);

  const [selectedPlaylistIndex, setSelectedPlaylistIndex] = useState<number | null>(null);

  const handlePlaylistClick = (index: number) => {
    console.log('clicked', index);
    if (selectedPlaylistIndex !== null) {
      document
        ?.querySelector(`.preview-playlist[data-index="${selectedPlaylistIndex}"]`)
        ?.classList.remove('pushed');
    }

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

 

  const generateRecommendation = () => {
    setGenerated(generatedSuggestions);
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
      playLists={playLists} 
      selectedPlaylistIndex={selectedPlaylistIndex} 
      handlePlaylistClick={handlePlaylistClick} />

    <div className="main-content">
        <div className="sticky-nav">
            <div className="sticky-nav-icons">
                <FontAwesomeIcon icon={faUser} />
                <p>Karjalainen</p>
            </div>
            <div className="sticky-nav-optons">
                <button
                  onClick={logout} 
                  className="badge nav-item hide">Log out</button>
                {/* <button className="badge nav-item dark-badge">Sign up</button> */}
            </div>
        </div>
        
      <PlayListContainer
        playLists={playLists} 
        selectedPlaylistIndex={selectedPlaylistIndex}
        generateRecommendation={generateRecommendation} />
      
      <RecommendationsContainer 
        playLists={playLists} 
        selectedPlaylistIndex={selectedPlaylistIndex}
        generated={generated}/>
    </div>
  </div>


  );
};

export default Home;


