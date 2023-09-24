import {
  Container,
  Stack,
  Box,
  Heading,
  Text,
  Button,
  Link,
  Tag,
  Image,
} from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { requireAuth } from '../auth/AboutYou';


export const HomePage: React.FC = () => {
  const { t } = useTranslation('PageHome');
  requireAuth()
  return (
    <>
      	
    </>
  );
};

