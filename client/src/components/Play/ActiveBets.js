import React from 'react';
import BodyContainer from '../Common/BodyContainer/BodyContainer';
import GridList from '../Common/GridList/GridList';

const ActiveBets = () => {
  const data = [
    {
      amount: '10000'
    },
    {
      amount: '999'
    },
    {
      amount: '200'
    },
    {
      amount: '2000000'
    }
  ];

  return (
    <BodyContainer heading="Active Bets - [Coming Soon]">
      <div className="pb-20">
        <GridList data={data} />
      </div>
    </BodyContainer>
  );
};

export default ActiveBets;
