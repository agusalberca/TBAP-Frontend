import React from 'react';

import { useWalletAuthentication } from '../hooks/useWalletAuthentication';

import { ConnectButton } from './ConnectButton/ConnectButton';
import { ProfileDropdownMenu } from './ProfileDropdownMenu/ProfileDropdownMenu';
import useAppContext from '../../../hooks/useAppContext';

export const Wallet: React.FC = () => {
  const isAuthenticated = useWalletAuthentication();
  const { isRegularUser } = useAppContext(); 
  return (
    <>
      {isRegularUser && (
        isAuthenticated ? (
          <ProfileDropdownMenu />
        ) : (
          <ConnectButton />
        )
      )}
    </>
  );
};
