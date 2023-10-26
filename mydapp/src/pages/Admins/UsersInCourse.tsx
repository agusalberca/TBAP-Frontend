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
    Input
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
import { addNewAdminToCourse, addNewUserToCourse, getUsersOfOrganizationApi } from '../../api/organizations';
import { AdminInCourse, PaginatedItem, UserInvitation } from '../../api/apiTypes';
import TablePages from '../../components/Paginator';

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
        query.refetch();
        const new_users_in_course = query.data ? query.data.data : [];
        setData(query.data);
        setIsLoading(query.isLoading);
        setUsersInCourse(new_users_in_course);

    }, [page, query.data]);
    
    const handlePrevPage = () => {
        if (page < 2) return
        setPage((prev) => prev - 1)
        console.log("page", page)
    }

    const handleNextPage = () => {
        if (page >= query.data.total_pages) return
        setPage((prev) => prev + 1)
        console.log("page", page)
    }
    
    const { isOpen: isOpenModal, onOpen: onOpenModal, onClose: onCloseModal } = useDisclosure();
    

    const formik = useFormik({
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
                formik.setErrors({
                    email: response.non_field_errors[0]
                });
            } else if (response.error) {
                formik.setErrors({
                    email: response.error
                });
            } else {
                onCloseModal();
                window.location.reload();
            }
        }
    });



    return (
        <>
        
        <Container maxW="7xl" py={2} as={Stack} spacing={2}>
            <Heading as="h1" size="xl" textAlign="center">
                Users in course
            </Heading>
            <Box>
                <Button onClick={onOpenModal} colorScheme="blue">
                    Add new user
                </Button>

                <Button onClick={onOpenModal} colorScheme="blue">
                    Add massive users
                </Button>
            </Box>
            <Divider /> {/* Barra divisora */}
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
                                {users_in_course.map((data, index) => (
                                    <Tr key={index}>
                                        <Td>{data.email}</Td>
                                        <Td >{format(new Date(data.created_at), 'dd/MM/yyyy', { locale: es })}</Td>
                                        <Td >{data.status}</Td>
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
        </Container>





            <Modal isOpen={isOpenModal} onClose={onCloseModal} >
                <form onSubmit={formik.handleSubmit}>
                    <ModalOverlay />
                    <ModalContent>
                    <ModalHeader>Add new user to course</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                            <p>Add a new user to add to the course {adminCourseDetail.name}</p>
                            <br/>
                            <FormControl isInvalid={!!formik.errors.email}>
                                <FormLabel>Email</FormLabel>
                                <Input
                                name="email"
                                type="email"
                                placeholder="someone@gmail.com"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                autoComplete="email"
                                />
                                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                            </FormControl>
                    
                    </ModalBody>

                    <ModalFooter>
                        <Button variant='ghost' mr={3} onClick={onCloseModal}>
                        Close
                        </Button>
                        <Button colorScheme='blue' type="submit">Add</Button>
                    </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>

        </>

    );

});
