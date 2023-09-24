import { Box, Container, Stack, Center } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { withBackendProtection } from '../../features/auth/hocs/withBackendProtection';

import { CommonHeader } from '../../features/ui/components/CommonHeader';
import { useQuery } from 'react-query';
import useAppContext from '../../hooks/useAppContext';
import { getCoursesApi } from '../../api/courses';
import { CourseList } from '../../components/Course/CourseList';
import { requireAuth } from '../auth/AboutYou';

export const CoursesPage: React.FC = withBackendProtection(() => {
    requireAuth()
    const { t } = useTranslation('PageUser');
    const { token } = useAppContext()

    const {data} = useQuery('getCourses', () => getCoursesApi(token))

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
                        <CourseList {...courseDataList} />
                    </Center>
                </Box>
            </Container>
        </Box>
    );
});
