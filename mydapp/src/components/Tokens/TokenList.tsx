import { Card, CardHeader, CardBody, CardFooter, HStack, Heading, Divider, Button, Image, Text, Center } from '@chakra-ui/react'
import React from 'react';
import { UserToken } from '../../api/apiTypes';
import { TokenBox } from './TokenBox';

interface TokenListProps {
    tokens: UserToken[]; // Rename the prop to 'tokens'
  }

export const TokenList: React.FC<TokenListProps> = (props) => {
    console.log(`TOKEN LIST PROPS: ${JSON.stringify(props.tokens)}`);
    return (
        <HStack spacing='3'>
            {(props.tokens).map((token: UserToken) => (
                <TokenBox key={token.token_group.id} {...token}/>
            ))}
        </HStack>
    );
};


