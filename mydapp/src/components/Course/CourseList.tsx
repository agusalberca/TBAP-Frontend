import { HStack} from '@chakra-ui/react'
import React from 'react';
import { UserCourse } from '../../api/apiTypes';
import { CourseBox } from './CourseBox';

interface CourseListProps {
    courses: UserCourse[]; // Rename the prop to 'tokens'
  }

export const CourseList: React.FC<CourseListProps> = (props) => {
    return (
        //List TokenList as TokenBoxes
        <HStack spacing='3'>
            {(props.courses).map((course: UserCourse) => (
                <CourseBox {...course}/>
            ))}
        </HStack>
    );
};


