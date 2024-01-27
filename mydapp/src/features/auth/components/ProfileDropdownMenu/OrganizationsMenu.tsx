import React from 'react';
import { useContext } from 'react';
import {
  Box,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  HStack,
} from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

import { FaEnvelope } from "@react-icons/all-files/fa/FaEnvelope";
import { VscOrganization } from "@react-icons/all-files/vsc/VscOrganization";
import { CheckCircleIcon } from '@chakra-ui/icons';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../../../../context/AppContext';
import { getInvitationToJoinCourseAsUserApi, getInvitationToJoinOrganizationAsAdminApi } from '../../../../api/courses';
import { useMutation, useQuery } from 'react-query';
import { API_URL } from '../../../../constants';

export const OrganizationsMenu: React.FC = () => {
  const { t } = useTranslation('FeatureProfile');
  const { token, adminOrganizations, userOrganizations, selectedOrganization, setSelectedOrganization } = useContext(AppContext)

  const { isOpen: isOpenModal, onOpen: onOpenModal, onClose: onCloseModal } = useDisclosure();

  const handleSetSelectedOrganization = (organization: any) => {
    setSelectedOrganization(organization);
  }

  const invitationMutation = useMutation(async (variables: {invitationId: string, status: string, type: string}) => {
    const formData = new FormData();
    formData.append('invitation_id', variables.invitationId);
    formData.append('invitation_status', variables.status); 

    const type = variables.type;

    const url = type === 'user' ? 'regular_user/invitations-to-join-course-as-user/' : 'admin/invitations-to-became-admin/';
  
    const response = await fetch(`${API_URL}/${url}`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
      },
      body: formData,
    });
  
    if (!response.ok) {
      throw new Error('Error al aceptar la invitación');
    }
  
    return response.json();
  });

  const { data: dataInvitationsUser, refetch: refetchInvitationsUser } = useQuery(
    'regular_user/invitations-to-join-course-as-user/',
    () => {
      return getInvitationToJoinCourseAsUserApi(token) ?? [];
    }
  );

  const { data: dataInvitationsAdmin, refetch: refetchInvitationsAdmin } = useQuery(
    'admin/invitations-to-became-admin/',
    () => {
      return getInvitationToJoinOrganizationAsAdminApi(token) ?? [];
    }
  );

  const handleInvitation = async (invitationId: string, status: string, type: string) => {
    try {
      const data = await invitationMutation.mutateAsync({invitationId, status, type});
      onCloseModal();
      if (type === 'user') {
        refetchInvitationsUser();
      } else if (type === 'admin') {
        refetchInvitationsAdmin();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Menu placement="bottom-end">
        <MenuButton
          as={Button}
          cursor="pointer"
          bg="gray.800"
          _hover={{
            backgroundColor: 'gray.700',
          }}
          variant="outline"
          ml={2}
          px={4}
        >
          <HStack>
              <VscOrganization style={{ color: '#ffffff' }} />
          </HStack>
        </MenuButton>
        <MenuList alignItems="center" m={0} p={4}>
          <HStack key="selectedOrganization" align="center" justifyContent={"center"}>
            {selectedOrganization ? (
              <>
                <Text>{selectedOrganization.name}</Text>
                <CheckCircleIcon ml={2} color="green.500" />
              </>
            ) : (
              <Text>No organizations yet</Text>
            )}
          </HStack>
          {adminOrganizations.length > 1 && (
            <>
              <MenuDivider />
              {adminOrganizations.map((organization: any, index: number) => (
                (organization.id !== selectedOrganization?.id) && (
                  <MenuItem
                    key={index}
                    onClick={() => handleSetSelectedOrganization(organization)}
                  >
                    {organization.name}
                  </MenuItem>
                )
              ))}
            </>
          )}
          <MenuDivider />
          <MenuItem icon={<FaEnvelope />} onClick={onOpenModal}>
            {t('Invitations')}
          </MenuItem>
        </MenuList>
      </Menu>

      {isOpenModal && (
        <Modal isOpen={isOpenModal} onClose={onCloseModal}>
          <ModalOverlay />
          <ModalContent p={4}>
            <ModalHeader>Invitations to Organizations</ModalHeader>
            <ModalCloseButton />
            {dataInvitationsAdmin.length > 0 || dataInvitationsUser.length > 0 ? (
              <Box mb={4} p={7}>
                <Text>Manage your invitations to organizations</Text>
              </Box>
            ) : (
              <Box mb={4} p={7}>
                <Text>No invitations yet</Text>
              </Box>
            )}

            <ModalBody>
              {dataInvitationsAdmin.length > 0 && (
                <Box mb={4}>
                  <Text as="h2" fontSize="lg" fontWeight="bold" mb={2}>
                    {t('Invitations as Admin')}
                  </Text>
                  {dataInvitationsAdmin.map((info, index) => (
                    <Box
                      key={index}
                      p={4}
                      border="1px"
                      borderColor="gray.200"
                      borderRadius="md"
                      mb={4}
                    >
                      <Text>{info.organization.name} - {info.organization.organization_name}</Text>
                      <Button
                        colorScheme="teal"
                        mr={2}
                        onClick={() => {
                          handleInvitation(info.id.toString(), 'Accepted', 'admin');
                        }}
                      >
                        Accept
                      </Button>
                      <Button
                        colorScheme="red"
                        onClick={() => {
                          handleInvitation(info.id.toString(), 'Rejected', 'admin');
                        }}
                      >
                        Decline
                      </Button>
                    </Box>
                  ))}
                </Box>
              )}

              {dataInvitationsUser.length > 0 && (
                <Box mb={4}>
                  <Text as="h2" fontSize="lg" fontWeight="bold" mb={2}>
                    {t('Invitations as User')}
                  </Text>
                  {dataInvitationsUser.map((info, index) => (
                    <Box
                      key={index}
                      p={4}
                      border="1px"
                      borderColor="gray.200"
                      borderRadius="md"
                      mb={4}
                    >
                      <Text>{info.course.name} - {info.course.organization_name}</Text>
                      <Text>{info.course.description}</Text>
                      <Button
                        colorScheme="teal"
                        mr={2}
                        onClick={() => {
                          handleInvitation(info.id.toString(), 'Accepted', 'user');
                        }}
                      >
                        Accept
                      </Button>
                      <Button
                        colorScheme="red"
                        onClick={() => {
                          handleInvitation(info.id.toString(), 'Rejected', 'user');
                        }}
                      >
                        Decline
                      </Button>
                    </Box>
                  ))}
                </Box>
              )}
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onCloseModal}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
