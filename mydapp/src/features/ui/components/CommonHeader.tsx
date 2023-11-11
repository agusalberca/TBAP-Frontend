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
        <Heading size="l" textAlign="center">
            {props.title}
        </Heading>
        <Divider />
        <Flex alignItems="center" justifyContent="center">
            <h5 style={{fontSize: "1rem", fontWeight:"400"}}>{props.description}</h5>
        </Flex>
        <Divider />
        </>
    );
  };
  