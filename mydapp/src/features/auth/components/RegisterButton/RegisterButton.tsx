import { Button as ChakraButton } from '@chakra-ui/react';
import { FaUserPlus } from '@react-icons/all-files/fa/FaUserPlus'; // Importamos el nuevo icono
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

export const RegisterButton: React.FC = () => {
  const { t } = useTranslation('FeatureWallet');
  return (
    <ChakraButton
      ml={2}
      variant="solid"
      colorScheme="blue"
      leftIcon={<FaUserPlus />}
      as={RouterLink} to={'/register'}
      role="button"
    >
      {t('Register')}
    </ChakraButton>
  );
};
