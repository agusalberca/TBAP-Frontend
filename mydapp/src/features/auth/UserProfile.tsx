import React from 'react';
import { ProfileDropdownMenu } from './components/ProfileDropdownMenu/ProfileDropdownMenu';
import { LoginButton } from './components/LoginButton/LoginButton';
import { useBackendAuthentication } from './hooks/useBackendAuthentication';

export const UserProfile: React.FC = () => {
    const { isAuthenticated } = useBackendAuthentication();
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