import { Box, Container, Stack } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { withBackendProtection } from '../../features/auth/hocs/withBackendProtection'
import useAppContext from '../../hooks/useAppContext';
import { CommonHeader } from '../../features/ui/components/CommonHeader';
import { requireAuth } from '../auth/AboutYou';
import UserProfileComponent from './components/UserProfileComponent';
import Input from '../../components/Input';
import { useFormik } from 'formik'
import * as Yup from 'yup'

export const UserProfilePage: React.FC = withBackendProtection(() => {
  requireAuth()
  const { t } = useTranslation('UserProfilePage');
  const { token, user } = useAppContext()
  const formik = useFormik({
    initialValues: {
      user_type: user?.user_type ?? '',
    },
    validateOnChange: false,
    validationSchema: Yup.object().shape({
      user_type: Yup.string().required('Required'),
      organization_id: Yup.string().required('Organization is required'),
      region_id: Yup.number().test(
        'check if is required',
        'Region is required',
        (value) =>
          (formik.values.user_type !== 'organization_admin' &&
            typeof value === 'number') ||
          formik.values.user_type === 'organization_admin'
      ),
      permissions: Yup.string().required('Required'),
    }),
    onSubmit: async ({
      user_type,
    }) => {
      const body: {
        user_type: string;
      } = {
        // permissions,
        user_type,
        // organization_id: Number(organization_id),
      }
      // if (user_type !== 'organization_admin')
      //   body.region_id = Number(region_id)

      // const response = await updateUserProfile(token, userInfo.id, body)

      // if (response.error) {
      //   setServerError(true)
      // } else if (response) {
      //   refetch()
      //   setStep((p) => p + 1)
      // }
    },
  })

  return (
    <Box>
      <Container maxW="7xl" py={2} as={Stack} spacing={2}>
        <Box>

      
        </Box>
      </Container>
    </Box>
  );
});
