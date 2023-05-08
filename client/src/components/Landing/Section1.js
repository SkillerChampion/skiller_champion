import React from 'react';
import BodyContainer from '../Common/BodyContainer/BodyContainer';
import wheelSection from '../../assets/wheelSection.PNG';
import Button from '../Common/Button/Button';
import { useNavigate } from 'react-router-dom';
import { PLATFORM_FEES } from '../../utils/constants';
import { ALL_ROUTES_PATHS } from '../../utils/routes';

const Section1 = () => {
  const navigate = useNavigate();

  const redirectToWheelOfFortune = () => {
    navigate(ALL_ROUTES_PATHS.WHEEL_OF_FORTUNE);
  };

  return (
    <BodyContainer>
      <div className="flex flex-col lg:flex-row pb-24 sm:pb-32">
        <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl pt-6 lg:pt-20">
          <h1
            className={`md:mt-6 md:pt-6 sm:pt-14 lg:pt-0 text-xl sm:text-3xl xl:text-4xl font-bold tracking-tight text-white pinkWhiteText GrindFontFamily`}>
            Multiplayer, Play & Earn with your skills or Wheel of Fortune
          </h1>
          <p className="mt-6 text-xxs md:text-base leading-8 text-white heliosFontFamily">
            Try your luck with wheel of fortune to multiply your HBARs or solve riddles and beat
            your opponent and to the battle (coming soon). Read the following guidelines -
          </p>
          <ul className="text-white bullet text-xxs md:text-base  leading-8 bulletList mt-6 pl-4 gap-[10px] lg:gap-[25px]">
            {/* <li>You can play wheel of fortune or riddles</li>
            <li>Try to answer 5 riddles correctly faster than your opponent</li>
            <li>The player who answers the most riddles correctly wins the battle</li>
            <li>
              If both of the players have same amount of correct answers, then the player with least time wins
            </li> */}
            <li>You can try your luck to earn 3 times of your played HBARS</li>

            <li>The winner wins all of the bet amount. We have {PLATFORM_FEES}% platform fees</li>
          </ul>
          <div className="mt-6">
            <Button text="Try Wheel of fortune" onClick={redirectToWheelOfFortune} />
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mt-0 lg:mr-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <img
              src={wheelSection}
              alt="Riddles Game"
              className="w-[60rem] rounded-xl bg-gray-700 shadow-2xl ring-1 ring-gray-700 lg:mt-12 "
            />
          </div>
        </div>
      </div>
    </BodyContainer>
  );
};

export default Section1;
