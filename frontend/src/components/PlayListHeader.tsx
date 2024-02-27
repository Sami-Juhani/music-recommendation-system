import React from 'react';
import { AiFillClockCircle } from 'react-icons/ai';




const PlayListHeader: React.FC = () => {

  return (
    
        <div className="header-row">
            <div className="col">
                <span>#</span>
            </div>
            <div className="col">
                <span>TITLE</span>
            </div>
            <div className="col">
                <span>ALBUM</span>
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