import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
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
    Select,
    Input,
    Flex,
    Circle,
    Text
} from '@chakra-ui/react' 

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import useAppContext from '../../hooks/useAppContext';
import { useQuery } from 'react-query';
import { withAdminProtection } from '../../features/auth/hocs/withAdminProtection';
import { TokenGroup } from '../../api/apiTypes';
import {  getCourseTokenGroups } from '../../api/courses';
import { TokenGroupList } from '../../components/Course/Admins/TokenGroupList';



export const TokenGroupsInCourse: React.FC = withAdminProtection(() => {
    const { t } = useTranslation('Course');
    const { token, adminCourseDetail, selectedOrganization } = useAppContext()
    
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(true)
    const [tokenGroupsInCourse, setTokenGroupsInCourse] = useState<TokenGroup[]>([])

    const query = useQuery('getCourseTokenGroups', () => getCourseTokenGroups(token, { 
        course_id : adminCourseDetail.id,
    }));
    
    useEffect(() => {
        query.refetch();
        setIsLoading(query.isLoading);
        const tokenGroupsInCourse = query.data ? query.data : [];
        setTokenGroupsInCourse(tokenGroupsInCourse);
    }, [query.data]);

    return (
        <>
        <Container maxW="7xl" py={2} as={Stack} spacing={2}>
            <Heading as="h1" size="xl" textAlign="center">
                {t('Course tokens')}
            </Heading>
            <Divider />
            <Center>
                {tokenGroupsInCourse.length > 0 ? (   
                    <TokenGroupList tokens={tokenGroupsInCourse} />
                ) : (
                    <Text>{t('There are no tokens in this course')}</Text>
                )}
            </Center>
        </Container>
        </>
    );
});
