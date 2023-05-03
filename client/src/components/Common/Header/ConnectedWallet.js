import { useContext } from 'react';
import DropdownMenu from '../Dropdown/DropdownMenu';
import { WalletContext } from '../../../context/WalletContext';
import { ARRAY_KEYS, HASH_CONNECT_KEYS } from '../../../utils/constants';

const ConnectedWallet = () => {
  const { disconnectHashPack, walletData } = useContext(WalletContext);

  const options = [{ [ARRAY_KEYS.LABEL]: 'Disconnect', [ARRAY_KEYS.ON_CLICK]: disconnectHashPack }];

  return (
    <>
      <DropdownMenu options={options} label={walletData?.[HASH_CONNECT_KEYS.ACCOUNT_IDS]} />
    </>
  );
};

export default ConnectedWallet;
