/* eslint-disable no-unused-vars */
import { useQuery } from 'react-query';
import { getBuyPassesByAccountId } from '../../../services/hederaService';
import { getFortuneWheelTopicId } from '../../../utils/helperFunctions';
import { ARRAY_KEYS, HCS_KEYS } from '../../../utils/constants';
import TableData from '../../Common/Table/Table';
import SearchTxn from '../../Common/Table/SearchTxn';

const PassPurchaseHistory = ({ userAccountId }) => {
  const topicId = getFortuneWheelTopicId();

  const { data, isFetching, error } = useQuery(['getBuyPassesByAccountId', userAccountId], () =>
    getBuyPassesByAccountId(userAccountId)
  );
  const headers = [
    { [ARRAY_KEYS.HEADER]: 'Type', [ARRAY_KEYS.VALUE]: HCS_KEYS.pass_type },
    { [ARRAY_KEYS.HEADER]: 'Spent (ℏ)', [ARRAY_KEYS.VALUE]: HCS_KEYS.pass_amount },
    { [ARRAY_KEYS.HEADER]: 'Token Id', [ARRAY_KEYS.VALUE]: HCS_KEYS.token_id },
    {
      [ARRAY_KEYS.HEADER]: 'Time',
      [ARRAY_KEYS.VALUE]: HCS_KEYS.modified_timestamp,
      [ARRAY_KEYS.MIN_WIDTH]: '180px'
    },
    { [ARRAY_KEYS.HEADER]: 'Status', [ARRAY_KEYS.VALUE]: HCS_KEYS.status },
    { [ARRAY_KEYS.HEADER]: 'Verify', [ARRAY_KEYS.VALUE]: HCS_KEYS.consensus_timestamp }
  ];

  console.log('data22', data);
  const bodyData = data?.map((item) => {
    const message = item ?? {};

    return {
      [HCS_KEYS.pass_type]: item[HCS_KEYS.pass_type],
      [HCS_KEYS.pass_amount]: item[HCS_KEYS.pass_amount],
      [HCS_KEYS.token_id]: item[HCS_KEYS.token_id],
      [HCS_KEYS.modified_timestamp]: item[HCS_KEYS.modified_timestamp],
      [HCS_KEYS.status]: item[HCS_KEYS.status],
      [ARRAY_KEYS.DISPLAY_FN]: <SearchTxn timeStamp={item[HCS_KEYS.consensus_timestamp]} />
    };
  });

  if (error) return <div className="py-4 px-6 pinkWhiteText text-xl">Something went wrong ...</div>;

  return (
    <div className="h-full">
      <TableData headers={headers} bodyData={bodyData} isFetching={isFetching} insideSidebar />
    </div>
  );
};

export default PassPurchaseHistory;
