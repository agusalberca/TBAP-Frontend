import { Box, Container, Stack, Center } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { withBackendProtection } from '../../features/auth/hocs/withBackendProtection';

import { CommonHeader } from '../../features/ui/components/CommonHeader';
import { useQuery } from 'react-query';
import useAppContext from '../../hooks/useAppContext';
import { getAdminCoursesApi } from '../../api/courses';
import { AdminCourseList } from '../../components/Course/Admins/AdminCourseList';
import { requireAuth } from '../auth/AboutYou';

export const AdminCoursesPage: React.FC = withBackendProtection(() => {
    const { t } = useTranslation('PageUser');
    const { token, selectedOrganization } = useAppContext()

    const { data } = useQuery('getCourses', () => {
        const params = { organization_id : selectedOrganization.id }
        return getAdminCoursesApi(token, params);
    });

    const courseDataList = {
        courses: data ? data : []
    }

    return (
        <Box>
            <Container maxW="7xl" py={2} as={Stack} spacing={2}>
                <CommonHeader 
                    title='Cursos'
                    description='Estos son tus cursos!'
                />
                <Box >
                    <Center>
                        <AdminCourseList {...courseDataList} />
                    </Center>
                </Box>
            </Container>
        </Box>
    );
});
