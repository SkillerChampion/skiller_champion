/* eslint-disable no-unused-vars */
import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { HashConnect } from 'hashconnect';
import {
  HASH_CONNECT_META_DATA,
  HASH_CONNECT_KEYS,
  LOCAL_STORAGE_KEYS,
  hashConnectInitialData,
  ZERO,
  HEDERA_API_KEYS,
  FIVE_SECONDS,
  TWENTY_SECONDS
} from '../utils/constants';
import { useQuery } from 'react-query';
import { TransferTransaction } from '@hashgraph/sdk';

import {
  getPlatinumPassTokenId,
  getGoldPassTokenId,
  getSilverPassTokenId,
  getTreasuryAccountId,
  isValidNftSerialNumber,
  submitBuyPassHcsMsg
} from '../utils/helperFunctions';

import {
  chargeUserAndTransferNft,
  getTokenRelationships,
  getNftsSerialNumberFromTreasury,
  getAllNftsFromAccountWithTokenId,
  getAccountBalances,
  transferNftToTreasury
} from '../services/hederaService';

import { displayErrors, isArray } from '../utils/helperFunctions';

export const WalletContext = createContext();

const hashconnect = new HashConnect();

const WalletContextComponent = (props) => {
  const [walletData, setWalletData] = useState();
  const userAccount = walletData?.[HASH_CONNECT_KEYS.ACCOUNT_ID];

  const [userAccountId, setUserAccountId] = useState();
  const [isPlatinumPassAssociated, setIsPlatinumPassAssociated] = useState(false);
  const [isGoldPassAssociated, setIsGoldPassAssociated] = useState(false);
  const [isSilverPassAssociated, setIsSilverPassAssociated] = useState(false);

  const isAdmin = userAccountId === getTreasuryAccountId();

  const { data: tokenRelationships, refetch: refetchTokenRelationships } = useQuery(
    ['getTokenRelationships', userAccountId],
    () => getTokenRelationships(userAccountId)
  );

  const { data: platinumPassesInUserAccount, refetch: refetchPlatinumPassesInUserAccount } =
    useQuery(
      ['getAllNftsFromAccountWithTokenId platinum', userAccountId, getPlatinumPassTokenId()],
      () => getAllNftsFromAccountWithTokenId(userAccountId, getPlatinumPassTokenId())
    );

  const { data: goldPassesInUserAccount, refetch: refetchGoldPassesInUserAccount } = useQuery(
    ['getAllNftsFromAccountWithTokenId gold', userAccountId, getGoldPassTokenId()],
    () => getAllNftsFromAccountWithTokenId(userAccountId, getGoldPassTokenId())
  );

  const { data: silverPassesInUserAccount, refetch: refetchSilverPassesInUserAccount } = useQuery(
    ['getAllNftsFromAccountWithTokenId silver', userAccountId, getSilverPassTokenId()],
    () => getAllNftsFromAccountWithTokenId(userAccountId, getSilverPassTokenId())
  );

  useEffect(() => {
    initWallet();
  }, []);

  useEffect(() => {
    if (userAccount) setUserAccountId(userAccount);
    else setUserAccountId();
  }, [userAccount]);

  useEffect(() => {
    if (userAccountId) refetchTokenRelationships();
  }, [userAccountId]);

  useEffect(() => {
    // Check Passes token association
    const tokens = tokenRelationships?.[HEDERA_API_KEYS.tokens];

    if (isArray(tokens)) {
      const findPlatinumPassTokenId = tokens.find(
        (item) => item[HEDERA_API_KEYS.token_id] === getPlatinumPassTokenId()
      );

      const findGoldPassTokenId = tokens.find(
        (item) => item[HEDERA_API_KEYS.token_id] === getGoldPassTokenId()
      );

      const findSilverPassTokenId = tokens.find(
        (item) => item[HEDERA_API_KEYS.token_id] === getSilverPassTokenId()
      );

      findPlatinumPassTokenId
        ? setIsPlatinumPassAssociated(true)
        : setIsPlatinumPassAssociated(false);
      findGoldPassTokenId ? setIsGoldPassAssociated(true) : setIsGoldPassAssociated(false);
      findSilverPassTokenId ? setIsSilverPassAssociated(true) : setIsSilverPassAssociated(false);
    }
  }, [tokenRelationships]);

  const initWallet = async () => {
    let saveWalletData = { ...hashConnectInitialData };

    setUpHashConnectEvents(saveWalletData);

    //initialize and use returned data
    let initData = await hashconnect.init(HASH_CONNECT_META_DATA, 'testnet');

    if (initData) {
      const getAccountId = initData.savedPairings[ZERO]?.[HASH_CONNECT_KEYS.ACCOUNT_ID]?.[ZERO];
      const getTopic = initData[HASH_CONNECT_KEYS.TOPIC];
      const getPairingString = initData[HASH_CONNECT_KEYS.PAIRING_STRING];
      const getSavedPairingData = initData.savedPairings[ZERO];

      const provider = hashconnect.getProvider('testnet', getTopic, getAccountId);
      const signer = hashconnect.getSigner(provider);

      saveWalletData[HASH_CONNECT_KEYS.ACCOUNT_ID] = getAccountId;
      saveWalletData[HASH_CONNECT_KEYS.TOPIC] = getTopic;
      saveWalletData[HASH_CONNECT_KEYS.PAIRING_STRING] = getPairingString;
      saveWalletData[HASH_CONNECT_KEYS.SAVED_PAIRING_DATA] = getSavedPairingData;
      saveWalletData[HASH_CONNECT_KEYS.SIGNER] = signer;
      saveWalletData[HASH_CONNECT_KEYS.PROVIDER] = provider;

      setWalletData((prev) => ({ ...prev, ...saveWalletData }));
    }
  };

  const setUpHashConnectEvents = (saveWalletData) => {
    hashconnect.pairingEvent.on((data) => {
      const getAccountId =
        data[HASH_CONNECT_KEYS.PAIRING_DATA]?.[HASH_CONNECT_KEYS.ACCOUNT_ID]?.[ZERO];
      const getSavedPairingData = data[HASH_CONNECT_KEYS.PAIRING_DATA];
      const getTopic = saveWalletData[HASH_CONNECT_KEYS.TOPIC];

      const provider = hashconnect.getProvider('testnet', getTopic, getAccountId);
      const signer = hashconnect.getSigner(provider);

      saveWalletData[HASH_CONNECT_KEYS.SIGNER] = signer;
      saveWalletData[HASH_CONNECT_KEYS.ACCOUNT_ID] = getAccountId;
      saveWalletData[HASH_CONNECT_KEYS.SAVED_PAIRING_DATA] = getSavedPairingData;
      saveWalletData[HASH_CONNECT_KEYS.PROVIDER] = provider;

      setWalletData((prev) => ({ ...prev, ...saveWalletData }));
    });
  };

  const connectToHashPack = async () => {
    console.log('connectToHashPack');
    hashconnect.connectToLocalWallet(walletData[HASH_CONNECT_KEYS.PAIRING_STRING]);
  };

  const disconnectHashPack = () => {
    const topic = walletData[HASH_CONNECT_KEYS.TOPIC];
    const pairingStringObj = {
      [HASH_CONNECT_KEYS.PAIRING_STRING]: walletData[HASH_CONNECT_KEYS.PAIRING_STRING]
    };

    hashconnect.disconnect(topic);
    setWalletData(pairingStringObj);
    setUserAccountId(false);
    setIsPlatinumPassAssociated(false);

    localStorage.removeItem(LOCAL_STORAGE_KEYS.HASH_CONNECT_WALLET_DATA);
  };

  const buyPassAndTransferNftToUserAccount = async (amountHbar, passType, tokenId) => {
    try {
      const userAccountId = walletData[HASH_CONNECT_KEYS.ACCOUNT_ID];

      if (!amountHbar || !passType || !userAccountId || !tokenId) {
        toast.error('Something went wrong...');
        return;
      }

      const nftSerialNumberFromTreasury = await getNftsSerialNumberFromTreasury(
        getTreasuryAccountId(),
        tokenId
      );

      if (isValidNftSerialNumber(nftSerialNumberFromTreasury)) {
        const mintByteCode = await chargeUserAndTransferNft(
          amountHbar,
          userAccountId,
          tokenId,
          nftSerialNumberFromTreasury
        );
        const res = await sendTxnToWallet(mintByteCode);

        if (res?.receiptStatus) {
          submitBuyPassHcsMsg(
            passType,
            amountHbar,
            nftSerialNumberFromTreasury,
            tokenId,
            res?.receiptStatus,
            res?.txnId,
            userAccountId
          );

          setTimeout(() => {
            refetchPlatinumPassesInUserAccount();
            refetchGoldPassesInUserAccount();
            refetchSilverPassesInUserAccount();
          }, FIVE_SECONDS);
        }
      } else {
        toast.error('Sorry, we are out of stock...');
      }
    } catch (err) {
      const errors = err.response?.data?.errors;
      if (errors) {
        displayErrors(errors);
      } else toast.error('Something went wrong...');
    }
  };

  const transferNftFromUserToTreasury = async (nftDetails, winnerMaxAmount) => {
    const nftTokenId = nftDetails[HEDERA_API_KEYS.token_id];
    const nftSerialNumber = nftDetails[HEDERA_API_KEYS.serial_number];

    try {
      const treasuryHbarBalance = await getAccountBalances(getTreasuryAccountId());

      if (treasuryHbarBalance > winnerMaxAmount) {
        const chargeNftByteCode = await transferNftToTreasury(
          userAccountId,
          nftTokenId,
          nftSerialNumber
        );

        const res = await sendTxnToWallet(chargeNftByteCode);
        const receiptStatus = res?.receiptStatus;
        const txnId = res?.txnId;

        if (receiptStatus) {
          setTimeout(() => {
            refetchPlatinumPassesInUserAccount();
            refetchGoldPassesInUserAccount();
            refetchSilverPassesInUserAccount();
          }, TWENTY_SECONDS);

          return { receiptStatus, txnId };
        }
      } else {
        toast.error('Something went wrong. Contact Admin');
      }
    } catch (err) {
      console.log('err WalletContextComponent -', err);
      toast.error('Something went wrong...');
    }
  };

  const sendTxnToWallet = async (byteCode) => {
    try {
      const signer = walletData[HASH_CONNECT_KEYS.SIGNER];
      const provider = walletData[HASH_CONNECT_KEYS.PROVIDER];

      if (!signer || !provider) {
        console.log('Signer unavailable - ', walletData);
        toast.error('Signer unavailable...');
        return;
      }

      const txn = TransferTransaction.fromBytes(byteCode.data);

      const execute = await txn.executeWithSigner(signer);
      const txnId = execute?.transactionId;

      const receipt = await provider.getTransactionReceipt(txnId);
      const receiptStatus = receipt?.status?.toString();

      if (receiptStatus === HEDERA_API_KEYS.SUCCESS) {
        toast.success('Transaction submitted successfully...');
        return { receiptStatus, txnId };
      } else {
        throw Error;
      }
    } catch (err) {
      console.log('err WalletContextComponent -', err, walletData);
      toast.error('Something went wrong...');
    }
  };

  return (
    <WalletContext.Provider
      value={{
        walletData,
        userAccountId,
        isPlatinumPassAssociated,
        isGoldPassAssociated,
        isSilverPassAssociated,
        disconnectHashPack,
        connectToHashPack,
        buyPassAndTransferNftToUserAccount,
        transferNftFromUserToTreasury,
        refetchTokenRelationships,
        sendTxnToWallet,
        platinumPassesInUserAccount,
        goldPassesInUserAccount,
        silverPassesInUserAccount,
        isAdmin
      }}>
      {' '}
      {props.children}{' '}
    </WalletContext.Provider>
  );
};
export default WalletContextComponent;
