import { Card, CardBody, CardFooter, Stack, Heading, Divider, Button, Image, Text, Center } from '@chakra-ui/react'
import React from 'react';
import { AdminCourse, UserCourse } from '../../../api/apiTypes';
import { format } from 'date-fns';
import { es } from 'date-fns/locale'; // Para el idioma en español
import { Link, useNavigate } from 'react-router-dom';
import useAppContext from '../../../hooks/useAppContext';

const { REACT_APP_URL_BACK } = process.env;



export const AdminCourseBox: React.FC<AdminCourse> = (props) => {

    const { adminCourseDetail, setAdminCourseDetail } = useAppContext();
    const navigate = useNavigate()

    const handleVerCurso = (props) => {
        setAdminCourseDetail(props)
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
                <Heading size='md' textAlign="center"> {props.name} </Heading>
                <h5 style={{fontSize:"1rem", fontWeight:"300"}}>  {props.description} </h5>
                {/* <Text color='blue.600' fontSize='xl'>
                    {format(new Date(props.created_at), 'dd/MM/yyyy', { locale: es })}
                </Text> */}
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter style={{display: "flex", alignSelf: "center"}}>
                <Center>
                    <Button variant='solid' colorScheme='blue' onClick={() => handleVerCurso(props)}>
                        View course
                    </Button>
                </Center>
            </CardFooter>
        </Card>
    );
  };
  
