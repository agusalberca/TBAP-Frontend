import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { usePageLink } from '../../../../pages/usePageLink';

import { DropdownMenu } from './DropdownMenu';

export const ProfileDropdownMenu: React.FC = () => {
  const navigate = useNavigate();
  const { pageLink } = usePageLink();

  const onDisconnectClick = () => {
    // TODO: log user out
    navigate('/');
  };
  return (
    <DropdownMenu
    username={"Hardcoded username"}
    profileLink={pageLink('/profileLink')}
    myTokensLink={pageLink('/profileLink')}
    onDisconnectClicked={onDisconnectClick}
    />
  );
};
