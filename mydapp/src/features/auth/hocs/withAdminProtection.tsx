import React from 'react';

import { BackendAuthProtectionWarning } from '../components/BackendAuthProtectionWarning/BackendAuthProtectionWarning';
import { isAdminUser, useBackendAuthentication } from '../hooks/useBackendAuthentication';

export const withAdminProtection = (
    ChildWithProps: React.ComponentType<any | string>,
    CustomWarning: React.ReactElement | undefined = undefined
    ) => {
        const WithProtection: React.FC = () => {
            const isAuthenticated = useBackendAuthentication();
            const isAdmin = isAdminUser();
    
    return isAuthenticated && isAdmin ? (
        <ChildWithProps />
        ) : (
        CustomWarning ?? <BackendAuthProtectionWarning />    
    );
    };
    return WithProtection;
};