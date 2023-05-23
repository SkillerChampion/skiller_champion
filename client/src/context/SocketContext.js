/* eslint-disable no-unused-vars */
import { createContext, useState, useEffect } from 'react';
import { getSocketApi } from '../utils/helperFunctions';
import io from 'socket.io-client';

export const SocketContext = createContext();
export const socket = io(getSocketApi());

const SocketContextComponent = (props) => {
  const [isConnected, setIsConnected] = useState(false);

  function onConnect() {
    setIsConnected(true);
  }

  function onDisconnect() {
    setIsConnected(false);
  }

  useEffect(() => {
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  useEffect(() => {
    if (isConnected) {
      console.log('Socket server connected');
    } else console.log('Socket connection lost');
  }, [isConnected]);

  return <SocketContext.Provider value={{}}>{props.children}</SocketContext.Provider>;
};

export default SocketContextComponent;
