import React from 'react';

import { BackendAuthProtectionWarning } from '../components/BackendAuthProtectionWarning/BackendAuthProtectionWarning';
import { isAdminUser, isOrganizationUser, useBackendAuthentication } from '../hooks/useBackendAuthentication';
import { is } from 'date-fns/locale';

export const withAdminProtection = (
    ChildWithProps: React.ComponentType<any | string>,
    CustomWarning: React.ReactElement | undefined = undefined
    ) => {
        const WithProtection: React.FC = () => {
            const isAuthenticated = useBackendAuthentication();
            const isAdmin = isAdminUser();
            const isOrganization = isOrganizationUser();
    
    return isAuthenticated && (isAdmin || isOrganization) ? (
        <ChildWithProps />
        ) : (
        CustomWarning ?? <BackendAuthProtectionWarning />    
    );
    };
    return WithProtection;
};