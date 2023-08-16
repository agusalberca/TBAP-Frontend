import { Card, CardHeader, CardBody, CardFooter, Stack, Heading, Divider, Button, Image, Text, Center } from '@chakra-ui/react'
import React from 'react';
import { TokenData } from '../../types/TokensTypes'

export const TokenBox: React.FC<TokenData> = (props) => {
    return (
        <Card maxW='xs'>
        <CardBody>
            <Image
                src={props.image}
                boxSize='10rem'
                borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
            <Heading size='md'> {props.title}   </Heading>
            <Text>  {props.description} </Text>
            <Text>  {props.course.title} </Text>
            <Text color='blue.600' fontSize='xl'>
                {props.createdAt}
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
  
