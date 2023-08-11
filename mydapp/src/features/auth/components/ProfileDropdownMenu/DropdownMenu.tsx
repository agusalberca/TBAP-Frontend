import {
  Box,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { IoIosLogOut } from '@react-icons/all-files/io/IoIosLogOut';
import { CgProfile } from "@react-icons/all-files/cg/CgProfile";
import { BiMedal } from "@react-icons/all-files/bi/BiMedal";
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';


import { Identicon } from './Identicon';

export interface DropdownMenuProps {
  username: string;
  profileLink: string;
  myTokensLink: string;
  onDisconnectClicked: () => void;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  username,
  profileLink,
  myTokensLink,
  onDisconnectClicked,
}) => {
  const { t } = useTranslation('FeatureProfile');

  return (
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
      >
        <HStack>
          <Text color="white" fontSize="md" fontWeight="medium" mr="2">
            {username}
          </Text>
        </HStack>
      </MenuButton>
      <MenuList alignItems="center" m={0}>
        <VStack align="center">
          <Box>
            <Text>{username}</Text>
          </Box>
        </VStack>
        <MenuDivider />
        <MenuItem icon={<CgProfile />} as={RouterLink} to={profileLink}>
          {t('Profile')}
        </MenuItem>
        <MenuItem icon={<BiMedal />} as={RouterLink} to={myTokensLink}>
          {t('My Tokens')}
        </MenuItem>
        <MenuDivider />
        <MenuItem icon={<IoIosLogOut />} onClick={() => onDisconnectClicked()}>
          {t('LogOut')}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
