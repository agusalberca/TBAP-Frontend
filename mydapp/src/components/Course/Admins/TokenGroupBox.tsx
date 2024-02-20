import {
  Card,
  CardBody,
  Center,
  Heading,
  Image,
  Stack,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import React from 'react';
import { es } from 'date-fns/locale';
import { format, parseISO } from 'date-fns';
import useAppContext from '../../../hooks/useAppContext';
import { TokenGroup } from '../../../api/apiTypes';
import { deleteTokenGroupApi } from '../../../api/tokens';

const { REACT_APP_URL_BACK } = process.env;

class TokenGroupProps {
  token: TokenGroup;
  query: any;
  setSelectedTokenGroup: any;
}

export const TokenGroupBox: React.FC<TokenGroupProps> = token_data => {
  const { token, isAdmin, isOrganization } = useAppContext();

  const tokenGroup = token_data.token;

  const deleteTokenGroup = async () => {
    await deleteTokenGroupApi(token, tokenGroup.id);
    token_data.query.refetch();
  };

  return (
    <>
      <Card width="15rem" height="25rem" overflow="hidden">
        {(isAdmin || isOrganization) && (
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<BsThreeDotsVertical />}
              variant="ghost"
              size="sm"
              position="absolute"
              top="2"
              right="2"
            />
            <MenuList width="80px">
              <MenuItem onClick={() => token_data.setSelectedTokenGroup(tokenGroup)}>
                Edit
              </MenuItem>
              {tokenGroup.deleteable ? (
                <MenuItem onClick={deleteTokenGroup}> Delete </MenuItem>
              ) : (
                <Tooltip
                  label="This token can't be deleted because it has claimed tokens"
                  aria-label="A tooltip"
                >
                  <MenuItem
                    style={{
                      cursor: 'not-allowed',
                      backgroundColor: '#80808033',
                    }}
                  >
                    Delete
                  </MenuItem>
                </Tooltip>
              )}
            </MenuList>
          </Menu>
        )}
        <CardBody textAlign="center">
          <Center>
            <Image
              src={REACT_APP_URL_BACK + tokenGroup.image}
              boxSize="10rem"
              objectFit="cover"
              borderRadius="full"
            />
          </Center>
          <Stack mt="6" spacing="3">
            <Heading size="md" isTruncated>
              {tokenGroup.name}
            </Heading>
            <Text
              display="-webkit-box"
              overflow="hidden"
              style={{
                WebkitBoxOrient: 'vertical',
                whiteSpace: 'normal',
                WebkitLineClamp: 3, // Adjust the number of lines you want to display
              }}
            >
              {tokenGroup.description}
            </Text>
            <Text color="blue.600" fontSize="xl">
              {format(parseISO(tokenGroup.created_at), 'dd/MM/yyyy', {
                locale: es,
              })}
            </Text>
          </Stack>
        </CardBody>
      </Card>
    </>
  );
};
