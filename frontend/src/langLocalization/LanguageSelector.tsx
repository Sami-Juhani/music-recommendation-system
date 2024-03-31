import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import "../styles/LanguageSelector.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  
  useEffect(() => {
    document.body.dir = i18n.dir();
  }, [i18n, i18n.languages]);

  return (
    <div className="language-selector">
      <div className="dropdown">
        <button className="dropbtn">
          <FontAwesomeIcon icon={faGlobe} />
        </button>
        <div className="dropdown-content">
            <button onClick={() => changeLanguage("en")}>English</button>
            <button onClick={() => changeLanguage("fr")}>French</button>
            <button onClick={() => changeLanguage("hi")}>Hindi</button>
            <button onClick={() => changeLanguage("ar")}>Arabic</button>
            <button onClick={() => changeLanguage("ja")}>Japanese</button>
            <button onClick={() => changeLanguage("ru")}>Russia</button>
            <button onClick={() => changeLanguage("fi")}>Finnish</button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
