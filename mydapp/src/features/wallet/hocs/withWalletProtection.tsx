import React from 'react';

import { WalletProtectionWarning } from '../components/WalletProtectionWarning/WalletProtectionWarning';
import { useWalletAuthentication } from '../hooks/useWalletAuthentication';
import { tr } from 'date-fns/locale';

export const withWalletProtection = (
  ChildWithProps: React.ComponentType<any | string>,
  CustomWarning: React.ReactElement | undefined = undefined
) => {
  const WithProtection: React.FC = () => {
    const isAuthenticated = useWalletAuthentication();
    // const isAuthenticated = true; // REMOVE
    return isAuthenticated ? (
      <ChildWithProps />
    ) : (
      CustomWarning ?? <WalletProtectionWarning />
    );
  };
  return WithProtection;
};
