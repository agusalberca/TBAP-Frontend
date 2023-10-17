import { Card, CardBody, CardFooter, Stack, Heading, Divider, Button, Image, Text, Center } from '@chakra-ui/react'
import React from 'react';
import { AdminCourse, UserCourse } from '../../../api/apiTypes';
import { format } from 'date-fns';
import { es } from 'date-fns/locale'; // Para el idioma en español
import { Link, useNavigate } from 'react-router-dom';
import useAppContext from '../../../hooks/useAppContext';

const { REACT_APP_URL_BACK } = process.env;



export const UserCourseBox: React.FC<UserCourse> = (props) => {

    const { userCourseDetail, setUserCourseDetail } = useAppContext();
    const navigate = useNavigate()

    const handleVerCurso = (props) => {
        setUserCourseDetail(props)
        navigate('/course')
    };

    return (
        <Card maxW='xs'>
            <CardBody>
                {/* <Image
                    src={REACT_APP_URL_BACK + props.token_group.image}
                    boxSize='10rem'
                    borderRadius='lg'
                /> */}
                <Stack mt='6' spacing='3'>
                <Heading size='md'> {props.course.name} </Heading>
                <Text>  {props.course.description} </Text>
                {/* <Text color='blue.600' fontSize='xl'>
                    {format(new Date(props.created_at), 'dd/MM/yyyy', { locale: es })}
                </Text> */}
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
                <Center>
                    <Button variant='solid' colorScheme='blue' onClick={() => handleVerCurso(props)}>
                        Ver curso
                    </Button>
                </Center>
            </CardFooter>
        </Card>
    );
  };
  
