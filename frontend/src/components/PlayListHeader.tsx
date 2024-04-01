import React from 'react';
import { AiFillClockCircle } from 'react-icons/ai';
import { useTranslation } from "react-i18next";




const PlayListHeader: React.FC = () => {
    const { t } = useTranslation();

  return (
    
        <div className="header-row">
            <div className="col">
                <span>#</span>
            </div>
            <div className="col">
                <span>{t('playListHeader.title')}</span>
            </div>
            <div className="col">
                <span>{t('playListHeader.album')}</span>
            </div>
            <div className="col">
                <span>
                <AiFillClockCircle />
                </span>
            </div>
        </div>
  );
};

export default PlayListHeader;