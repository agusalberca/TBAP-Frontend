import { Card, CardBody, CardFooter, Stack, Heading, Divider, Button, Image, Text, Center } from '@chakra-ui/react'
import React from 'react';
import { AdminCourse, UserCourse } from '../../../api/apiTypes';
import { format } from 'date-fns';
import { es } from 'date-fns/locale'; // Para el idioma en español
import { Link, useNavigate } from 'react-router-dom';
import useAppContext from '../../../hooks/useAppContext';
import { useTranslation } from 'react-i18next';

const { REACT_APP_URL_BACK } = process.env;



export const UserCourseBox: React.FC<UserCourse> = (props) => {
    const { t } = useTranslation('Course');

    const { userCourseDetail, setUserCourseDetail } = useAppContext();
    const navigate = useNavigate()

    const handleVerCurso = (props) => {
        setUserCourseDetail(props)
        navigate('/course')
    };

    return (
        <Card w={"12rem"}>
            <CardBody>
                <Stack mt='6' spacing='3' textAlign="center">
                    <Heading size='md'> {props.course.name} </Heading>
                    <h5 style={{ fontSize: "0.9rem", fontWeight:"500" }}>  {props.course.description} </h5>
                </Stack>
            </CardBody>
            <Divider />
                <div style={{ display:"flex", alignSelf:"center" }}>
                    <Button variant='solid' colorScheme='blue' onClick={() => handleVerCurso(props)}>
                        {t('View course')}
                    </Button>
                </div>
                <br></br>
        </Card>
    );
  };
  
