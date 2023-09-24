import { Box, Container, Stack } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { withBackendProtection } from '../../features/auth/hocs/withBackendProtection'
import useAppContext from '../../hooks/useAppContext';
import { CommonHeader } from '../../features/ui/components/CommonHeader';
import { requireAuth } from '../auth/AboutYou';

export const UserProfilePage: React.FC = withBackendProtection(() => {
  requireAuth()
  const { t } = useTranslation('UserProfilePage');
  const { token } = useAppContext()

  return (
    <Box>
      <Container maxW="7xl" py={2} as={Stack} spacing={2}>
        <CommonHeader 
                title='User Profile!'
                description='This is your profile!'
            />
        <Box>
          {t(
            "To be developed!!!"
          )}
        </Box>
      </Container>
    </Box>
  );
});
