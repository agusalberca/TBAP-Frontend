import { HStack, Text} from '@chakra-ui/react'
import React from 'react';
import { AdminCourse } from '../../../api/apiTypes';
import { AdminCourseBox } from './AdminCourseBox';
import { useTranslation } from 'react-i18next';

interface ListProps {
    courses: AdminCourse[]
}

export const AdminCourseList: React.FC<ListProps> = (props) => {
    const { t } = useTranslation('');
    return (
        <HStack spacing='3'>
            {
                (props.courses) && (props.courses).length > 0
                ? (props.courses).map((course: AdminCourse ) => (
                    <AdminCourseBox key={course.id}{...course}/>
                ))
                : <Text> {t('No Courses')} </Text>
            }
        </HStack>
    );
};


