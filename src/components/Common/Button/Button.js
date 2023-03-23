import React from 'react';
import { PlayIcon } from '@heroicons/react/20/solid';
import HistoryIcon from '@mui/icons-material/History';

const Button = ({
  text = '',
  className = '',
  btnClassName = '',
  isHashPackBtn = false,
  isPlayBtn = false,
  isHistoryBtn = false,
  disabled = false,
  onClick = () => {}
}) => {
  const handleClick = () => {
    if (disabled) return;
    onClick();
  };

  return (
    <div className={`flex-shrink-0 pr-2 ${className}`}>
      <button
        type="button"
        className={`relative inline-flex items-center gap-x-1.5 rounded-md py-2 px-[12px] sm:px-4 sm:py-2 text-xxs sm:text-xs 
       xl:text-sm text-white shadow-sm  bg-indigo-600 hover:bg-indigo-400 transition-all 
        ease-in duration-100 hover:text-gray-900 GrindFontFamily ${btnClassName} max-w-[150px] sm:max-w-none ${
          disabled && 'disable-btn'
        }`}
        onClick={handleClick}>
        {isPlayBtn && (
          <div className="">
            <PlayIcon className="h-4 w-4 sm:h-5 sm:w-5 text-white " aria-hidden="true" />
          </div>
        )}
        {isHistoryBtn && (
          <div className="">
            <HistoryIcon className="h-4 w-4 sm:h-5 sm:w-5 text-white " aria-hidden="true" />
          </div>
        )}

        {text}
        {isHashPackBtn && (
          <div className="ml-[12px] sm:ml-4">
            <img
              src="https://uploads-ssl.webflow.com/61ce2e4bcaa2660da2bb419e/62e14973c65367120073a891_app-icon.webp"
              loading="lazy"
              alt=""
              className="absolute right-[6px] top-[17%] sm:top-[15%] w-[30px] h-[30px] sm:w-[24px] sm:h-[24px]"></img>
          </div>
        )}
      </button>
    </div>
  );
};

export default Button;
