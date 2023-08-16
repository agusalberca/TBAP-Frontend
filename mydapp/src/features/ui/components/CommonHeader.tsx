import { Heading, Divider, Text, HStack, Flex } from '@chakra-ui/react';
import React from 'react';

//Interface for header props
interface HeaderProps {
    title: string;
    description: string;
}

export const CommonHeader: React.FC<HeaderProps> = (props) => {
  
    return (
        <>
        <Heading size="xs" textAlign="center">
            {props.title}
        </Heading>
        <Divider />
        <Flex alignItems="center" justifyContent="center">
            <Text fontSize="xs">{props.description}</Text>
        </Flex>
        <Divider />
        </>
    );
  };
  