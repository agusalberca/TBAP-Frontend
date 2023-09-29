import {
    Button, 
    Card, 
    CardBody, 
    CardFooter, 
    Center, 
    Divider, 
    Heading, 
    Image, 
    Stack, 
    Text, 
    useDisclosure 
  } from '@chakra-ui/react';
import React from 'react';
import { es } from 'date-fns/locale';
import { format } from 'date-fns';
import useAppContext from '../../hooks/useAppContext';
import { UserToken } from '../../api/apiTypes';
import { mintToken } from '../../api/blockchain';
import { postClaimTokenApi } from '../../api/tokens';
import { useToast } from '@chakra-ui/react'

const { REACT_APP_URL_BACK } = process.env;

export const TokenBox: React.FC<UserToken> = (token_data) => {
    const { token } = useAppContext();
    const toast = useToast();

    const claimTokenHandler = async () => {
        try {
            const signature_data = await postClaimTokenApi(token, { user_token_id: token_data.id });
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
            toast({
                title: 'Error',
                description: `Transaction failed: ${error.reason || error.message || error || 'Unknown error'}`,
                status: 'error',
                duration: 5000, // Duration in milliseconds
                isClosable: true,
            });
        }
    };

    return (
        <>
        <Card maxW='xs'>
            <CardBody>
                <Image
                    src={REACT_APP_URL_BACK + token_data.token_group.image}
                    boxSize='10rem'
                    borderRadius='lg'
                    />
                <Stack mt='6' spacing='3'>
                    <Heading size='md'> {token_data.token_group.name}   </Heading>
                    <Text>  {token_data.token_group.description} </Text>
                    <Text>  {token_data.token_group.course_name} </Text>
                    <Text color='blue.600' fontSize='xl'>
                        {format(new Date(token_data.created_at), 'dd/MM/yyyy', { locale: es })}
                    </Text>
                </Stack>
            </CardBody>
            {!token_data.is_claimed && (
                <>
                    <Divider />
                    <CardFooter>
                        <Center>
                            <Button
                                variant='solid'
                                colorScheme='green'
                                onClick={claimTokenHandler}
                                >
                                Claim token
                            </Button>
                        </Center>
                    </CardFooter>
                </>
            )}
        </Card>
        </>
    );
};
