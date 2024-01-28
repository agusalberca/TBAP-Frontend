import { Card, CardBody, CardFooter, Stack, Heading, Divider, Button, Image, Text, Center } from '@chakra-ui/react'
import React from 'react';
import { AdminCourse } from '../../../api/apiTypes';
import { useNavigate } from 'react-router-dom';
import useAppContext from '../../../hooks/useAppContext';
import { useTranslation } from 'react-i18next';


export const AdminCourseBox: React.FC<AdminCourse> = (props) => {
    const { t } = useTranslation('PageHome');

    const {setAdminCourseDetail } = useAppContext();
    const navigate = useNavigate()

    const handleVerCurso = (props) => {
        setAdminCourseDetail(props)
        navigate('/course')
    };

    return (
        <Card maxW='xs'>
            <CardBody>
                <Stack mt='6' spacing='3'>
                    <Heading size='md' textAlign="center"> {props.name} </Heading>
                    <h5 style={{fontSize:"1rem", fontWeight:"300"}}>  {props.description} </h5>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter style={{display: "flex", alignSelf: "center"}}>
                <Center>
                    <Button variant='solid' colorScheme='blue' onClick={() => handleVerCurso(props)}>
                        {t('View course')}
                    </Button>
                </Center>
            </CardFooter>
        </Card>
    );
  };
  
