import { Button as ChakraButton } from '@chakra-ui/react';
import { AiOutlineUser } from '@react-icons/all-files/ai/AiOutlineUser';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';


export const LoginButton: React.FC = () => {
  const { t } = useTranslation('FeatureWallet');
  return (
    <ChakraButton
      ml={2}
      variant="solid"
      colorScheme="yellow"
      leftIcon={<AiOutlineUser />}
      as={RouterLink} to={'/login'}
      role="button"
    >
      {t('Login')}
    </ChakraButton>
  );
};
