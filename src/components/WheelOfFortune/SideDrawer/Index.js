import SmallTabs from '../../Common/Tabs/SmallTabs';
import PassPurchaseHistory from './PassPurchaseHistory';
import PassUseHistory from './PassUseHistory';

const Index = ({ userAccountId }) => {
  const tabs = [
    {
      label: 'Passes used',
      Component: <PassUseHistory userAccountId={userAccountId} />
    },
    {
      label: 'Passes bought',
      Component: <PassPurchaseHistory userAccountId={userAccountId} />
    }
  ];

  return (
    <>
      <SmallTabs tabs={tabs} onlyUseLeftMargins fullHeight removeChildMargins />
    </>
  );
};
export default Index;
