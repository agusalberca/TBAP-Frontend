import { HStack, Text} from '@chakra-ui/react'
import React from 'react';
import { AdminCourse, UserCourse } from '../../../api/apiTypes';
import { UserCourseBox } from './UserCourseBox';

interface ListProps {
    courses: UserCourse[]
}

export const UserCourseList: React.FC<ListProps> = (props) => {
    return (
        <HStack spacing='3'>
            {
                (props.courses) && (props.courses).length > 0
                ? (props.courses).map((course: UserCourse ) => (
                    <UserCourseBox key={course.id}{...course}/>
                ))
                : <Text> No Courses </Text>
            }
        </HStack>
    );
};


