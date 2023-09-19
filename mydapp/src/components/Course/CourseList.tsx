import { HStack, Text} from '@chakra-ui/react'
import React from 'react';
import { UserCourse } from '../../api/apiTypes';
import { CourseBox } from './CourseBox';

interface CourseListProps {
    courses: UserCourse[]; // Rename the prop to 'tokens'
  }

export const CourseList: React.FC<CourseListProps> = (props) => {
    return (
        <HStack spacing='3'>
            {
                (props.courses) && (props.courses).length > 0
                ? (props.courses).map((course: UserCourse) => (
                    <CourseBox key={course.id}{...course}/>
                ))
                : <Text> No Courses </Text>
            }
        </HStack>
    );
};


