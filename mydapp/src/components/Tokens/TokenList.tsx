import { HStack, Text} from '@chakra-ui/react'
import React from 'react';
import { UserToken } from '../../api/apiTypes';
import { TokenBox } from './TokenBox';

interface TokenListProps {
    tokens: UserToken[]; // Rename the prop to 'tokens'
  }

export const TokenList: React.FC<TokenListProps> = (props) => {
    return (
        <HStack spacing='3'>
            {
            (props.tokens) && (props.tokens).length > 0
            ? (props.tokens).map((token: UserToken) => (
                <TokenBox key={token.token_group.id} {...token}/>)) 
            : <Text> No tokens </Text>
            }
        </HStack>
    );
};


