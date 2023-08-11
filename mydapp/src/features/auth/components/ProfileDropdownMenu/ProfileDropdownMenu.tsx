import { useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import useTypedSelector from '../../../../hooks/useTypedSelector';
import { usePageLink } from '../../../../pages/usePageLink';
import { useActions } from '../../hooks/useActions';

import { DropdownMenu } from './DropdownMenu';

export const ProfileDropdownMenu: React.FC = () => {
  const { t } = useTranslation('FeatureWallet');
  const navigate = useNavigate();
  const { pageLink } = usePageLink();
  const toast = useToast();
  const actions = useActions();
  const account = useTypedSelector(state => state.wallet.account.account);

  const onDisconnectClick = () => {
    actions.disconnectWallet();
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
