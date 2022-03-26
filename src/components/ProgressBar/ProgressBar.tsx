import React from 'react';
import './ProgressBar.css';
import { AppContext } from '../../context/AppContext';

export const ProgressBar: React.FC = () => {
  const { progress } = React.useContext(AppContext);

  const widthStyle = {
    width: `${progress}%`,
    transition: 'all 0.4s',
  };

  return (
    <>
      <div className="progressbar">
        <div className="progressbar__title">Form progress:</div>
        <div className="progessbar__bg">
          <div className="progressbar__fill" style={widthStyle}></div>
        </div>
      </div>
    </>
  );
};
