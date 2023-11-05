import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Container,
    Box,
    Center,
    Stack,
    Button,
    Heading,

    useDisclosure,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Divider,
    Select,
    Input,
    Flex,
    Circle
} from '@chakra-ui/react' 

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { format } from 'date-fns';
import { es } from 'date-fns/locale'; // Para el idioma en español

import { useQuery, useMutation, useQueryClient } from 'react-query';
import useAppContext from '../../hooks/useAppContext';
import { withAdminProtection } from '../../features/auth/hocs/withAdminProtection';
import { addNewUserMassivelyToCourse, addNewUserToCourse, getUsersOfOrganizationApi } from '../../api/organizations';
import { PaginatedItem, UserInvitation } from '../../api/apiTypes';
import TablePages from '../../components/Paginator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';


export const UsersInCourse: React.FC = withAdminProtection(() => {
    const { t } = useTranslation('PageUser');
    const { token, adminCourseDetail, selectedOrganization } = useAppContext()
    
    const [page, setPage] = useState(1)
    const [data, setData] = useState<PaginatedItem>()
    const [isLoading, setIsLoading] = useState(true)
    const [users_in_course, setUsersInCourse] = useState<UserInvitation[]>([])

    const query = useQuery('getUsersOfCourse', () => getUsersOfOrganizationApi(token, { 
        course_id : adminCourseDetail.id,
        page: page,
    }));
    
    useEffect(() => {
        const new_users_in_course = query.data ? query.data.data : [];
        setData(query.data);
        setIsLoading(query.isLoading);
        setUsersInCourse(new_users_in_course);

    }, [page]);


    useEffect(() => {
        query.refetch();
        const new_users_in_course = query.data ? query.data.data : [];
        setData(query.data);
        setIsLoading(query.isLoading);
        setUsersInCourse(new_users_in_course);

    }, [page, query.data]);
    
    const handlePrevPage = () => {
        if (page < 2) return
        setPage((prev) => prev - 1)
    }

    const handleNextPage = () => {
        if (page >= query.data.total_pages) return
        setPage((prev) => prev + 1)
    }
    
    const { isOpen: isOpenModalSingular, onOpen: onOpenModalSingular, onClose: onCloseModalSingular } = useDisclosure();
    const { isOpen: isOpenModalMassive, onOpen: onOpenModalMassive, onClose: onCloseModalMassive } = useDisclosure();
    

    const handleCloseModalMassive = () => {
        onCloseModalMassive();
        setCurrentStep(1);
        formikMassive.resetForm();
    }

    const [currentStep, setCurrentStep] = useState<number>(1);

    const nextStep = () => {
        if (currentStep < 2) {
            setCurrentStep(currentStep + 1);
        }
    };

    const [responseMassiveEmails, setResponseMassiveEmails] = useState<any>(null);


    const formikSingular = useFormik({
        initialValues: {
            email: '',
        },
        validateOnChange: false,
        validationSchema: Yup.object().shape({
            email: Yup.string().required('Required'),
        }),
        onSubmit: async values => {
            const body = {
                email: values.email,
                course_id: adminCourseDetail.id.toString()
            };
            const response = await addNewUserToCourse(token, body);

            if (response.non_field_errors) {
                formikSingular.setErrors({
                    email: response.non_field_errors[0]
                });
            } else if (response.error) {
                formikSingular.setErrors({
                    email: response.error
                });
            } else {
                onCloseModalSingular();
                query.refetch();
            }
        }
    });

    const formikMassive = useFormik({
        initialValues: {
            'file': null,
        },
        // validateOnChange: false,
        // validationSchema: Yup.object().shape({
        //     'file': Yup.array().required('Debe agregar al menos 1 archivo')
        // }),
        onSubmit: async values => {
            const body = {
                course_id: adminCourseDetail.id.toString(),
                emails: values.file
            };
            
            const response = await addNewUserMassivelyToCourse(token, body);
            setResponseMassiveEmails(response);
            if (response.non_field_errors) {
                formikMassive.setErrors({
                    file: response.non_field_errors[0]
                });
            } else if (response.error) {
                formikMassive.setErrors({
                    file: response.error
                });
            } else {
                nextStep();
                query.refetch();
            }
        }
    });


    return (
        <>
        
        <Container maxW="7xl" py={2} as={Stack} spacing={2}>
            <Heading as="h1" size="xl" textAlign="center">
                Users in course
            </Heading>
            <Box display="flex" justifyContent="space-around">
                <Button onClick={onOpenModalSingular} colorScheme="blue">
                    Add new user
                </Button>

                <Button onClick={onOpenModalMassive} colorScheme="blue">
                    Add massive users
                </Button>
            </Box>
            <Divider /> {/* Barra divisora */}
            {users_in_course.length > 0 ? (   
            <Box>
                <Center>
                    <TableContainer w="100%">
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th>Email</Th>
                                    <Th>Created at</Th>
                                    <Th>Status</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {users_in_course.map((info, index) => (
                                    <Tr key={index}>
                                        <Td>{info.email}</Td>
                                        <Td >{format(new Date(info.created_at), 'dd/MM/yyyy', { locale: es })}</Td>
                                        <Td >{info.status}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                    
                </Center>
                <br/>
                {isLoading ? <p>Loading...</p> :
                    <TablePages 
                    data={users_in_course} 
                    page={data.page} 
                    totalItems={data.total_items} 
                    perPage={6} 
                    totalPages={data.total_pages} 
                    handlePrevPage={handlePrevPage} 
                    handleNextPage={handleNextPage} 
                    />
                }
            </Box>
            ) : (
                <p>There are no users in this course</p>
            )}
        </Container>





        <Modal isOpen={isOpenModalSingular} onClose={onCloseModalSingular} >
            <form onSubmit={formikSingular.handleSubmit}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Add new user to course</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                        <p>Add a new user to the course {adminCourseDetail.name}</p>
                        <br/>
                        <FormControl isInvalid={!!formikSingular.errors.email}>
                            <FormLabel>Email</FormLabel>
                            <Input
                            name="email"
                            type="email"
                            placeholder="someone@gmail.com"
                            value={formikSingular.values.email}
                            onChange={formikSingular.handleChange}
                            autoComplete="email"
                            />
                            <FormErrorMessage>{formikSingular.errors.email}</FormErrorMessage>
                        </FormControl>
                
                </ModalBody>

                <ModalFooter>
                    <Button variant='ghost' mr={3} onClick={onCloseModalSingular}>
                    Close
                    </Button>
                    <Button colorScheme='blue' type="submit">Add</Button>
                </ModalFooter>
                </ModalContent>
            </form>
        </Modal>


        <Modal isOpen={isOpenModalMassive} onClose={onCloseModalMassive} >
            {currentStep === 1 && (
                <form onSubmit={formikMassive.handleSubmit}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Add a file with users</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                        <p>Add a new users to the course {adminCourseDetail.name}</p>
                        <br/>
                        <FormControl isInvalid={!!formikMassive.errors.file}>
                            <FormLabel>Archivo</FormLabel>
                            <Input
                            name="file"
                            type="file"
                            accept=".xls,.xlsx,.csv,.txt"
                            onChange={(event) => {
                                formikMassive.setFieldValue('file', event.currentTarget.files[0]);
                            }}
                            />
                            {/* <FormErrorMessage>{formikMassive.errors.file}</FormErrorMessage> */}
                        </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" colorScheme="blue" mr={3}>Submit</Button>
                            <Button onClick={onCloseModalMassive}>Cancel</Button>
                        </ModalFooter>
                        <Flex justify="center" mt={4}>
                            <Circle size="16px" bg="gray.300" borderWidth="2px" borderColor="gray.600" position="relative" marginBottom={25} marginRight={5}>
                                <Circle size="8px" bg="blue.500" borderRadius="50%" position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" />
                            </Circle>
                            <Circle size="16px" bg="white.300" borderWidth="2px" borderColor="gray.600" position="relative" />
                        </Flex>

                    </ModalContent>
                </form>
            )}
            {currentStep === 2 && (
                <>
                    <ModalOverlay />
                    <ModalHeader>Results</ModalHeader>
                    <ModalContent>
                    <ModalBody style={{marginTop: "1rem"}}>
                        {responseMassiveEmails && (
                            <>
                                {responseMassiveEmails.Accepted.amount > 0 && (
                                    <div>
                                        <h3><FontAwesomeIcon icon={faCheckCircle} color='green'/> Users invitation sent successfully ({responseMassiveEmails.Accepted.amount})</h3>
                                        {responseMassiveEmails.Accepted.emails.map((info, index) => (
                                            <p key={index}>{info}</p>
                                        ))}
                                    </div>
                                )}
                                {responseMassiveEmails.Denied && (
                                    <>
                                        {responseMassiveEmails.Denied.emails.already_sended_errors.length > 0 && (
                                            <>
                                                <h3><FontAwesomeIcon icon={faTimesCircle} color='red'/> Errors ({responseMassiveEmails.Denied.amount})</h3>
                                                <div>
                                                    <h5>Already Sent Errors:</h5>
                                                    {responseMassiveEmails.Denied.emails.already_sended_errors.map((info, index) => (
                                                        <p key={index}>{info}</p>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                        {responseMassiveEmails.Denied.emails.is_already_in_errors.length > 0 && (
                                            <>
                                            <div>
                                            <h5>Is Already In Errors:</h5>
                                            {responseMassiveEmails.Denied.emails.is_already_in_errors.map((info, index) => (
                                                <p key={index}>{info}</p>
                                            ))}
                                        </div>
                                            </>
                                        )}
                                    </>
                                )}

                                <Flex justify="center" mt={4} marginTop={10}>
                                    <Circle size="16px" bg="blue.300" borderWidth="2px" borderColor="gray.600" position="relative" marginRight={5} />
                                    <Circle size="16px" bg="gray.300" borderWidth="2px" borderColor="gray.600" position="relative" >
                                        <Circle size="8px" bg="blue.500" borderRadius="50%" position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" />
                                    </Circle>
                                </Flex>

                            </>
                        )}
                    </ModalBody>

                        <ModalFooter>
                            <Button onClick={handleCloseModalMassive}>Close</Button>
                        </ModalFooter>
                    </ModalContent>
                </>
            )}
        </Modal>

        </>

    );

});
