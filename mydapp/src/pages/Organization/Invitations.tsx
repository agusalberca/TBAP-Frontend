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
    Text
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

export const OrganizationInvitations: React.FC = withOrganizationProtection(() => {
    const { t } = useTranslation('OrganizationsMenu');
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
                <br />
                <Heading as="h1" size="xl" textAlign="center">
                    {t('Invitations')}
                </Heading>
                <Box>
                    <Button onClick={onOpenModal} colorScheme="blue">
                        {t('Send new invitation')}
                    </Button>
                </Box>
                <Box >
                    <Center>
                        <TableContainer w="100%">
                            <Table variant='simple'>
                                <Thead>
                                    <Tr>
                                        <Th>{t('Email')}</Th>
                                        <Th>{t('Sent')}</Th>
                                        <Th>{t('State')}</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {invitations.length > 0 ? (
                                        invitations.map((data, index) => (
                                            <Tr key={index}>
                                                <Td>{data.email}</Td>
                                                <Td>{new Date(data.created_at).toISOString().split('T')[0]}</Td>
                                                <Td>{t(data.status)}</Td>
                                                <Td>
                                                    {data.status.includes('Pending') ? (
                                                        <Button onClick={() => {onOpenAlert(); setDeleteInvitationId(data.id);}} colorScheme="red">
                                                            X
                                                        </Button>
                                                    ) : (
                                                        <Button colorScheme="red" isDisabled>
                                                            X
                                                        </Button>
                                                    )}
                                                </Td>
                                            </Tr>
                                        ))
                                    ) : (
                                        <Tr>
                                            <Text textAlign="center">
                                                {t('No invitations yet')}
                                            </Text>
                                        </Tr>
                                    )}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Center>
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
                {t('Delete invitation')}
                </AlertDialogHeader>

                <AlertDialogBody>
                {t('Do you want to delete this invitation?')}
                </AlertDialogBody>

                <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onCloseAlert}>
                    {t('Cancel')}
                </Button>
                <Button colorScheme='red' onClick={() => handleDeleteInvitation()} ml={3}>
                    {t('Delete')}
                </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialogOverlay>
            </AlertDialog>

            <Modal isOpen={isOpenModal} onClose={onCloseModal} >
                <form onSubmit={formik.handleSubmit}>
                    <ModalOverlay />
                    <ModalContent>
                    <ModalHeader>
                        {t('Add new admin')}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        
                            <FormControl isInvalid={!!formik.errors.email}>
                                <FormLabel>
                                    {t('Email')}
                                </FormLabel>
                                <Input
                                name="email"
                                type="email"
                                placeholder={t("someone@gmail.com")}
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                autoComplete="email"
                                />
                                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                            </FormControl>
                    
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onCloseModal}>
                        {t('Close')}
                        </Button>
                        <Button variant='ghost' type="submit">
                            {t('Add')}
                        </Button>
                    </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>

        </>

    );
});
