import {
  Box,
  Container,
  Stack,
  Center,
  Button,
  useDisclosure,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
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

import React from 'react';
import { useTranslation } from 'react-i18next';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { withBackendProtection } from '../../features/auth/hocs/withBackendProtection';

import { CommonHeader } from '../../features/ui/components/CommonHeader';
import useAppContext from '../../hooks/useAppContext';
import { AdminCourseList } from '../../components/Course/Admins/AdminCourseList';
import { createCourseApi } from '../../api/courses';

export const AdminCoursesPage: React.FC = withBackendProtection(() => {
  const { t } = useTranslation('Course');
  const { token, adminCourses, getAdminCoursesAsync, selectedOrganization } =
    useAppContext();

  //   getAdminCoursesAsync();
  const courseDataList = { courses: adminCourses };

  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      organization_id: selectedOrganization?.id,
    },
    validateOnChange: false,
    validationSchema: Yup.object().shape({
      name: Yup.string().required(t('Required')),
      description: Yup.string().required(t('Required')),
    }),
    onSubmit: async values => {
      console.log('selectedOrganization?.id', selectedOrganization?.id);
      console.log('values', values);
      const response = await createCourseApi(
        token, 
        {...values, organization_id: selectedOrganization?.id}
    );
      getAdminCoursesAsync();
      onCloseModal();
    },
  });

  return (
    <>
      <Box style={{ marginTop: '1rem' }}>
        <Container maxW="7xl" py={2} as={Stack} spacing={2}>
          <CommonHeader
            title={t('Courses')}
            description={t('These are your courses')}
          />
          <Box>
            <Button onClick={onOpenModal} colorScheme="blue">
              {t('Create course')}
            </Button>
          </Box>
          <Box>
            <Center>
              <AdminCourseList {...courseDataList} />
            </Center>
          </Box>
        </Container>
      </Box>

      <Modal isOpen={isOpenModal} onClose={onCloseModal}>
        <form onSubmit={formik.handleSubmit}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{t('Add new course')}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isInvalid={!!formik.errors.name}>
                <FormLabel>{t('Course name')}</FormLabel>
                <Input
                  name="name"
                  type="text"
                  placeholder={t('Course name')}
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
                <FormErrorMessage>{formik.errors.description}</FormErrorMessage>
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
  );
});
