import { useState, useEffect, useContext } from 'react';
import BodyContainer from '../../Common/BodyContainer/BodyContainer';
import RadioButtons from '../../Common/Inputs/RadioButtons';
import { WalletContext } from '../../../context/WalletContext';
import GrayCard from '../../Common/Cards/GrayCard';
import Button from '../../Common/Button/Button';
import SideDrawer from '../../Common/SideDrawer/SideDrawer';
import SideDrawerIndex from './SideDrawer/Index';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { isArrayReady } from '../../../utils/helperFunctions';

import {
  ZERO,
  ARRAY_KEYS,
  PASSES_TYPES,
  WHEEL_BET_AMOUNTS,
  HCS_KEYS
} from '../../../utils/constants';
import { toast } from 'react-toastify';
import { getLeaderBoardByAccountId } from '../../../services/hederaService';

import {
  getPlatinumPassTokenId,
  getGoldPassTokenId,
  getSilverPassTokenId
} from '../../../utils/helperFunctions';
import { ALL_ROUTES_PATHS } from '../../../utils/routes';

const Dashboard = () => {
  const {
    buyPassAndTransferNftToUserAccount,
    associateSkillerToken,
    userAccountId,
    platinumPassesInUserAccount,
    goldPassesInUserAccount,
    silverPassesInUserAccount
  } = useContext(WalletContext);

  const navigate = useNavigate();

  const { data, error, refetch } = useQuery(['getLeaderBoardByAccountId', userAccountId], () =>
    getLeaderBoardByAccountId(userAccountId)
  );

  const [buySelectedPass, setBuySelectedPass] = useState();
  const [isSideModalOpen, setIsSideModalOpen] = useState(false);

  useEffect(() => {
    refetch();
  }, [platinumPassesInUserAccount, silverPassesInUserAccount, goldPassesInUserAccount]);

  useEffect(() => {
    setBuySelectedPass(BUY_PASSES_OPTIONS?.[ZERO]);
  }, []);

  const BUY_PASSES_OPTIONS = [
    {
      [ARRAY_KEYS.VALUE]: WHEEL_BET_AMOUNTS.PLATINUM,
      [ARRAY_KEYS.LABEL]: PASSES_TYPES.PLATINUM,
      [ARRAY_KEYS.DESCRIPTION]: '- 2000 HBAR',
      [ARRAY_KEYS.ASSOCIATE_TOKEN_ID]: getPlatinumPassTokenId()
    },
    {
      [ARRAY_KEYS.VALUE]: WHEEL_BET_AMOUNTS.GOLD,
      [ARRAY_KEYS.LABEL]: PASSES_TYPES.GOLD,
      [ARRAY_KEYS.DESCRIPTION]: '- 500 HBAR',
      [ARRAY_KEYS.ASSOCIATE_TOKEN_ID]: getGoldPassTokenId()
    },
    {
      [ARRAY_KEYS.VALUE]: WHEEL_BET_AMOUNTS.SILVER,
      [ARRAY_KEYS.LABEL]: PASSES_TYPES.SILVER,
      [ARRAY_KEYS.DESCRIPTION]: '- 100 HBAR',
      [ARRAY_KEYS.ASSOCIATE_TOKEN_ID]: getSilverPassTokenId()
    }
  ];

  const totalWinnings = [
    {
      [ARRAY_KEYS.LABEL]: PASSES_TYPES.PLATINUM
    },
    {
      [ARRAY_KEYS.LABEL]: PASSES_TYPES.GOLD
    },
    {
      [ARRAY_KEYS.LABEL]: PASSES_TYPES.SILVER
    }
  ];

  const closeSideModal = () => {
    setIsSideModalOpen(false);
  };

  const openSideModal = () => {
    setIsSideModalOpen(true);
  };

  const getTotalBuyHbars = () => {
    return buySelectedPass?.[ARRAY_KEYS.VALUE];
  };

  const handleBuyClick = async () => {
    const tokenIdForAssociation = buySelectedPass?.[ARRAY_KEYS.ASSOCIATE_TOKEN_ID];

    if (!userAccountId || !tokenIdForAssociation)
      return toast.error('Missing association token id');

    await associateSkillerToken();

    buyPassAndTransferNftToUserAccount(
      getTotalBuyHbars(),
      buySelectedPass[ARRAY_KEYS.LABEL],
      tokenIdForAssociation
    );
  };

  const BuyToken = () => {
    return (
      <>
        <div className="mt-[30px] text-xs md:text-sm w-full text-white">
          Total - {getTotalBuyHbars()} Hbars
        </div>
        <Button
          text={`${
            userAccountId ? `Buy 1 ${buySelectedPass?.[ARRAY_KEYS.LABEL]} Pass` : 'Connect wallet'
          }`}
          className={`mt-[10px]`}
          btnClassName="justify-center"
          onClick={handleBuyClick}
          disabled={!userAccountId}
          allowFullWidth
        />
      </>
    );
  };

  const TotalWinnings = () => {
    const getTotalWinning = data?.reduce(
      (total, item) => total + Number(item[HCS_KEYS.winner_amount]),
      ZERO
    );

    if (error) return <p className="text-white">Something went wrong...</p>;
    return (
      <>
        <fieldset>
          <div className="pb-[15px] lg:pb-[25px] text-indigo-500 text-lg sm:text-xl lg:text-2xl whitespace-nowrap">
            Your Winnings -
          </div>
          <div className="ml-1 space-y-4 md:space-y-7">
            {isArrayReady(totalWinnings)?.map((item) => {
              const getWinningAmount = data?.find(
                (winningItem) => winningItem[HCS_KEYS.pass_type] === item[ARRAY_KEYS.LABEL]
              )?.[HCS_KEYS.winner_amount];

              return (
                <div key={item?.[ARRAY_KEYS.LABEL]} className="relative flex items-center">
                  <div className="text-xs md:text-sm leading-6">
                    <label className="font-medium text-indigo-500 ">{item[ARRAY_KEYS.LABEL]}</label>{' '}
                    <span className="text-white">- {getWinningAmount ?? 0} Hbar</span>
                  </div>
                </div>
              );
            })}
          </div>
        </fieldset>
        <div className="mt-[34px] text-xs md:text-sm w-full text-white ml-1 ">
          Total - {getTotalWinning ?? 0} Hbar
        </div>
      </>
    );
  };

  return (
    <>
      <BodyContainer heading="Dashboard" className="h-auto" rootClassName="h-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-14 pb-[15px]">
          <GrayCard>
            <div className="flex flex-col justify-between">
              <TotalWinnings />
              <div className="grid md:grid-cols-2 md:gap-4 mt-[10px]">
                <div className="hidden md:flex justify-end">
                  <Button
                    text={`Your History`}
                    onClick={openSideModal}
                    disabled={!userAccountId}
                    isHistoryBtn
                    allowFullWidth
                    btnClassName="justify-center"
                  />
                </div>
                <div className="w-full flex justify-start">
                  <Button
                    text={`Leader board`}
                    onClick={() => navigate(ALL_ROUTES_PATHS.LEADER_BOARD)}
                    isTrophyBtn
                    allowFullWidth
                    btnClassName="justify-center"
                  />
                </div>
              </div>
            </div>
          </GrayCard>

          <GrayCard className="flex flex-col justify-between">
            <>
              <RadioButtons
                heading="Buy Passes -"
                options={BUY_PASSES_OPTIONS}
                data={buySelectedPass}
                setData={setBuySelectedPass}
              />

              <BuyToken />
            </>
          </GrayCard>
        </div>
      </BodyContainer>

      <SideDrawer isSideModalOpen={isSideModalOpen} onClose={closeSideModal}>
        <SideDrawerIndex userAccountId={userAccountId} isSideModalOpen={isSideModalOpen} />
      </SideDrawer>
    </>
  );
};

export default Dashboard;
