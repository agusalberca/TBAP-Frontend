import { Box, Container, Stack, Center } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { withWalletProtection } from '../../features/wallet/hocs/withWalletProtection';

import { CommonHeader } from '../../features/ui/components/CommonHeader';
import { TokenList } from '../../components/Tokens/TokenList';
import { useQuery } from 'react-query';
import { getUserTokensApi } from '../../api/tokens';
import useAppContext from '../../hooks/useAppContext';
import { requireAuth } from '../auth/AboutYou';

export const UserTokensPage: React.FC = withWalletProtection(() => {
  requireAuth()
  const { t } = useTranslation('Tokens');
  const { token } = useAppContext()

  // TODO poner un useEffect para que se actualice la lista de tokens
  const {data} = useQuery('getUserTokensApi', () => getUserTokensApi(token, {'is_claimed': Boolean(true)}))
  const tokenDataList = {
    tokens: data ? data.data : []
  }


  return (
    <Box>
      <Container maxW="7xl" py={2} as={Stack} spacing={2}>
        <CommonHeader 
            title={t('My tokens!')}
            description={t('These tokens belong to your wallet! (They have already been claimed)')}
        />
        <Box >
            <Center>
                <TokenList {...tokenDataList} />
            </Center>
        </Box>
      </Container>
    </Box>
  );
});
