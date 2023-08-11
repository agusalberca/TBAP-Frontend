import React from 'react';
import { ProfileDropdownMenu } from './components/ProfileDropdownMenu/ProfileDropdownMenu';
import { LoginButton } from './components/LoginButton/LoginButton';
// import { useWalletAuthentication } from '../wallet/hooks/useWalletAuthentication';

export const UserProfile: React.FC = () => {
    // const { isAuthenticated } = useWalletAuthentication();
    const isAuthenticated = true;
    return (
      <>
        {isAuthenticated ? (
          <ProfileDropdownMenu />
        ) : (
          <>
            <LoginButton />
          </>
        )}
      </>
    );
  };