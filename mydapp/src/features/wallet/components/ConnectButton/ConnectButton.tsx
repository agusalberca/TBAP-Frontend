import { Spinner, useDisclosure } from '@chakra-ui/react';
import React, { useEffect } from 'react';

import useTypedSelector from '../../../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import { LoadingStatusType } from '../../models/types/LoadingStatus';
import { WalletState } from '../../models/types/WalletState';
import {AccountLoadState} from '../../models/account/types/AccountLoadState'

import useAppContext from '../../../../hooks/useAppContext';
import { getSignerAddress } from '../../../../api/blockchain';
import {setUserWalletAddress} from '../../../../api/auth'
import { Button } from './Button/Button';

const ConnectionModal = React.lazy(() =>
  import(
    /* webpackChunkName: "../ConnectionModal" */ '../ConnectionModal/ConnectionModal'
  ).then(module => ({
    default: module.ConnectionModal,
  }))
);

export const ConnectButton: React.FC = () => {
  const actions = useActions();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const loadingState = useTypedSelector(state => state.wallet.state.loading);
  const walletState = useTypedSelector(state => state.wallet.state.state);
  const accountState =  useTypedSelector(state => state.wallet.account.accountLoadState );
  
  const { token, user } = useAppContext();

  useEffect(() => {
    walletState !== undefined &&
    walletState !== WalletState.NOT_INITIALIZED &&
    walletState !== WalletState.AUTHENTICATED
      ? onOpen()
      : onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletState]);


  useEffect(() => {
    let getAddressAndPatchData = () => {};
    
    if (user?.wallet_address === null && accountState === AccountLoadState.ACCOUNT_LOADED) {
      getAddressAndPatchData = async () => {
        try {
          const wallet_address = await getSignerAddress();
          const patchData = {
            wallet_address: wallet_address,
          };
          setUserWalletAddress(token, patchData)
            .then(response => {
              console.log('Patch request successful', response);
            })
            .catch(error => {
              console.error('Error making patch request', error);
            });
        } catch (error) {
          console.error('Error getting signer address:', error);
        }
      }
    };
    getAddressAndPatchData();
  }, [accountState]);

  return (
    <>
      <Button
        isLoading={loadingState === LoadingStatusType.PENDING}
        onClick={actions.connectWallet}
      />
      {isOpen ? (
        <React.Suspense fallback={<Spinner size="xs" />}>
          <ConnectionModal onDisconnect={onClose} />
        </React.Suspense>
      ) : null}
    </>
  );
};
