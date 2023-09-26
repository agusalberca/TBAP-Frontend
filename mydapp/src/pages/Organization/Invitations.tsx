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
} from '@chakra-ui/react' 
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';


import { CommonHeader } from '../../features/ui/components/CommonHeader';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import useAppContext from '../../hooks/useAppContext';
import { withOrganizationProtection } from '../../features/auth/hocs/withOrganizationProtection';
import { deleteInvitationApi, getInvitationsApi } from '../../api/organizations';

export const Invitations: React.FC = withOrganizationProtection(() => {
    const { t } = useTranslation('PageUser');
    const { token } = useAppContext()

    const deleteInvitationMutation = useMutation((invitationId: number) => deleteInvitationApi(token, { invitation_id: invitationId }));

    const {data} = useQuery('getInvitation', () => getInvitationsApi(token))
    const queryClient = useQueryClient();

    const invitations = data ? data.data : [];

    const handleCancelClick = async (invitationId: number) => {
        await deleteInvitationMutation.mutateAsync(invitationId);
        queryClient.invalidateQueries('getInvitation');

    };

    useEffect(() => {
        console.log(invitations)
    } , [invitations])

    return (
        <Container maxW="7xl" py={2} as={Stack} spacing={2}>
            <CommonHeader 
                title='Invitaciones'
                description='Estos son tus invitaciones!'
            />
            <Box >
                <Center>
                    <TableContainer w="100%">
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th>Email</Th>
                                    <Th>Enviado</Th>
                                    <Th>Estado</Th>
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
                                                <Button onClick={() => handleCancelClick(data.id)} colorScheme="red">
                                                    X
                                                </Button>
                                                // DeactiveButton
                                                :<Button onClick={() => handleCancelClick(data.id)} colorScheme="red" isDisabled>
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
        </Container>
    );
});
