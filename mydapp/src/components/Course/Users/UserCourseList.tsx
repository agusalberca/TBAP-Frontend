import { HStack, Text} from '@chakra-ui/react'
import React from 'react';
import { UserCourse } from '../../../api/apiTypes';
import { UserCourseBox } from './UserCourseBox';
import { useTranslation } from 'react-i18next';

interface ListProps {
    courses: UserCourse[]
}


export const UserCourseList: React.FC<ListProps> = (props) => {
    const { t } = useTranslation('');
    return (
        <HStack spacing='3'>
            {
                (props.courses) && (props.courses).length > 0
                ? (props.courses).map((course: UserCourse ) => (
                    <UserCourseBox key={course.id}{...course}/>
                ))
                : <Text> {t('No Courses')} </Text>
            }
        </HStack>
    );
};


