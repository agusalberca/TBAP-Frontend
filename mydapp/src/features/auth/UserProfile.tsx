import React from 'react';
import { ProfileDropdownMenu } from './components/ProfileDropdownMenu/ProfileDropdownMenu';
import { LoginButton } from './components/LoginButton/LoginButton';
import { useBackendAuthentication } from './hooks/useBackendAuthentication';
import { Wallet } from '../wallet/components/Wallet';
import { RegisterButton } from './components/RegisterButton/RegisterButton';
export const UserProfile: React.FC = () => {
    const isAuthenticated = useBackendAuthentication();
    return (
      <>
        {isAuthenticated ? (
          <>
            <Wallet />
            <ProfileDropdownMenu />
          </>
        ) : (
          <>
            <LoginButton />
            <RegisterButton />
          </>
        )}
      </>
    );
  };