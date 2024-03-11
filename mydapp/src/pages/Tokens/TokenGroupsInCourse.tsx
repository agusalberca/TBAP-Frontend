import {
  Container,
  Box,
  Center,
  Stack,
  Button,
  Heading,
  useDisclosure,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Divider,
  Input,
  Text,
} from '@chakra-ui/react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import useAppContext from '../../hooks/useAppContext';
import { useQuery } from 'react-query';
import { withAdminProtection } from '../../features/auth/hocs/withAdminProtection';
import { TokenGroup } from '../../api/apiTypes';
import { getCourseTokenGroups } from '../../api/courses';
import { TokenGroupList } from '../../components/Course/Admins/TokenGroupList';
import { createTokenGroup } from '../../api/tokens';
import { TokenGroupDetail } from '../../components/Tokens/TokenGroupDetail';

export const TokenGroupsInCourse: React.FC = withAdminProtection(() => {
  const { t } = useTranslation('Course');
  const { token, adminCourseDetail } = useAppContext();

  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [tokenGroupsInCourse, setTokenGroupsInCourse] = useState<TokenGroup[]>(
    []
  );
  const [selectedTokenGroup, setSelectedTokenGroup] =
    useState<TokenGroup | null>(null);

  const query = useQuery('getCourseTokenGroups', () =>
    getCourseTokenGroups(token, {
      course_id: adminCourseDetail.id,
    })
  );

  useEffect(() => {
    // query.refetch();
    setIsLoading(query.isLoading);
    const tokenGroupsInCourse = query.data ? query.data : [];
    setTokenGroupsInCourse(tokenGroupsInCourse);
  }, [query.data]);

  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      course_id: adminCourseDetail?.id,
      users: 'all',
    },
    validateOnChange: false,
    validationSchema: Yup.object().shape({
      name: Yup.string().required(t('Required')),
      description: Yup.string().required(t('Required')),
    }),
    onSubmit: async values => {
      const response = await createTokenGroup(token, {
        ...values,
        course_id: adminCourseDetail?.id,
      });
      query.refetch();
      onCloseModal();
    },
  });

  return (
    <>
      {selectedTokenGroup ? (
        <TokenGroupDetail tokenGroup={selectedTokenGroup} setSelectedTokenGroup={setSelectedTokenGroup} />
      ) : (
        <>
          <Container maxW="7xl" py={2} as={Stack} spacing={2}>
            <Heading as="h1" size="xl" textAlign="center">
              {t('Course tokens')}
            </Heading>
            <Divider />
            <Box>
              <Button onClick={onOpenModal} colorScheme="blue">
                {t('Create Token')}
              </Button>
            </Box>
            <Center>
              {tokenGroupsInCourse.length > 0 ? (
                <TokenGroupList
                  tokens={tokenGroupsInCourse}
                  query={query}
                  setSelectedTokenGroup={setSelectedTokenGroup}
                />
              ) : (
                <Text>{t('There are no tokens in this course')}</Text>
              )}
            </Center>
          </Container>

          <Modal isOpen={isOpenModal} onClose={onCloseModal}>
            <form onSubmit={formik.handleSubmit}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>{t('Add new token')}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <FormControl isInvalid={!!formik.errors.name}>
                    <FormLabel>{t('Token name')}</FormLabel>
                    <Input
                      name="name"
                      type="text"
                      placeholder={t('Name')}
                      value={formik.values.name}
                      onChange={formik.handleChange}
                    />
                    <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
                    <br />
                    <br />

                    <FormLabel>{t('Description')}</FormLabel>
                    <Input
                      name="description"
                      type="text"
                      placeholder={t('Description')}
                      value={formik.values.description}
                      onChange={formik.handleChange}
                    />
                    <FormErrorMessage>
                      {formik.errors.description}
                    </FormErrorMessage>
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onCloseModal}>
                    {t('Close')}
                  </Button>
                  <Button variant="ghost" type="submit">
                    {t('Create')}
                  </Button>
                </ModalFooter>
              </ModalContent>
            </form>
          </Modal>
        </>
      )}
    </>
  );
});
