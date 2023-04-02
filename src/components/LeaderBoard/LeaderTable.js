/* eslint-disable no-unused-vars */
import BodyContainer from '../Common/BodyContainer/BodyContainer';
import React, { useState, useCallback, useMemo } from 'react';
import PageLevelTabs from '../Common/Tabs/PageLevelTabs';
import { ZERO_INDEX, ARRAY_KEYS, LEADER_BOARD_TABS, HCS_KEYS } from '../../utils/constants';
import TableData from '../Common/Table/Table';
import { useQuery } from 'react-query';
import { getLeaderBoardData } from '../../services/hederaService';

const LeaderTable = () => {
  const tabs = [
    {
      [ARRAY_KEYS.LABEL]: LEADER_BOARD_TABS.ALL,
      [ARRAY_KEYS.VALUE]: ''
    },
    {
      [ARRAY_KEYS.LABEL]: LEADER_BOARD_TABS.PLATINUM,
      [ARRAY_KEYS.VALUE]: LEADER_BOARD_TABS.PLATINUM
    },
    {
      [ARRAY_KEYS.LABEL]: LEADER_BOARD_TABS.GOLD,
      [ARRAY_KEYS.VALUE]: LEADER_BOARD_TABS.GOLD
    },
    {
      [ARRAY_KEYS.LABEL]: LEADER_BOARD_TABS.SILVER,
      [ARRAY_KEYS.VALUE]: LEADER_BOARD_TABS.SILVER
    }
  ];

  const [currentTab, setCurrentTab] = useState(tabs[ZERO_INDEX]);

  const { data, isFetching, error } = useQuery(
    ['getLeaderBoardData', currentTab[ARRAY_KEYS.VALUE]],
    () => getLeaderBoardData(currentTab[ARRAY_KEYS.VALUE])
  );

  const headers = [
    { [ARRAY_KEYS.HEADER]: 'Account ID', [ARRAY_KEYS.VALUE]: HCS_KEYS.user_account_id },
    { [ARRAY_KEYS.HEADER]: 'Won (ℏ)', [ARRAY_KEYS.VALUE]: HCS_KEYS.winner_amount },
    { [ARRAY_KEYS.HEADER]: 'Spent (ℏ)', [ARRAY_KEYS.VALUE]: HCS_KEYS.pass_amount },
    { [ARRAY_KEYS.HEADER]: 'Pass Type', [ARRAY_KEYS.VALUE]: HCS_KEYS.pass_type }
  ];

  const bodyData = data?.map((item) => {
    return {
      [HCS_KEYS.pass_type]: item[HCS_KEYS.pass_type],
      [HCS_KEYS.pass_amount]: item[HCS_KEYS.pass_amount],
      [HCS_KEYS.winner_amount]: item[HCS_KEYS.winner_amount],
      [HCS_KEYS.user_account_id]: item[HCS_KEYS.user_account_id]
    };
  });

  return (
    <BodyContainer heading="Leader Board -" rootClassName="h-screen">
      <PageLevelTabs currentTab={currentTab} setCurrentTab={setCurrentTab} tabs={tabs} spaceHr />

      <div className="h-full">
        <TableData headers={headers} bodyData={bodyData} isFetching={isFetching} />
      </div>
    </BodyContainer>
  );
};

export default LeaderTable;
