import { Box, Container, Stack, Center } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { withBackendProtection } from '../../features/auth/hocs/withBackendProtection';

import { CommonHeader } from '../../features/ui/components/CommonHeader';
import { useQuery } from 'react-query';
import useAppContext from '../../hooks/useAppContext';
import { getUserCoursesApi } from '../../api/courses';
import { UserCourseList } from '../../components/Course/Users/UserCourseList';
import { requireAuth } from '../auth/AboutYou';

export const UserCoursesPage: React.FC = withBackendProtection(() => {
    requireAuth()
    const { t } = useTranslation('PageUser');
    const { token, selectedOrganization } = useAppContext()

    const params = { organization_id : selectedOrganization.id }
    const { data } = useQuery('getCourses', () => {
        return getUserCoursesApi(token);
    });

    const courseDataList = {
        courses: data ? data : []
    }

    console.log("courseDataList", courseDataList)


    return (
        <Box>
            <Container maxW="7xl" py={2} as={Stack} spacing={2}>
                <CommonHeader 
                    title='Cursos'
                    description='Estos son tus cursos!'
                />
                <Box >
                    <Center>
                        <UserCourseList {...courseDataList} />
                    </Center>
                </Box>
            </Container>
        </Box>
    );
});
