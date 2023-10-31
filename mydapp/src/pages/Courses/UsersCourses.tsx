import {
    Box,
    Container,
    Stack,
    Center,
    Button,
  } from '@chakra-ui/react';
  import React, { useEffect } from 'react';
  import { useTranslation } from 'react-i18next';
  import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react';
  import {
    useDisclosure,
    FormControl,
    FormLabel,
    FormErrorMessage,
  } from '@chakra-ui/react';
  import { withBackendProtection } from '../../features/auth/hocs/withBackendProtection';
  import { CommonHeader } from '../../features/ui/components/CommonHeader';
  import { useQuery } from 'react-query';
  import useAppContext from '../../hooks/useAppContext';
  import { getInvitationToJoinCourseApi, getUserCoursesApi } from '../../api/courses';
  import { UserCourseList } from '../../components/Course/Users/UserCourseList';
  import { requireAuth } from '../auth/AboutYou';
  import { useMutation } from 'react-query';
  import { API_URL } from '../../constants';
  
  export const UserCoursesPage: React.FC = withBackendProtection(() => {
    requireAuth();
    const { t } = useTranslation('PageUser');
    const { token, selectedOrganization } = useAppContext();
  
    if (!selectedOrganization) {
      return (
        <Box p={4}>
          <Container maxW="7xl" py={2} as={Stack} spacing={2}>
            <CommonHeader
              title="Courses"
              description="These are your courses"
            />
            <Box>
              <p>You have no courses</p>
            </Box>
          </Container>
        </Box>
      );
    }
 
    
    const params = { organization_id: selectedOrganization.id };
    const query = useQuery('getCourses', () => {
      return getUserCoursesApi(token);
    });
  
    const courseDataList = {
      courses: query.data ? query.data : [],
    };
  
    const { data: dataInvitations } = useQuery(
      'regular_user/invitations-to-join-course-as-user/',
      () => {
        return getInvitationToJoinCourseApi(token);
      }
    );
  
    const invitationDataList = dataInvitations ? dataInvitations : [];
  
    const { isOpen: isOpenModal, onOpen: onOpenModal, onClose: onCloseModal } = useDisclosure();

    const invitationMutation = useMutation(async (variables: {invitationId: string, status: string}) => {
      const formData = new FormData();
      formData.append('invitation_id', variables.invitationId);
      formData.append('invitation_status', variables.status); 
    
      const response = await fetch(`${API_URL}/regular_user/invitations-to-join-course-as-user/`, {
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

    const handleInvitation = async (invitationId: string, status: string) => {
      console.log(invitationId, status);
      try {
        const data = await invitationMutation.mutateAsync({invitationId, status});
        // El 'data' contiene la respuesta del servidor (si hay)
        // Puedes utilizarlo para actualizar la interfaz de usuario si es necesario
        onCloseModal();
        query.refetch();
        // invalidate dataInvitations
        dataInvitations
      } catch (error) {
        console.log(error)
      }
    };
  

  
  
    return (
      <>
        <Box p={4}>
          <Container maxW="7xl" py={2} as={Stack} spacing={2}>
            <CommonHeader 
              title="Courses"
              description="These are your courses"
            />
            <Box>
              <Button onClick={onOpenModal}>Invitations</Button>
              <Center>
                <UserCourseList {...courseDataList} />
              </Center>
            </Box>
          </Container>
        </Box>
  
        <Modal isOpen={isOpenModal} onClose={onCloseModal}>
          <ModalOverlay />
          <ModalContent p={4}>
            <ModalHeader>Invitations to courses</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box mb={4}>
                <p>Manage your invitations to courses</p>
              </Box>
              {invitationDataList.map((info, index) => (
                <Box
                  key={index}
                  p={4}
                  border="1px"
                  borderColor="gray.200"
                  borderRadius="md"
                  mb={4}
                >
                  <p>{info.course.name} - {info.course.organization_name}</p>
                  <p>{info.course.description}</p>
                  <Button
                    colorScheme="teal"
                    mr={2}
                    onClick={() => {
                      handleInvitation(info.id.toString(), 'Accepted');
                    }}
                    >
                    Accept
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => {
                      handleInvitation(info.id.toString(), 'Rejected');
                    }}
                  >
                    Decline
                  </Button>
                </Box>
              ))}
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onCloseModal}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  });
  