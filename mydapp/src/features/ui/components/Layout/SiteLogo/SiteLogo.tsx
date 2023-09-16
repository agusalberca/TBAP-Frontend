import { Avatar, Box, useColorMode } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import imageSiteLogoWhite from '../../../assets/images/logo-blanco.png';
import imageSiteLogoBlack from '../../../assets/images/logo-negro.png';

export interface SiteLogoProps {
  siteName: string;
  baseUrl: string;
}
export const SiteLogo: React.FC<SiteLogoProps> = ({ siteName, baseUrl }) => {
  const { colorMode } = useColorMode();
  const image = colorMode === "dark" ? imageSiteLogoWhite : imageSiteLogoBlack;
  return (
    <Box>
      <Link to={baseUrl}>
        <Avatar src={ image } name={siteName} />
      </Link>
    </Box>
  );
};
