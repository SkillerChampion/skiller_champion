/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import './index.scss';
import { getRandomSlice } from '../../../services/fortuneWheel';
import { transferPrizeToUserAccount } from '../../../services/hederaService';

import {
  ARRAY_KEYS,
  FORTUNE_WHEEL,
  CSS_VARIABLES,
  TEN_SECONDS,
  TWELVE_SECONDS,
  ZERO,
  ONE_AND_HALF_SECONDS,
  THREE_SECONDS,
  HEDERA_API_KEYS
} from '../../../utils/constants';
import { displayErrors } from '../../../utils/helperFunctions';
import {
  setCssVariable,
  scrollToTop,
  submitUsePassHcsMsg,
  submitUsePassFailedHcsMsg
} from '../../../utils/helperFunctions';
import hederaWhiteIcon from '../../../assets/hederaWhiteIcon.png';
import { FortuneContext } from '../../../context/FortuneContext';
import wheelRotatingSound from '../../../assets/wheelRotatingSound.mp3';
import { WalletContext } from '../../../context/WalletContext';

import Button from '../Button/Button';
import { toast } from 'react-toastify';

const Wheel = ({ wheelData = [], betAmount, passesInUserAccount, winnerMaxAmount, passType }) => {
  const { setIsWheelOfFortuneSpinning, setShowWinnerLoser } = useContext(FortuneContext);
  const {
    transferNftFromUserToTreasury,
    userAccountId,
    refetchPlatinumPassesInUserAccount,
    refetchGoldPassesInUserAccount,
    refetchSilverPassesInUserAccount
  } = useContext(WalletContext);

  const rotationSound = new Audio(wheelRotatingSound);

  const passesCount = passesInUserAccount?.length ?? 0;

  const startSpin = async (randomSlice) => {
    try {
      setIsWheelOfFortuneSpinning(true);

      const randomAngle = FORTUNE_WHEEL.BASE_ROTATION_ANGLE + randomSlice[ARRAY_KEYS.ANGLE];
      setCssVariable(CSS_VARIABLES.WHEEL_BASE_ROTATION, randomAngle);

      const wheel = document.querySelector('.wheel-dial-super-parent');
      const images = document.querySelector('.wheel-dial-images');

      wheel.classList.add('spinning');
      images.classList.add('spinning');

      setTimeout(() => {
        setShowWinnerLoser(randomSlice);
      }, TEN_SECONDS);

      setTimeout(() => {
        wheel.classList.remove('spinning');
        images.classList.remove('spinning');
        setIsWheelOfFortuneSpinning(false);

        refetchPlatinumPassesInUserAccount();
        refetchGoldPassesInUserAccount();
        refetchSilverPassesInUserAccount();
      }, TWELVE_SECONDS);
    } catch (err) {
      console.log('error spinning - ', err);
      toast.error('Error in spinning wheel. Contact admin');
    }
  };

  const useNftForFortuneWheel = async () => {
    const nftDetails = passesInUserAccount[ZERO];
    const nftTokenId = nftDetails?.[HEDERA_API_KEYS.token_id];
    const nftSerialNumber = nftDetails?.[HEDERA_API_KEYS.serial_number];
    let winningAmount;
    let nftTransferTxnId;
    let transferPrizeTxnId;

    if (nftDetails) {
      try {
        const nftTransferred = await transferNftFromUserToTreasury(
          nftDetails,
          winnerMaxAmount,
          passType,
          betAmount
        );

        const receiptStatus = nftTransferred?.receiptStatus;
        nftTransferTxnId = nftTransferred?.txnId;

        if (receiptStatus) {
          const randomSlice = await getRandomSlice(betAmount);
          winningAmount = randomSlice[ARRAY_KEYS.VALUE];

          const res = await transferPrizeToUserAccount(
            winningAmount,
            userAccountId,
            passType,
            nftTransferTxnId,
            nftSerialNumber,
            nftTokenId
          );

          transferPrizeTxnId = res?.txnId;

          if (res?.receiptStatus) {
            submitUsePassHcsMsg(
              passType,
              betAmount,
              nftSerialNumber,
              nftTokenId,
              HEDERA_API_KEYS.SUCCESS,
              winningAmount,
              transferPrizeTxnId,
              nftTransferTxnId,
              userAccountId
            );

            setTimeout(() => {
              rotationSound.play();
            }, ONE_AND_HALF_SECONDS);

            setTimeout(() => {
              startSpin(randomSlice);
            }, THREE_SECONDS);
          }
        }
      } catch (err) {
        submitUsePassFailedHcsMsg(
          passType,
          betAmount,
          nftSerialNumber,
          nftTokenId,
          HEDERA_API_KEYS.FAILED,
          err,
          transferPrizeTxnId,
          nftTransferTxnId,
          userAccountId
        );

        const errors = err.response?.data?.errors;
        if (errors) {
          displayErrors(errors);
        } else toast.error('Error - Please contact admin');
      }
    } else {
      toast.error('Error in spinning wheel');
    }
  };

  return (
    <>
      <div className="wheel-container-parent fadeIn">
        <div className="wheel-container">
          <div className="wheel-board">
            <div className="wheel-dial-super-parent relative ">
              <div className="absolute w-full h-full z-10 wheel-dial-images">
                <img
                  src={hederaWhiteIcon}
                  alt=""
                  className="absolute z-10 h-4 sm:h-6 left-[47.2%] sm:left-[47.7%] -top-[5px]"
                />
                <img
                  src={hederaWhiteIcon}
                  alt=""
                  className="absolute z-10 h-4 sm:h-6 left-[47.2%] sm:left-[47.7%] -bottom-[5px]"
                />
                <img
                  src={hederaWhiteIcon}
                  alt=""
                  className="absolute z-10 h-4 sm:h-6 top-[47.2%] sm:top-[47.7%] -left-[5px]"
                />
                <img
                  src={hederaWhiteIcon}
                  alt=""
                  className="absolute z-10 h-4 sm:h-6 top-[47.2%] sm:top-[47.7%] -right-[5px]"
                />
                <img
                  src={hederaWhiteIcon}
                  alt=""
                  className="absolute z-10 h-4 sm:h-6 top-[13.4%] right-[13%]"
                />
                <img
                  src={hederaWhiteIcon}
                  alt=""
                  className="absolute z-10 h-4 sm:h-6 top-[13.4%] left-[13%]"
                />
                <img
                  src={hederaWhiteIcon}
                  alt=""
                  className="absolute z-10 h-4 sm:h-6 bottom-[13.4%] left-[13%]"
                />
                <img
                  src={hederaWhiteIcon}
                  alt=""
                  className="absolute z-10 h-4 sm:h-6 bottom-[13.4%] right-[13%]"
                />
              </div>
              <div className="wheel-dial-parent">
                <div className="wheel-spinner-table">
                  <div className="wheel-dial">
                    {wheelData.map((item, index) => {
                      return (
                        <div className="slice" key={index}>
                          <div className="label">
                            <p className="label-child">{item[ARRAY_KEYS.LABEL]}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="wheel-arrow">
              <span className="wheel-pointer"></span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full">
        {!(passesCount > 0) ? (
          <>
            <Button
              text="Buy Pass"
              onClick={() => scrollToTop(true)}
              isPlayBtn
              className={`w-full flex justify-center wheel-playBtn`}
              btnClassName="max-w-none w-[30%] flex justify-center h-8 sm:h-10"
            />
          </>
        ) : (
          <Button
            text="Play"
            onClick={useNftForFortuneWheel}
            isPlayBtn
            className={`w-full flex justify-center wheel-playBtn`}
            btnClassName="max-w-none w-[30%] flex justify-center h-8 sm:h-10"
          />
        )}
      </div>
    </>
  );
};

export default Wheel;
