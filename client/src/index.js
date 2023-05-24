import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import FortuneWheelContextComponent from './context/FortuneContext';
import WalletContextComponent from './context/WalletContext';
import SocketContextComponent from './context/SocketContext';

import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

ReactDOM.render(
  <React.Fragment>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <FortuneWheelContextComponent>
          <WalletContextComponent>
            <SocketContextComponent>
              <App />
            </SocketContextComponent>
          </WalletContextComponent>
        </FortuneWheelContextComponent>
      </QueryClientProvider>
    </BrowserRouter>
  </React.Fragment>,
  document.getElementById('root')
);
