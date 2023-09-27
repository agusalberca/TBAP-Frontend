import {
  Button,
  Box, Container, Stack, Center,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { withBackendProtection } from '../../features/auth/hocs/withBackendProtection';

import { CommonHeader } from '../../features/ui/components/CommonHeader';
import { TokenList } from '../../components/Tokens/TokenList';
import { useQuery } from 'react-query';
import { getUserTokensApi, getClaimTokenApi } from '../../api/tokens';
import useAppContext from '../../hooks/useAppContext';
import { requireAuth } from '../auth/AboutYou';

import { tr } from 'date-fns/locale';

export const ClaimTokensPage: React.FC = withBackendProtection(() => {
  requireAuth()
  const cancelRef = React.useRef()
  const { t } = useTranslation('ClaimTokensPage');
  const { token } = useAppContext()
  const {data} = useQuery('getUserTokensApi', () => getUserTokensApi(token, false))
  const pending_signature = useQuery('getClaimTokenApi', () => getClaimTokenApi(token))

  const [alertOpen, setAlertOpen] = useState(false);
  const [alreadyManagedAlert, setAlreadyManagedAlert] = useState(false);

  const manageAlertPositiveResponse = () => {
    setAlertOpen(false);
    console.log('Claiming tokens...')
    setAlreadyManagedAlert(true);
  };

  const closeAlert = () => {
    setAlertOpen(false);
    setAlreadyManagedAlert(true);
  };

  useEffect(() => {
    if (pending_signature?.status === 'success' 
        && !alertOpen
        && !alreadyManagedAlert) 
    {
      console.log(`alertOpen : ${alertOpen}, alreadyManagedAlert : ${alreadyManagedAlert} `)
      console.log(pending_signature)
      setAlertOpen(true);
      console.log(`Changed isOpen : ${alertOpen}`)
    }
  }, [pending_signature])

  const tokenDataList = {
    tokens: data ? data.data : []
  }


  return (
    <>
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
    <AlertDialog
          motionPreset='slideInBottom'
          isOpen={alertOpen}
          onClose={closeAlert}
          isCentered
          leastDestructiveRef={cancelRef}
        >
    <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>You have unclaimed signatures!</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          To proceed you have to claim them. Do you wish to continue?
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={closeAlert}>
            Cancel
          </Button>
          <Button onClick={manageAlertPositiveResponse} colorScheme='green' ml={3}>
            Proceed
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  );
});
