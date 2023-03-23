import { useState, useEffect, useContext } from 'react';
import BodyContainer from '../Common/BodyContainer/BodyContainer';
import RadioButtons from '../Common/Inputs/RadioButtons';
import { WalletContext } from '../../context/WalletContext';
import GrayCard from '../Common/Cards/GrayCard';
import Button from '../Common/Button/Button';
import SideDrawer from '../Common/SideDrawer/SideDrawer';
import SideDrawerIndex from './SideDrawer/Index';

import {
  ZERO_INDEX,
  ARRAY_KEYS,
  SIX_SECONDS,
  PASSES_TYPES,
  WHEEL_BET_AMOUNTS
} from '../../utils/constants';
import { toast } from 'react-toastify';
import { associateTokens } from '../../services/hederaService';

import {
  getPlatinumPassTokenId,
  getGoldPassTokenId,
  getSilverPassTokenId
} from '../../utils/helperFunctions';

const Dashboard = () => {
  const {
    buyPassAndTransferNftToUserAccount,
    userAccountId,
    isPlatinumPassAssociated,
    isGoldPassAssociated,
    isSilverPassAssociated,
    sendTxnToWallet,
    refetchTokenRelationships
  } = useContext(WalletContext);

  const [buySelectedPass, setBuySelectedPass] = useState();
  const [isSideModalOpen, setIsSideModalOpen] = useState(false);

  useEffect(() => {
    setBuySelectedPass(BUY_PASSES_OPTIONS?.[ZERO_INDEX]);
  }, [isPlatinumPassAssociated, isGoldPassAssociated, isSilverPassAssociated]);

  const BUY_PASSES_OPTIONS = [
    {
      [ARRAY_KEYS.VALUE]: WHEEL_BET_AMOUNTS.PLATINUM,
      [ARRAY_KEYS.LABEL]: PASSES_TYPES.PLATINUM,
      [ARRAY_KEYS.DESCRIPTION]: '- 2000 HBAR',
      [ARRAY_KEYS.IS_TOKEN_ASSOCIATED]: isPlatinumPassAssociated,
      [ARRAY_KEYS.ASSOCIATE_TOKEN_ID]: getPlatinumPassTokenId()
    },
    {
      [ARRAY_KEYS.VALUE]: WHEEL_BET_AMOUNTS.GOLD,
      [ARRAY_KEYS.LABEL]: PASSES_TYPES.GOLD,
      [ARRAY_KEYS.DESCRIPTION]: '- 500 HBAR',
      [ARRAY_KEYS.IS_TOKEN_ASSOCIATED]: isGoldPassAssociated,
      [ARRAY_KEYS.ASSOCIATE_TOKEN_ID]: getGoldPassTokenId()
    },
    {
      [ARRAY_KEYS.VALUE]: WHEEL_BET_AMOUNTS.SILVER,
      [ARRAY_KEYS.LABEL]: PASSES_TYPES.SILVER,
      [ARRAY_KEYS.DESCRIPTION]: '- 100 HBAR',
      [ARRAY_KEYS.IS_TOKEN_ASSOCIATED]: isSilverPassAssociated,
      [ARRAY_KEYS.ASSOCIATE_TOKEN_ID]: getSilverPassTokenId()
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

  const handleBuyClick = () => {
    const tokenIdForAssociation = buySelectedPass?.[ARRAY_KEYS.ASSOCIATE_TOKEN_ID];

    if (!userAccountId || !tokenIdForAssociation)
      return toast.error('Missing association token id');

    buyPassAndTransferNftToUserAccount(
      getTotalBuyHbars(),
      buySelectedPass[ARRAY_KEYS.LABEL],
      tokenIdForAssociation
    );
  };

  const associateToken = async () => {
    const tokenIdForAssociation = buySelectedPass?.[ARRAY_KEYS.ASSOCIATE_TOKEN_ID];

    if (!tokenIdForAssociation) return toast.error('Missing association token id');

    const byteCode = await associateTokens(userAccountId, tokenIdForAssociation);
    const isAssociationSuccess = await sendTxnToWallet(byteCode);

    setTimeout(() => {
      // Wait for Txn to be posted on network
      if (isAssociationSuccess) refetchTokenRelationships();
    }, SIX_SECONDS);
  };

  const BuyOrAssociateToken = () => {
    return buySelectedPass?.[ARRAY_KEYS.IS_TOKEN_ASSOCIATED] ? (
      <>
        <div className="mt-[30px] text-xs md:text-sm w-full text-white">
          Total - {getTotalBuyHbars()} Hbars
        </div>
        <Button
          text={`Buy 1 ${buySelectedPass?.[ARRAY_KEYS.LABEL]} Pass`}
          className={`w-full mt-[10px]`}
          btnClassName="max-w-none w-full justify-center"
          onClick={handleBuyClick}
          disabled={!userAccountId}
        />
      </>
    ) : (
      <Button
        text={
          userAccountId ? `Associate ${buySelectedPass?.[ARRAY_KEYS.LABEL]} Pass` : 'Connect wallet'
        }
        className={`w-full mt-[25px]`}
        btnClassName="max-w-none w-full justify-center"
        onClick={associateToken}
        disabled={!userAccountId}
      />
    );
  };

  return (
    <>
      <BodyContainer heading="Dashboard" className="h-auto" rootClassName="h-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-14 pb-[15px]">
          <GrayCard>
            <>
              <div className="hidden md:block">
                <Button
                  text={`Your History`}
                  onClick={openSideModal}
                  disabled={!userAccountId}
                  isHistoryBtn
                />
              </div>
            </>
          </GrayCard>

          <GrayCard>
            <>
              <RadioButtons
                heading="Buy Passes -"
                options={BUY_PASSES_OPTIONS}
                data={buySelectedPass}
                setData={setBuySelectedPass}
              />

              <BuyOrAssociateToken />
            </>
          </GrayCard>
        </div>
      </BodyContainer>

      <SideDrawer isSideModalOpen={isSideModalOpen} onClose={closeSideModal}>
        <SideDrawerIndex userAccountId={userAccountId} />
      </SideDrawer>
    </>
  );
};

export default Dashboard;
