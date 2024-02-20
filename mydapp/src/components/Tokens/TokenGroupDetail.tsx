import {
  Box,
  Text,
  IconButton,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useDisclosure,
  Button,
  Tooltip,
  Image,
} from '@chakra-ui/react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
} from '@chakra-ui/react';

import { ArrowBackIcon, CloseIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react';
import { TokenGroup } from '../../api/apiTypes';
import { useTranslation } from 'react-i18next';
import { es } from 'date-fns/locale';
import { format, parseISO } from 'date-fns';

import {
  deleteTokenGroupApi,
  deleteUserTokenApi,
  getTokenGroupDetail,
  createUserTokenApi,
} from '../../api/tokens';

import { getUsersOfCourseApi } from '../../api/organizations';
import useAppContext from '../../hooks/useAppContext';
import { useQuery } from 'react-query';

import { useFormik } from 'formik';
import * as Yup from 'yup';

interface TokenGroupDetailProps {
  tokenGroup: TokenGroup;
  setSelectedTokenGroup: any;
}

const { REACT_APP_URL_BACK } = process.env;

export const TokenGroupDetail: React.FC<TokenGroupDetailProps> = ({
  tokenGroup,
  setSelectedTokenGroup,
}) => {
  const { t } = useTranslation('Tokens');
  const { token, user: LoggedUser } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const {
    isOpen: isOpenModalDelete,
    onOpen: onOpenModalDelete,
    onClose: onCloseModalDelete,
  } = useDisclosure();
  const {
    isOpen: isOpenModalAddUser,
    onOpen: onOpenModalAddUser,
    onClose: onCloseModalAddUser,
  } = useDisclosure();
  const formattedDate = format(parseISO(tokenGroup.created_at), 'dd/MM/yyyy', {
    locale: es,
  });

  const [tokenDetail, setTokenDetail] = useState<TokenGroup>(null);
  const [usersOfCourse, setUsersOfCourse] = useState<any>(null);

  const query = useQuery(
    'getTokenGroupDetail',
    async () => await getTokenGroupDetail(token, tokenGroup.id)
  );

  const query_users_of_course = useQuery(
    'getUsersOfCourse',
    () =>
      tokenGroup.course_id &&
      getUsersOfCourseApi(token, {
        course_id: tokenGroup.course_id,
        page: 1,
        per_page: 9999,
      })
  );

  useEffect(() => {
    setIsLoading(query.isLoading);
    if (query.data) {
      setTokenDetail(query.data);
    }
  }, [query.data]);

  useEffect(() => {
    if (query_users_of_course.data) {
      setUsersOfCourse(query_users_of_course.data.data);
    }
    console.log("usersOfCourse", usersOfCourse);
  }, [query_users_of_course.data, query.data]);


  const handleRemoveUser = id => {
    deleteUserTokenApi(token, id);
    query.refetch();
  };

  const handleDeleteToken = () => {
    deleteTokenGroupApi(token, tokenGroup.id);
    onCloseModalDelete();
    setSelectedTokenGroup(null);
  };

  const formik = useFormik({
    initialValues: {
      user: null as number,
    },
    validateOnChange: false,
    validationSchema: Yup.object().shape({
      user: Yup.string().required(t('Required')),
    }),
    onSubmit: async values => {
      const response = await createUserTokenApi(token, {
        ...values,
        token_group: tokenGroup.id,
      });
      query.refetch();
      onCloseModalAddUser();
    },
  });

  return (
    <>
      {isLoading ? (
        <Text>{t('Loading')}...</Text>
      ) : (
        <>
          <Box
            p="4"
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="lg"
            overflowY="auto"
            display="flex"
            flexDirection="column"
            height="100%"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb="3"
            >
              <IconButton
                icon={<ArrowBackIcon />}
                aria-label="Back"
                onClick={() => setSelectedTokenGroup(null)}
              />
              <Heading as="h2" size="lg">
                {t('Token Details')}
              </Heading>
              <Box w="5" />
            </Box>
            <Box display="flex">
              <Box flex="1" pr={4} maxW="90%">
                {' '}
                {/* Añadir maxW */}
                <Text mb="2">
                  <strong>{t('Name')}:</strong> {tokenDetail.name}
                </Text>
                <Text mb="2">
                  <strong>{t('Description')}:</strong> {tokenDetail.description}
                </Text>
                <Text mb="2">
                  <strong>{t('Created Date')}:</strong> {formattedDate}
                </Text>
                <br />
                {tokenDetail &&
                  tokenDetail.users &&
                  tokenDetail.users.length === 0 && (
                    <Box mb="4">
                      <Text>{t('No authorized users yet')}</Text>
                      <Button
                        onClick={onOpenModalAddUser}
                        colorScheme="blue"
                        variant="link"
                        _hover={{
                          textDecoration: 'underline',
                          color: 'blue.500',
                        }}
                      >
                        {t('Add user')}
                      </Button>
                    </Box>
                  )}
                {tokenDetail &&
                  tokenDetail.users &&
                  tokenDetail.users.length > 0 && (
                    <>
                      <Box mb="4">
                        <Heading as="h3" size="md" mb="2">
                          {t('Authorized Users')}
                        </Heading>
                        <Button
                          onClick={onOpenModalAddUser}
                          colorScheme="blue"
                          variant="link"
                          _hover={{
                            textDecoration: 'underline',
                            color: 'blue.500',
                          }}
                        >
                          {t('Add user')}
                        </Button>
                      </Box>
                      <Box maxH="200px" overflowY="auto" mb="4">
                        <Table variant="simple" size="sm" maxH="200px">
                          <Thead>
                            <Tr>
                              <Th>Email</Th>
                              <Th>Was claimed</Th>
                              <Th>Created at</Th>
                              <Th>Remove user</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {tokenDetail.users.map(user => (
                              <Tr key={user.id}>
                                <Td>{user.email}</Td>
                                <Td>{user.is_claimed ? 'Yes' : 'No'}</Td>
                                <Td>
                                  {format(
                                    parseISO(user.created_at),
                                    'dd/MM/yyyy',
                                    {
                                      locale: es,
                                    }
                                  )}
                                </Td>
                                <Td>
                                  <IconButton
                                    icon={<CloseIcon />}
                                    aria-label="Remove User"
                                    onClick={() => handleRemoveUser(user.id)}
                                    size="sm"
                                  />
                                </Td>
                              </Tr>
                            ))}
                          </Tbody>
                        </Table>
                      </Box>
                    </>
                  )}
              </Box>
              <Image
                src={REACT_APP_URL_BACK + tokenDetail.image}
                alt="Token Image"
                boxSize="120px"
                objectFit="cover"
              />
            </Box>
            <Box mt="auto" textAlign="center" marginTop={3}>
              {tokenDetail.deleteable ? (
                <Button
                  onClick={onOpenModalDelete}
                  colorScheme="red"
                  variant="link"
                  _hover={{ textDecoration: 'underline', color: 'red.500' }}
                >
                  {t('Delete token')}
                </Button>
              ) : (
                <Tooltip
                  label="This token can't be deleted because it was claimed by a user."
                  aria-label="A tooltip"
                >
                  <Text
                    color="gray.500"
                    cursor="not-allowed"
                    _hover={{ textDecoration: 'underline' }}
                  >
                    {t('Delete Token')}
                  </Text>
                </Tooltip>
              )}
            </Box>
          </Box>

          {isOpenModalDelete && (
            <Modal isOpen={isOpenModalDelete} onClose={onCloseModalDelete}>
              <ModalOverlay />
              <ModalContent p={4}>
                <ModalHeader>{t('Delete token?')}</ModalHeader>
                <ModalCloseButton />
                <Box mb={4} p={7}>
                  <Text>
                    {t('Are you sure you want to delete this token?')}
                  </Text>
                </Box>
                <ModalFooter>
                  <Button colorScheme="red" mr={3} onClick={handleDeleteToken}>
                    {t('Delete')}
                  </Button>
                  <Button variant="ghost" mr={3} onClick={onCloseModalDelete}>
                    {t('Close')}
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}

          {isOpenModalAddUser && (
            <Modal isOpen={isOpenModalAddUser} onClose={onCloseModalAddUser}>
              <ModalOverlay />
              <ModalContent p={4}>
                <form onSubmit={formik.handleSubmit}>
                  <ModalHeader>
                    {t('Enable user to claim the token.')}
                  </ModalHeader>
                  <ModalCloseButton />
                  <Box mb={4} p={7}>
                    <label htmlFor="user">{t('Select User')}</label>
                    <select
                      id="user"
                      name="user"
                      onChange={(e) => formik.handleChange(e)}
                      onBlur={formik.handleBlur}
                      value={formik.values.user}
                    >
                      <option value={0} label={t('Select a user')} />
                      {usersOfCourse &&
                        usersOfCourse
                          .filter(
                            user =>
                              !tokenDetail.users.some(
                                tokenUser => tokenUser.user_id === user.id
                              )
                          )
                          .map(user => (
                            <option
                              key={user.id}
                              value={user.id}
                              label={user.email}
                            />
                          ))}
                    </select>

                    {formik.touched.user &&
                      typeof formik.errors.user === 'number' && (
                        <Text color="red.500" fontSize="sm" mt={1}>
                          {formik.errors.user}
                        </Text>
                      )}
                  </Box>
                  <ModalFooter
                    justifyContent="space-between"
                    borderTopWidth="1px"
                    borderColor="gray.200"
                    pr={4} // Padding derecho para el botón "Close"
                    pl={4} // Padding izquierdo para el botón "Close"
                  >
                    <Button
                      variant="ghost"
                      onClick={onCloseModalAddUser}
                      width="45%" // Ancho del botón "Close"
                    >
                      {t('Close')}
                    </Button>
                    <Button colorScheme="blue" type="submit" width="45%">
                      {t('Add User')}
                    </Button>
                  </ModalFooter>
                </form>
              </ModalContent>
            </Modal>
          )}
        </>
      )}
    </>
  );
};
