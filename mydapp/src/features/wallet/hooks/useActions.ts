import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import {
  disconnectWallet,
  signIn,
  unlockWallet,
} from '../models/account/actions';
import { latestBlock, switchNetwork } from '../models/network/actions';
import { connectWallet } from '../models/provider/actions';
import { setAccount } from '../models/account/slice';

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(
    {
      connectWallet,
      switchNetwork,
      unlockWallet,
      signIn,
      disconnectWallet,
      latestBlock,
      setAccount,
    },
    dispatch
  );
};
