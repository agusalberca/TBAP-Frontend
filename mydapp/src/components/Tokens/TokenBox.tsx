import { Card, CardHeader, CardBody, CardFooter, Stack, Heading, Divider, Button, Image, Text, Center } from '@chakra-ui/react'
import React from 'react';
import { UserToken } from '../../api/apiTypes';
import { format } from 'date-fns';
import { es } from 'date-fns/locale'; // Para el idioma en español

const { REACT_APP_URL_BACK } = process.env;

export const TokenBox: React.FC<UserToken> = (props) => {
    return (
        <Card maxW='xs'>
        <CardBody>
            <Image
                src={REACT_APP_URL_BACK + props.token_group.image}
                boxSize='10rem'
                borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
            <Heading size='md'> {props.token_group.name}   </Heading>
            <Text>  {props.token_group.description} </Text>
            <Text>  {props.token_group.course_name} </Text>
            <Text color='blue.600' fontSize='xl'>
                {format(new Date(props.created_at), 'dd/MM/yyyy', { locale: es })}
            </Text>
            </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
            <Center>
                <Button variant='solid' colorScheme='blue'>
                    Claim token
                </Button>
            </Center>
        </CardFooter>
        </Card>
    );
  };
  
