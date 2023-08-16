import React from 'react';

import { BackendAuthProtectionWarning } from '../components/BackendAuthProtectionWarning/BackendAuthProtectionWarning';
import { useBackendAuthentication } from '../hooks/useBackendAuthentication';

export const withBackendProtection = (
  ChildWithProps: React.ComponentType<any | string>,
  CustomWarning: React.ReactElement | undefined = undefined
) => {
  const WithProtection: React.FC = () => {
    const { isAuthenticated } = useBackendAuthentication();
    return isAuthenticated ? (
      <ChildWithProps />
    ) : (
      CustomWarning ?? <BackendAuthProtectionWarning />
    );
  };
  return WithProtection;
};
