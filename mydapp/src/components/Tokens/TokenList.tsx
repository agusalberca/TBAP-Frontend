import { HStack, Text} from '@chakra-ui/react'
import React from 'react';
import { UserToken } from '../../api/apiTypes';
import { TokenBox } from './TokenBox';
import { useTranslation } from 'react-i18next';

interface TokenListProps {
    tokens: UserToken[]; // Rename the prop to 'tokens'
  }

export const TokenList: React.FC<TokenListProps> = (props) => {
    const { t } = useTranslation('Tokens');
    return (
        <HStack spacing='3'>
            {
            (props.tokens) && (props.tokens).length > 0
            ? (props.tokens).map((token: UserToken) => (
                <TokenBox key={token.token_group.id} {...token}/>)) 
            : <h5 style={{ fontSize: "0.9rem", fontWeight:"500" }}>
                {t('No tokens yet')}
              </h5>
            }
        </HStack>
    );
};


