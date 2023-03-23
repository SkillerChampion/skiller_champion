import React, { useEffect, useContext, Suspense } from 'react';
// import { io } from 'socket.io-client';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import FallbackLoader from './components/Common/FallbackLoader/FallbackLoader';
import WinnerLoserAnimation from './components/Common/WinnerLoserAnimation/WinnerLoserAnimation';
import Header from './components/Common/Header/index';
import Admin from './components/Admin/Index';

import { scrollToTop } from './utils/helperFunctions';
import { FortuneContext } from './context/FortuneContext';
import { WalletContext } from './context/WalletContext';

import { ALL_ROUTES, ALL_ROUTES_PATHS } from './utils/routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { pathname } = useLocation();
  const { isWheelOfFortuneSpinning, showWinnerLoser, setShowWinnerLoser } =
    useContext(FortuneContext);

  const { isAdmin } = useContext(WalletContext);

  useEffect(() => {
    scrollToTop();
  }, [pathname]);

  const ToastWrapper = () => (
    <ToastContainer
      position="top-right"
      autoClose={6000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      className="text-xs sm:text-sm toastStyles"
    />
  );

  return (
    <div className={`${isWheelOfFortuneSpinning && 'pointer-events-none'} h-screen`}>
      <ToastWrapper />
      <WinnerLoserAnimation data={showWinnerLoser} setData={setShowWinnerLoser} />
      <Header />
      <Suspense fallback={<FallbackLoader />}>
        <Routes>
          {ALL_ROUTES.map((item, index) => (
            <Route path={item.pathName} element={<item.Component />} key={index} />
          ))}

          {isAdmin && <Route path={ALL_ROUTES_PATHS.ADMIN} element={<Admin />} />}
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
