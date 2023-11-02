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
    Select
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

import { useQuery, useMutation, useQueryClient } from 'react-query';
import useAppContext from '../../hooks/useAppContext';
import { withAdminProtection } from '../../features/auth/hocs/withAdminProtection';
import { addNewAdminToCourse, getAdminOfOrganizationApi } from '../../api/organizations';
import { AdminInCourse } from '../../api/apiTypes';

export const AdminsInCourse: React.FC = withAdminProtection(() => {
    const { t } = useTranslation('PageUser');
    const { token, adminCourseDetail, selectedOrganization } = useAppContext()
    const admins_in_course = adminCourseDetail.admins_in_course;
    
    const queryClient = useQueryClient();
    const query_admin_in_organization = useQuery('getAdmisOfOrganization', () => {
        const params = { organization_id : selectedOrganization.id }
        return getAdminOfOrganizationApi(token, params);
    })

    var admin_in_organization: AdminInCourse[] = queryClient.getQueryData('getAdmisOfOrganization') || [];
    
    const { isOpen: isOpenModal, onOpen: onOpenModal, onClose: onCloseModal } = useDisclosure();
    

    const formik = useFormik({
        initialValues: {
            admin_id: '',
        },
        validateOnChange: false,
        validationSchema: Yup.object().shape({
            admin_id: Yup.string().required('Required'),
        }),
        onSubmit: async values => {
            const body = {
                admin_id: values.admin_id,
                organization_id: selectedOrganization.id.toString(),
                course_id: adminCourseDetail.id.toString()
            };
            const response = await addNewAdminToCourse(token, body);

            if (response.non_field_errors) {
                formik.setErrors({
                    admin_id: response.non_field_errors[0]
                });
            } else if (response.error) {
                formik.setErrors({
                    admin_id: response.error
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
                Admins in course
            </Heading>
            <Box>
                <Button onClick={onOpenModal} colorScheme="blue">
                    Add new admin
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
                                    <Th>Name</Th>
                                    {/* <Th></Th> */}
                                </Tr>
                            </Thead>
                            <Tbody>
                                {admins_in_course.map((data, index) => (
                                    <Tr key={index}>
                                        <Td>{data.user.email}</Td>
                                        <Td >{data.user.first_name} {data.user.last_name}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Center>
            </Box>
            <Divider /> {/* Barra divisora */}
            <Box>
                {/* Segunda tabla y botón */}
            </Box>
        </Container>





            <Modal isOpen={isOpenModal} onClose={onCloseModal} >
                <form onSubmit={formik.handleSubmit}>
                    <ModalOverlay />
                    <ModalContent>
                    <ModalHeader>Add new admin</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                            <p>Choose an admin to add to the course {adminCourseDetail.name}</p>
                            <br/>
                            <FormControl isInvalid={!!formik.errors.admin_id}>
                                <FormLabel>Admin</FormLabel>
                                <Select onChange={(e) => formik.setFieldValue('admin_id', e.target.value)}>
                                    {admin_in_organization && admin_in_organization.map((data, index) => (
                                        <option key={index} value={data.id}>{data.user.first_name + " " + data.user.last_name}</option>
                                    ))}
                                </Select>
                                <FormErrorMessage>{formik.errors.admin_id}</FormErrorMessage>
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
