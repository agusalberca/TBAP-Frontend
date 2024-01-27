import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAppContext from '../../../../hooks/useAppContext'
import { usePageLink } from '../../../../pages/usePageLink';

import { DropdownMenu } from './DropdownMenu';

export const ProfileDropdownMenu: React.FC = () => {
  const navigate = useNavigate();
  const { pageLink } = usePageLink();
  const { user } = useAppContext(); // Get user data from context
  const username = user && user.username;

  const onDisconnectClick = () => {
    // TODO: log user out
    navigate('/');
  };
  return (
    <>
      <DropdownMenu
      username={username}
      myTokensLink={pageLink('/tokens')}
      onDisconnectClicked={onDisconnectClick}
      />
    </>
  );
};
