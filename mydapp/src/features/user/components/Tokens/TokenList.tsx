import { Card, CardHeader, CardBody, CardFooter, HStack, Heading, Divider, Button, Image, Text, Center } from '@chakra-ui/react'
import React from 'react';
import { TokenData } from '../../types/TokensTypes'
import { TokenBox } from './TokenBox';

interface TokenListProps {
    tokens: TokenData[]; // Rename the prop to 'tokens'
  }

export const TokenList: React.FC<TokenListProps> = (props) => {
    
    return (
        //List TokenList as TokenBoxes
        <HStack spacing='3'>
            {props.tokens.map((token: TokenData) => (
                <TokenBox {...token}/>
            ))}
        </HStack>
    );
  };
  
