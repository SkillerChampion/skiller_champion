/* eslint-disable no-unused-vars */
import SmallTabs from '../../../Common/Tabs/SmallTabs';
import PassPurchaseHistory from './PassPurchaseHistory';
import PassUseHistory from './PassUseHistory';
import { useState, useEffect } from 'react';

const Index = ({ userAccountId, isSideModalOpen }) => {
  const [localUserAccountId, setLocalUserAccountId] = useState(userAccountId);

  useEffect(() => {
    setLocalUserAccountId(userAccountId);
  }, [isSideModalOpen]);

  const tabs = [
    {
      label: 'Passes used',
      Component: (
        <PassUseHistory
          userAccountId={localUserAccountId}
          setLocalUserAccountId={setLocalUserAccountId}
        />
      )
    },
    {
      label: 'Passes bought',
      Component: (
        <PassPurchaseHistory
          userAccountId={localUserAccountId}
          setLocalUserAccountId={setLocalUserAccountId}
        />
      )
    }
  ];

  return (
    <>
      <SmallTabs tabs={tabs} onlyUseLeftMargins fullHeight removeChildMargins />
    </>
  );
};
export default Index;
