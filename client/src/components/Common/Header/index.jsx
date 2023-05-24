import React, { useContext, useEffect, useState } from 'react';
import Navbar from './Navbar';
import { WalletContext } from '../../../context/WalletContext';
import BuiltOnHederaBanner from './BuiltOnHederaBanner';
import { ALL_ROUTES_PATHS } from '../../../utils/routes';
import { useNavigate, useLocation } from 'react-router-dom';

const index = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isAdmin } = useContext(WalletContext);

  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const ScrollHandler = () => {
      if (window.scrollY > 60) {
        setScrolling(true);
      } else if (window.scrollY < 20) {
        setScrolling(false);
      }
    };

    window.addEventListener('scroll', ScrollHandler);

    return () => {
      window.removeEventListener('scroll', ScrollHandler);
    };
  }, []);

  return (
    <>
      <div className="w-full fixed top-0 z-50">
        <Navbar />
      </div>
      {pathname !== ALL_ROUTES_PATHS.WHITE_PAPER &&
        pathname !== ALL_ROUTES_PATHS.KEY_PRESSER_GAME_PLAY && (
          <div
            className={`fixed z-20 top-[64px] sm:top-[80px] w-full ${
              scrolling ? 'hidden' : 'block'
            }`}>
            <BuiltOnHederaBanner />
          </div>
        )}
      {isAdmin && <button onClick={() => navigate(ALL_ROUTES_PATHS.ADMIN)}>Admin page</button>}
    </>
  );
};

export default index;
