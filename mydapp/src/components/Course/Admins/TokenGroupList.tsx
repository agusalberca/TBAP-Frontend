import { Center, HStack, Text} from '@chakra-ui/react'
import React from 'react';
import { TokenGroup } from '../../../api/apiTypes';
import { TokenGroupBox } from './TokenGroupBox';
import { useTranslation } from 'react-i18next';

interface TokenGroupListProps {
    tokens: TokenGroup[]; // Rename the prop to 'tokens'
  }

export const TokenGroupList: React.FC<TokenGroupListProps> = (props) => {
    const { t } = useTranslation('Tokens');
    return (
        // center hstack
        <HStack spacing='3'  >
            {
                (props.tokens) && (props.tokens).length > 0
                ? (props.tokens).map((token: TokenGroup) => (
                    
                    <TokenGroupBox key={token.id} {...token}/>)) 
                    : <h5 style={{ fontSize: "0.9rem", fontWeight:"500" }}>
                {t('No tokens yet')}
              </h5>
            }
        </HStack>
    );
};


