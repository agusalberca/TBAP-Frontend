import { Box, Container, Stack, Center } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { withBackendProtection } from '../../features/auth/hocs/withBackendProtection';

import { CommonHeader } from '../../features/ui/components/CommonHeader';
import { TokenList } from '../../components/Tokens/TokenList';
import { useQuery } from 'react-query';
import { getUserTokensApi } from '../../api/tokens';
import useAppContext from '../../hooks/useAppContext';

export const ClaimTokensPage: React.FC = withBackendProtection(() => {
  const { t } = useTranslation('PageUser');
  const { token } = useAppContext()

  // TODO poner un useEffect para que se actualice la lista de tokens
  const {data} = useQuery('getUserTokensApi', () => getUserTokensApi(token))

  const tokenDataList = {
    tokens: data ? data.data : []
  }


  return (
    <Box>
      <Container maxW="7xl" py={2} as={Stack} spacing={2}>
        <CommonHeader 
            title='Claim Tokens!'
            description='Claim your tokens here!'
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
