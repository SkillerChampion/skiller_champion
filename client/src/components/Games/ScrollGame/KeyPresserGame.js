/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  HUNDRED_POINT_FIVE_NUMBER,
  ZERO,
  KEY_PRESS_GAME_KEYS,
  TWO_SECONDS,
  NINETY_FIVE,
  FIVE
} from '../../../utils/constants';
import classes from './Index.module.css';

const PlayerSection = ({ bg, height }) => (
  <div className={bg} style={{ height: `${height}%` }}></div>
);

const CurrentWord = ({ height, rightAligned = false, currentKey = '' }) => {
  const childHeight = 80;

  const handleTopPos = () => {
    return height > NINETY_FIVE ? height - FIVE : height;
  };
  return rightAligned ? (
    <div
      className={`absolute bg-gray-800 border-2 border-indigo-800 w-[160px] 
      h-[${childHeight}px] rounded-lg ${classes.key} text-4xl text-white shadow-lg`}
      style={{ top: `${handleTopPos()}%`, marginTop: `-${childHeight / 2}px`, right: '100px' }}>
      {currentKey}
    </div>
  ) : (
    <div
      className={`absolute bg-gray-800 border-2 border-indigo-800 w-[160px] 
      h-[${childHeight}px] rounded-lg ${classes.key} text-4xl text-white shadow-lg`}
      style={{ top: `${handleTopPos()}%`, marginTop: `-${childHeight / 2}px`, left: '100px' }}>
      {currentKey}
    </div>
  );
};

const KeyPresserGame = () => {
  const [currentPlayerHeight, setCurrentPlayerHeight] = useState(50);
  const [opponentPlayerHeight, setOpponentPlayerHeight] = useState(50);
  const [currentKey, setCurrentKey] = useState(KEY_PRESS_GAME_KEYS[ZERO]);

  const [keyPressed, setKeyPressed] = useState(false);

  const chooseRandomCurrentKey = () => {
    const randomWord = KEY_PRESS_GAME_KEYS[Math.floor(Math.random() * KEY_PRESS_GAME_KEYS.length)];

    setCurrentKey(randomWord);
  };

  const handleScroll = () => {
    const scrollSpeed = 0.6; // scroll speed

    const addSpeedInHeight = (prevHeight) => {
      const height = prevHeight + scrollSpeed;

      if (height < ZERO || height > HUNDRED_POINT_FIVE_NUMBER) return prevHeight;

      return height;
    };

    const reduceSpeedInHeight = (prevHeight) => {
      const height = prevHeight - scrollSpeed;

      if (height < ZERO || height > HUNDRED_POINT_FIVE_NUMBER) return prevHeight;

      return height;
    };

    setCurrentPlayerHeight(reduceSpeedInHeight);
    setOpponentPlayerHeight(addSpeedInHeight);
  };

  const handleKeyDown = (e) => {
    if (e.key === currentKey && !keyPressed) {
      setKeyPressed(true);
      handleScroll(e);
    }
  };

  useEffect(() => {
    let intervalId = setInterval(chooseRandomCurrentKey, TWO_SECONDS);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const handleKeyUp = (e) => {
      if (e.key === currentKey) setKeyPressed(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [currentKey, keyPressed]);

  return (
    <div className="h-full w-full max-h-full relative ov">
      <PlayerSection bg="bg-red-500" height={currentPlayerHeight} />
      <CurrentWord height={currentPlayerHeight} currentKey={currentKey} />
      <CurrentWord height={currentPlayerHeight} rightAligned currentKey={currentKey} />
      <PlayerSection bg="bg-green-400" height={opponentPlayerHeight} />
    </div>
  );
};

export default KeyPresserGame;
