import { HStack, Text} from '@chakra-ui/react'
import React from 'react';
import { AdminCourse } from '../../../api/apiTypes';
import { AdminCourseBox } from './AdminCourseBox';

interface ListProps {
    courses: AdminCourse[]
}

export const AdminCourseList: React.FC<ListProps> = (props) => {
    return (
        <HStack spacing='3'>
            {
                (props.courses) && (props.courses).length > 0
                ? (props.courses).map((course: AdminCourse ) => (
                    <AdminCourseBox key={course.id}{...course}/>
                ))
                : <Text> No Courses </Text>
            }
        </HStack>
    );
};


