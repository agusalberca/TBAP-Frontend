import {
    Card, 
    CardBody, 
    Center, 
    Heading, 
    Image, 
    Stack, 
    Text, 
  } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { es } from 'date-fns/locale';
import { format, parseISO } from 'date-fns';
import useAppContext from '../../../hooks/useAppContext';
import { TokenGroup } from '../../../api/apiTypes';
import { useToast } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next';

const { REACT_APP_URL_BACK } = process.env;

export const TokenGroupBox: React.FC<TokenGroup> = (token_data) => {
    const { t } = useTranslation('Tokens');
    const navigate = useNavigate();

    const { token, setTokenDetailId } = useAppContext();
    const toast = useToast();

    return (
        <>
        <Card maxW='xs'>
            <CardBody textAlign="center">
                <Center>
                    <Image
                        src={REACT_APP_URL_BACK + token_data.image}
                        boxSize='10rem'
                        objectFit='cover'
                        borderRadius='full'
                        />
                </Center>
                <Stack mt='6' spacing='3'>
                    <Heading size='md'> {token_data.name}   </Heading>
                    <Text>  {token_data.description} </Text>
                    <Text color='blue.600' fontSize='xl'>
                        {format(parseISO(token_data.created_at), 'dd/MM/yyyy', { locale: es })}
                    </Text>
                </Stack>
            </CardBody>
        </Card>
        </>
    );
};
