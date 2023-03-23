import React, { useContext } from 'react';
import Navbar from './Navbar';
import { WalletContext } from '../../../context/WalletContext';
import BuiltOnHederaBanner from './BuiltOnHederaBanner';
import { ALL_ROUTES_PATHS } from '../../../utils/routes';
import { useNavigate } from 'react-router-dom';

const index = () => {
  const navigate = useNavigate();

  const { isAdmin } = useContext(WalletContext);

  return (
    <>
      <div className="w-full  fixed top-0 z-20">
        <Navbar />
      </div>
      <div className="mt-[64px] sm:mt-[80px] w-full ">
        <BuiltOnHederaBanner />
      </div>
      {isAdmin && <button onClick={() => navigate(ALL_ROUTES_PATHS.ADMIN)}>Admin page</button>}
    </>
  );
};

export default index;
