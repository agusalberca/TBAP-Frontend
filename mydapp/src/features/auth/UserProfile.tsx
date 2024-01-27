import React from 'react';
import { OrganizationsMenu } from './components/ProfileDropdownMenu/OrganizationsMenu';
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
            <OrganizationsMenu />
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