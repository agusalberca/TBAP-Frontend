import { Box, Container, Stack, Center } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { withBackendProtection } from '../../features/auth/hocs/withBackendProtection';

import { CommonHeader } from '../../features/ui/components/CommonHeader';
import { TokenList } from '../../features/user/components/Tokens/TokenList';

export const ClaimTokensPage: React.FC = withBackendProtection(() => {
  const { t } = useTranslation('PageUser');

    const fakeTokenData = {
        title: 'Token title',
        description: 'Token description',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/US_One_Cent_Obv.png/1200px-US_One_Cent_Obv.png',
        createdAt: '2021-10-01',
        course: {
            title: 'Course title',
            description: 'Course description',
        },
    };
    console.log(fakeTokenData)
  //Generate a list of 6 fake tokens
    const fakeTokenDataList = {
        tokens:
        Array(6).fill(null).map(() => ({ ...fakeTokenData }))
    };
    console.log(fakeTokenDataList)

  return (
    <Box>
      <Container maxW="7xl" py={2} as={Stack} spacing={2}>
        <CommonHeader 
            title='Claim Tokens!'
            description='Claim your tokens here!'
        />
        <Box >
            <Center>
                <TokenList {...fakeTokenDataList} />
            </Center>
        </Box>
      </Container>
    </Box>
  );
});
