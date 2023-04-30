import { createContext, useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { TEN_SECONDS } from '../utils/constants';
import { getAllWheelDataList } from '../services/fortuneWheel';

export const FortuneContext = createContext();

const FortuneWheelContextComponent = (props) => {
  const {
    data: wheelDataList,
    isFetching,
    refetch,
    error
  } = useQuery('getAllWheelDataList', getAllWheelDataList);

  const [isWheelOfFortuneSpinning, setIsWheelOfFortuneSpinning] = useState(false);
  const [showWinnerLoser, setShowWinnerLoser] = useState();

  const [wheelData2000, setWheelData2000] = useState();
  const [wheelData500, setWheelData500] = useState();
  const [wheelData100, setWheelData100] = useState();
  const [isDataQueryLoading, setIsDataQueryLoading] = useState(true);
  const [isDataQueryError, setIsDataQueryError] = useState();

  useEffect(() => {
    if (wheelDataList && !isFetching) {
      setWheelData2000(wheelDataList.wheelData2000);
      setWheelData500(wheelDataList.wheelData500);
      setWheelData100(wheelDataList.wheelData100);
      setIsDataQueryLoading(false);
      setIsDataQueryError();
    }
  }, [wheelDataList, isFetching]);

  useEffect(() => {
    if (error) {
      setIsDataQueryError(error);

      setTimeout(() => {
        refetch();
        setIsDataQueryError();
      }, TEN_SECONDS);
    }
  }, [error]);

  return (
    <FortuneContext.Provider
      value={{
        isWheelOfFortuneSpinning,
        setIsWheelOfFortuneSpinning,
        wheelData2000,
        wheelData500,
        wheelData100,
        setWheelData2000,
        setWheelData500,
        setWheelData100,
        isDataQueryLoading,
        isDataQueryError,
        showWinnerLoser,
        setShowWinnerLoser
      }}>
      {props.children}
    </FortuneContext.Provider>
  );
};

export default FortuneWheelContextComponent;
