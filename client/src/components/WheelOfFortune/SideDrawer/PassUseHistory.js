/* eslint-disable no-unused-vars */
import { useQuery } from 'react-query';
import { getUsePassesByAccountId } from '../../../services/hederaService';
import { ARRAY_KEYS, HCS_KEYS } from '../../../utils/constants';
import TableData from '../../Common/Table/Table';
import SearchTxn from '../../Common/Table/SearchTxn';
import { isArrayReady, decodeHcsTimeStamp } from '../../../utils/helperFunctions';

const PassUseHistory = ({ userAccountId, setLocalUserAccountId }) => {
  const { data, isFetching, error } = useQuery(['getUsePassesByAccountId', userAccountId], () =>
    getUsePassesByAccountId(userAccountId)
  );

  const headers = [
    { [ARRAY_KEYS.HEADER]: 'Type', [ARRAY_KEYS.VALUE]: HCS_KEYS.pass_type },
    { [ARRAY_KEYS.HEADER]: 'Spent (ℏ)', [ARRAY_KEYS.VALUE]: HCS_KEYS.pass_amount },
    { [ARRAY_KEYS.HEADER]: 'Won (ℏ)', [ARRAY_KEYS.VALUE]: HCS_KEYS.winner_amount },
    {
      [ARRAY_KEYS.HEADER]: 'Time',
      [ARRAY_KEYS.VALUE]: HCS_KEYS.time,
      [ARRAY_KEYS.MIN_WIDTH]: '180px'
    },
    { [ARRAY_KEYS.HEADER]: 'Status', [ARRAY_KEYS.VALUE]: HCS_KEYS.status },
    { [ARRAY_KEYS.HEADER]: 'Verify', [ARRAY_KEYS.VALUE]: HCS_KEYS.consensus_timestamp }
  ];

  const bodyData = isArrayReady(data)?.map((item) => {
    return {
      [HCS_KEYS.pass_type]: item[HCS_KEYS.pass_type],
      [HCS_KEYS.pass_amount]: item[HCS_KEYS.pass_amount],
      [HCS_KEYS.winner_amount]: item[HCS_KEYS.winner_amount],
      [HCS_KEYS.time]: decodeHcsTimeStamp(item[HCS_KEYS.consensus_timestamp]),
      [HCS_KEYS.status]: item[HCS_KEYS.status],
      [ARRAY_KEYS.DISPLAY_FN]: <SearchTxn timeStamp={item[HCS_KEYS.consensus_timestamp]} />
    };
  });

  if (error) return <div className="py-4 px-6 pinkWhiteText text-xl">Something went wrong ...</div>;

  return (
    <div className="h-full">
      <TableData
        headers={headers}
        bodyData={bodyData}
        isFetching={isFetching}
        insideSidebar
        setLocalUserAccountId={setLocalUserAccountId}
        userAccountId={userAccountId}
      />
    </div>
  );
};

export default PassUseHistory;
