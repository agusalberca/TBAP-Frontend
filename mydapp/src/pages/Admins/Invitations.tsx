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
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Divider
} from '@chakra-ui/react' 

import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay
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
import { withOrganizationProtection } from '../../features/auth/hocs/withOrganizationProtection';
import { deleteInvitationApi, getInvitationsApi, sentAdminInvitationEmail } from '../../api/organizations';

export const AdminInvitations: React.FC = withOrganizationProtection(() => {
    const { t } = useTranslation('PageUser');
    const { token } = useAppContext()
    

    const deleteInvitationMutation = useMutation((invitationId: number) => deleteInvitationApi(token, { invitation_id: invitationId }));

    const {data} = useQuery('getInvitation', () => getInvitationsApi(token))
    const queryClient = useQueryClient();

    const { isOpen: isOpenAlert, onOpen: onOpenAlert, onClose: onCloseAlert } = useDisclosure();
    const { isOpen: isOpenModal, onOpen: onOpenModal, onClose: onCloseModal } = useDisclosure();
    const cancelRef = React.useRef()
    
    const [deleteInvitationId, setDeleteInvitationId] = useState(null);


    const invitations = data ? data.data : [];

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validateOnChange: false,
        validationSchema: Yup.object().shape({
            email: Yup.string().email('Invalid email').required('Required'),
        }),
        onSubmit: async values => {
            const response = await sentAdminInvitationEmail(token, values);

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
                queryClient.invalidateQueries('getInvitation');
            }
        }
    });


    const handleDeleteInvitation = async () => {
        await deleteInvitationMutation.mutateAsync(deleteInvitationId);
        queryClient.invalidateQueries('getInvitation');
        onCloseAlert();
    };

    return (
        <>
        
        <Container maxW="7xl" py={2} as={Stack} spacing={2}>
            <Heading as="h1" size="xl" textAlign="center">
                Invitations
            </Heading>
            <Box>
                <Button onClick={onOpenModal} colorScheme="blue">
                    Sent new invitation
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
                                    <Th>Sent</Th>
                                    <Th>State</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {invitations.map((data, index) => (
                                    <Tr key={index}>
                                        <Td>{data.email}</Td>
                                        <Td >{new Date(data.created_at).toISOString().split('T')[0]}</Td>
                                        <Td >{data.status}</Td>
                                        <Td>
                                            {data.status.includes('Pending') ?
                                                <Button onClick={() => {onOpenAlert(); setDeleteInvitationId(data.id);}} colorScheme="red">
                                                    X
                                                </Button>
                                                :<Button colorScheme="red" isDisabled>
                                                    X
                                                </Button>
                                            }
                                        </Td>
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








            <AlertDialog
            isOpen={isOpenAlert}
            leastDestructiveRef={cancelRef}
            onClose={onCloseAlert}
            >
            <AlertDialogOverlay>
            <AlertDialogContent>
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Delete invitation
                </AlertDialogHeader>

                <AlertDialogBody>
                Do you want to delete this invitation? 
                </AlertDialogBody>

                <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onCloseAlert}>
                    Cancel
                </Button>
                <Button colorScheme='red' onClick={() => handleDeleteInvitation()} ml={3}>
                    Delete
                </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialogOverlay>
            </AlertDialog>

            <Modal isOpen={isOpenModal} onClose={onCloseModal} >
                <form onSubmit={formik.handleSubmit}>
                    <ModalOverlay />
                    <ModalContent>
                    <ModalHeader>Add new admin</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        
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
                        <Button colorScheme='blue' mr={3} onClick={onCloseModal}>
                        Close
                        </Button>
                        <Button variant='ghost' type="submit">Add</Button>
                    </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>

        </>

    );
});
