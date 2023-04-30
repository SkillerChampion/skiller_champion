import Confetti from 'react-confetti';
import useWindowSize from '../../../hooks/useWindowSize';
import { useState, useEffect } from 'react';
import { ARRAY_KEYS, TWELVE_SECONDS } from '../../../utils/constants';
import Modal from '../Modal/Modal';
import classes from './WinnerLoserAnimation.module.css';
import trophyTwo from '../../../assets/lotties/trophyTwo';
import moneyFlying from '../../../assets/lotties/moneyFlying';
import Lottie from 'react-lottie';
import Button from '../Button/Button';

const trophyTwoConfig = {
  loop: true,
  autoplay: true,
  animationData: trophyTwo
};

const moneyFlyingConfig = {
  loop: true,
  autoplay: true,
  animationData: moneyFlying
};

const winnerColors = [
  '#f44336',
  '#e91e63',
  '#9c27b0',
  '#673ab7',
  '#3f51b5',
  '#2196f3',
  '#03a9f4',
  '#00bcd4',
  '#009688',
  '#4CAF50',
  '#8BC34A',
  '#CDDC39',
  '#FFEB3B',
  '#FFC107',
  '#FF9800',
  '#FF5722',
  '#795548'
];

const loserColors = [
  '#f44336',
  '#f44336',
  '#f44336',
  '#f44336',
  '#f44336',
  '#f44336',
  '#f44336',
  '#f44336'
];

const WinnerOrLoserModal = ({
  showModal,
  closeModal,
  width,
  anim,
  amount,
  isWinner,
  heading = 'Congratulations !!'
}) => {
  return (
    <Modal
      showModal={showModal}
      closeModal={closeModal}
      className={`${classes.modalRoot} ${
        isWinner ? classes.modalRootWinner : classes.modalRootLoser
      }`}>
      <div className="h-full w-full flex flex-col gap-6">
        <Lottie options={anim} height={width > 950 ? 290 : 180} width={width > 950 ? 400 : 180} />
        <div className="flex flex-col items-center">
          <div className=" w-full text-center text-white text-lg md:text-3xl">{heading}</div>
          <div className=" w-full text-center text-white text-sm md:text-lg pb-[10px] sm:pb-[25px] pt-[10px]">
            You won {amount} HBAR
          </div>
          <Button
            text="Okay"
            btnClassName={`${classes.customBtn} ${isWinner ? classes.greenBtn : classes.redBtn}`}
            onClick={closeModal}
          />
        </div>
      </div>
    </Modal>
  );
};

const WinnerLoserAnimation = ({ data, setData }) => {
  const { width, height } = useWindowSize();

  const [localData, setLocalData] = useState();
  const [run, setRun] = useState(false);
  const [numPieces, setNumPieces] = useState(300);

  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (data) {
      setLocalData(() => ({ ...data }));
    }
  }, [data]);

  useEffect(() => {
    if (localData) {
      setNumPieces(400);
      setRun(true);
      setShowModal(true);
      setData();
    }
  }, [localData]);

  useEffect(() => {
    if (run === true) {
      const SEVEN_SECONDS = 7000;

      setTimeout(() => {
        setNumPieces(0);
      }, SEVEN_SECONDS);

      setTimeout(() => {
        setRun(false);
      }, TWELVE_SECONDS);
    }
  }, [run]);

  if (!width || !height || !localData) return <></>;

  return (
    <div className="relative ">
      <div
        className={`fixed h-screen top-[var(--navbarHeight)] left-0 w-full z-20 ${
          !showModal && 'hidden'
        }`}>
        <Confetti
          numberOfPieces={numPieces}
          run={run}
          height={height}
          width={width}
          colors={localData?.[ARRAY_KEYS.IS_WIN] ? winnerColors : loserColors}
        />

        {localData?.[ARRAY_KEYS.IS_WIN] ? (
          <WinnerOrLoserModal
            showModal={showModal}
            closeModal={closeModal}
            width={width}
            anim={trophyTwoConfig}
            amount={localData?.[ARRAY_KEYS.VALUE]}
            isWinner={localData?.[ARRAY_KEYS.IS_WIN]}
            heading="Congratulations !!"
          />
        ) : (
          <WinnerOrLoserModal
            showModal={showModal}
            closeModal={closeModal}
            width={width}
            anim={moneyFlyingConfig}
            amount={localData?.[ARRAY_KEYS.VALUE]}
            isWinner={localData?.[ARRAY_KEYS.IS_WIN]}
            heading="😢 Sorry 😢"
          />
        )}
      </div>
    </div>
  );
};

export default WinnerLoserAnimation;
