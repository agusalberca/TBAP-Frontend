import { Card, CardHeader, CardBody, CardFooter, HStack, Heading, Divider, Button, Image, Text, Center } from '@chakra-ui/react'
import React from 'react';
import { UserToken } from '../../../../api/apiTypes';
import { TokenBox } from './TokenBox';

interface TokenListProps {
    tokens: UserToken[]; // Rename the prop to 'tokens'
  }

export const TokenList: React.FC<TokenListProps> = (props) => {
    return (
        //List TokenList as TokenBoxes
        <HStack spacing='3'>
            {(props.tokens).map((token: UserToken) => (
                <TokenBox {...token}/>
            ))}
        </HStack>
    );
};


