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
  useToast
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { tr } from 'date-fns/locale';

import { withWalletProtection } from '../../features/wallet/hocs/withWalletProtection';

import { CommonHeader } from '../../features/ui/components/CommonHeader';
import { TokenList } from '../../components/Tokens/TokenList';
import { getUserTokensApi, getClaimTokenApi } from '../../api/tokens';
import { mintToken } from '../../api/blockchain';
import useAppContext from '../../hooks/useAppContext';
import { requireAuth } from '../auth/AboutYou';

export const ClaimTokensPage: React.FC = withWalletProtection(() => {
  requireAuth()
  const cancelRef = React.useRef()
  const { t } = useTranslation('ClaimTokensPage');
  const { token } = useAppContext()
  const {data} = useQuery('getUserTokensApi', () => getUserTokensApi(token, {'is_claimed': Boolean(false)}))
  const pending_signature = useQuery('getClaimTokenApi', () => getClaimTokenApi(token))

  const [alertOpen, setAlertOpen] = useState(false);
  const [alreadyManagedAlert, setAlreadyManagedAlert] = useState(false);
  const toast = useToast();

  const claimTokenHandler = async (signature_data) => {
      try {
          if (signature_data.error) {
              throw new Error(signature_data.error);
          }
          await mintToken(
                  signature_data.title, 
                  signature_data.issuerId, 
                  signature_data.nonce, 
                  signature_data.uri, 
                  signature_data.signature
                  );
      } catch (error) {
          console.error('Error claiming token:', error);
          console.error('Keys:', Object.keys(error));
          toast({
              title: 'Error',
              description: `Transaction failed: ${error.reason || error.message || error || 'Unknown error'}`,
              status: 'error',
              duration: 5000, // Duration in milliseconds
              isClosable: true,
          });
      }
  };
  const manageAlertPositiveResponse = () => {
    setAlertOpen(false);
    setAlreadyManagedAlert(true);
    claimTokenHandler(pending_signature.data)
  };

  const closeAlert = () => {
    setAlertOpen(false);
    setAlreadyManagedAlert(true);
  };

  useEffect(() => {
    if (pending_signature?.status === 'success' 
        && Object.keys(pending_signature?.data).length !== 0
        && !alertOpen
        && !alreadyManagedAlert) 
    {
      setAlertOpen(true);
    }
  }, [pending_signature])

  const tokenDataList = {
    tokens: data ? data.data : []
  }


  return (
    <>
    <Box>
      <Container maxW="7xl" py={2} as={Stack} spacing={2}>
        <br></br>
        <CommonHeader 
            title={t("Your tokens")}
            description={t("Claim your tokens here!")}
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
