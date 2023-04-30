/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import BodyContainer from '../Common/BodyContainer/BodyContainer';
import Lottie from 'react-lottie';
import owls from '../../assets/lotties/owlMaths.json';
import TextInput from '../Common/Inputs/TextInput';
import Button from '../Common/Button/Button';
import SmallTabs from '../Common/Tabs/SmallTabs';
import useWindowSize from '../../hooks/useWindowSize';
import Divider from '../Common/Divider/Divider';
import { ALL_ROUTES_PATHS } from '../../utils/routes';
import { useNavigate } from 'react-router-dom';

const owlsLottie = {
  loop: true,
  autoplay: true,
  animationData: owls,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

const CreateRoom = ({ roomName, hbarAmount, setRoomName, handleHbarAmountChange }) => {
  return (
    <div className="flex flex-col gap-6 w-full ">
      <TextInput
        label="Enter Room name"
        setValue={setRoomName}
        value={roomName}
        placeholder="Enter room name, ex - MyRoom"
      />
      <TextInput
        label="How many Hbar would you like to bet ?"
        setValue={handleHbarAmountChange}
        value={hbarAmount}
        type="number"
        placeholder="Enter HBAR amount, ex - 100"
      />
      {/* <div className='flex w-full'>
        <Button text='Find players' />
      </div> */}
    </div>
  );
};

const JoinRoom = ({ roomName, setRoomName }) => {
  return (
    <div className="flex flex-col gap-6  w-full">
      <TextInput
        label="Enter Room name"
        setValue={setRoomName}
        value={roomName}
        placeholder="Enter room name, ex - MyRoom"
      />
      {/* 
      <div className='flex w-full'>
        <Button text='Join room' />
      </div> */}
    </div>
  );
};

const RoomSection = () => {
  const { width } = useWindowSize();
  const [createRoomName, setCreateRoomName] = useState('');
  const [joinRoomName, setJoinRoomName] = useState('');
  const [hbarAmount, setHbarAmount] = useState();
  const navigate = useNavigate();

  const handleHbarAmountChange = (value) => {
    const parseToInt = parseInt(value);

    if (parseToInt && parseToInt > 0) {
      setHbarAmount(parseToInt);
    } else setHbarAmount();
  };

  const redirectToWheelOfFortune = () => {
    navigate(ALL_ROUTES_PATHS.WHEEL_OF_FORTUNE);
  };

  const tabs = [
    {
      label: 'Create new room',
      // Component: (
      //   <CreateRoom
      //     roomName={createRoomName}
      //     hbarAmount={hbarAmount}
      //     setRoomName={setCreateRoomName}
      //     handleHbarAmountChange={handleHbarAmountChange}
      //   />
      // ),
      Component: (
        <div className="flex flex-col gap-5 justify-center">
          <div className="w-full text-center pinkWhiteText text-base sm:text-lg lg:text-xl ">
            Coming Soon
          </div>
          <div className="w-full flex justify-center">
            <Button text="Try Wheel Of Fortune" onClick={redirectToWheelOfFortune} />
          </div>
        </div>
      )
    },
    {
      label: 'Join a room',
      // Component: <JoinRoom roomName={joinRoomName} setRoomName={setJoinRoomName} />,
      Component: (
        <div className="flex flex-col gap-5 justify-center">
          <div className="w-full text-center pinkWhiteText text-base sm:text-lg lg:text-xl ">
            Coming Soon
          </div>
          <div className="w-full flex justify-center">
            <Button text="Try Wheel Of Fortune" onClick={redirectToWheelOfFortune} />
          </div>
        </div>
      )
    }
  ];

  return (
    <>
      <BodyContainer heading="Play riddles -">
        <div className="flex flex-col xl:flex-row gap-5 sm:gap-10 xl:gap-20 pb-14 sm:pb-24 xl:pb-32 px-4">
          <div className="xl:pl-10 ">
            <Lottie
              options={owlsLottie}
              height={width > 900 ? 190 : 140}
              width={width > 900 ? 400 : 280}
            />
          </div>
          <div className="w-full">
            <SmallTabs tabs={tabs} />
          </div>
        </div>
      </BodyContainer>
      <Divider />
    </>
  );
};

export default RoomSection;
