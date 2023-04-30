import React, { useState, useCallback, useMemo, useContext } from 'react';
import BodyContainer from '../Common/BodyContainer/BodyContainer';

import Wheel from '../Common/FortuneWheel/Wheel';
import Error from '../Common/Error/Error';

import PageLevelTabs from '../Common/Tabs/PageLevelTabs';
import {
  ZERO,
  ARRAY_KEYS,
  PASSES_TYPES,
  WHEEL_BET_AMOUNTS,
  WHEEL_MAX_WINNER_AMOUNTS
} from '../../utils/constants';
import { FortuneContext } from '../../context/FortuneContext';
import { WalletContext } from '../../context/WalletContext';
import { isArrayReady } from '../../utils/helperFunctions';
import Spinner from '../Common/Spinner/Spinner';

const WheelContainer = () => {
  const { wheelData2000, wheelData500, wheelData100, isDataQueryLoading, isDataQueryError } =
    useContext(FortuneContext);

  const { platinumPassesInUserAccount, goldPassesInUserAccount, silverPassesInUserAccount } =
    useContext(WalletContext);

  const tabs = useMemo(
    () => [
      {
        [ARRAY_KEYS.LABEL]: PASSES_TYPES.PLATINUM,
        [ARRAY_KEYS.VALUE]: WHEEL_BET_AMOUNTS.PLATINUM,
        [ARRAY_KEYS.DATA]: wheelData2000,
        [ARRAY_KEYS.COMPONENT]: Wheel,
        [ARRAY_KEYS.PASS_COUNT]: platinumPassesInUserAccount,
        [ARRAY_KEYS.MAX_WINNER_AMOUNT]: WHEEL_MAX_WINNER_AMOUNTS.PLATINUM
      },

      {
        [ARRAY_KEYS.LABEL]: PASSES_TYPES.GOLD,
        [ARRAY_KEYS.VALUE]: WHEEL_BET_AMOUNTS.GOLD,
        [ARRAY_KEYS.DATA]: wheelData500,
        [ARRAY_KEYS.COMPONENT]: Wheel,
        [ARRAY_KEYS.PASS_COUNT]: goldPassesInUserAccount,
        [ARRAY_KEYS.MAX_WINNER_AMOUNT]: WHEEL_MAX_WINNER_AMOUNTS.GOLD
      },
      {
        [ARRAY_KEYS.LABEL]: PASSES_TYPES.SILVER,
        [ARRAY_KEYS.VALUE]: WHEEL_BET_AMOUNTS.SILVER,
        [ARRAY_KEYS.DATA]: wheelData100,
        [ARRAY_KEYS.COMPONENT]: Wheel,
        [ARRAY_KEYS.PASS_COUNT]: silverPassesInUserAccount,
        [ARRAY_KEYS.MAX_WINNER_AMOUNT]: WHEEL_MAX_WINNER_AMOUNTS.SILVER
      }
    ],
    [
      wheelData2000,
      wheelData500,
      wheelData100,
      platinumPassesInUserAccount,
      goldPassesInUserAccount,
      silverPassesInUserAccount
    ]
  );

  const [currentTab, setCurrentTab] = useState(tabs[ZERO]);

  const WheelCallBack = useCallback(() => {
    if (isDataQueryLoading) return <Spinner center className="pt-[100px]" />;

    return isArrayReady(tabs)
      ?.filter((item) => item[ARRAY_KEYS.VALUE] === currentTab[ARRAY_KEYS.VALUE])
      ?.map((item, index) => {
        const Wheel = item[ARRAY_KEYS.COMPONENT];
        const passesInUserAccount = item[ARRAY_KEYS.PASS_COUNT];
        const winnerMaxAmount = item[ARRAY_KEYS.MAX_WINNER_AMOUNT];

        return (
          <Wheel
            wheelData={item[ARRAY_KEYS.DATA]}
            key={index}
            betAmount={currentTab[ARRAY_KEYS.VALUE]}
            passesInUserAccount={passesInUserAccount}
            winnerMaxAmount={winnerMaxAmount}
            passType={currentTab[ARRAY_KEYS.LABEL]}
          />
        );
      });
  }, [currentTab, tabs]);

  if (isDataQueryError) return <Error />;

  return (
    <BodyContainer reducePaddingOnSm rootClassName="h-auto" heading="Use Pass -">
      <div className="flex flex-col relative ">
        <PageLevelTabs
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          tabs={tabs}
          showPassCount
        />
        <WheelCallBack />
      </div>
      <div className="w-full h-[200px]"></div>
    </BodyContainer>
  );
};

export default WheelContainer;
