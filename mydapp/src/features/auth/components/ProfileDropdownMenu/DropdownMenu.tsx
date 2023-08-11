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
  Link,
} from '@chakra-ui/react';
import { FaExternalLinkAlt } from '@react-icons/all-files/fa/FaExternalLinkAlt';
import { IoIosLogOut } from '@react-icons/all-files/io/IoIosLogOut';
import { CgProfile } from "@react-icons/all-files/cg/CgProfile";
import { MdDashboard } from '@react-icons/all-files/md/MdDashboard';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';


import { Identicon } from './Identicon';

export interface DropdownMenuProps {
  address: string;
  username: string;
  onDisconnectClicked: () => void;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  address,
  username,
  onDisconnectClicked,
}) => {
  const { t } = useTranslation('FeatureWallet');

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
          {currentNetwork ? (
            <NetworkLogo
              networkId={currentNetwork?.chainId}
              networkName={currentNetwork?.chainName}
            />
          ) : null}
          <Text color="white" fontSize="md" fontWeight="medium" mr="2">
            {username}
          </Text>
          <Identicon size={24} account={address} />
        </HStack>
      </MenuButton>
      <MenuList alignItems="center" m={0}>
        <VStack align="center">
          <Box>
            <Text>{username}</Text>
          </Box>
        </VStack>
        <MenuDivider />
        <MenuItem icon={<CgProfile />} as={RouterLink} to={userPageLink}>
          {t('Profile')}
        </MenuItem>
        <MenuItem icon={<CgProfile />} as={RouterLink} to={userPageLink}>
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
