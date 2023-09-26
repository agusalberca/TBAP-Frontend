import React from 'react';

import { BackendAuthProtectionWarning } from '../components/BackendAuthProtectionWarning/BackendAuthProtectionWarning';
import { isOrganizationUser, useBackendAuthentication } from '../hooks/useBackendAuthentication';

export const withOrganizationProtection = (
    ChildWithProps: React.ComponentType<any | string>,
    CustomWarning: React.ReactElement | undefined = undefined
    ) => {
        const WithProtection: React.FC = () => {
            const isAuthenticated = useBackendAuthentication();
            const isOrganization = isOrganizationUser();
    
    return isAuthenticated && isOrganization ? (
        <ChildWithProps />
        ) : (
        CustomWarning ?? <BackendAuthProtectionWarning />    
    );
    };
    return WithProtection;
};