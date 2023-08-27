import React from 'react';
import { useTranslation } from 'react-i18next';
import { RouteObject } from 'react-router-dom';

import { i18nConfig } from '../features/i18n/config';
import { useWalletAuthentication } from '../features/wallet/hooks/useWalletAuthentication';

import { MenuType, PageType } from './types';

import Login from '../pages/auth/Login';
import ForgotPassword from './auth/ForgotPassword';

const HomePage = React.lazy(() =>
  import(/* webpackChunkName: "HomePage" */ './Home/Home').then(module => ({
    default: module.HomePage,
  }))
);

const UserPage = React.lazy(() =>
  import(/* webpackChunkName: "UserPage" */ './User/User').then(module => ({
    default: module.UserPage,
  }))
);

const ClaimTokensPage = React.lazy(() =>
  import(
    /* webpackChunkName: "ClaimTokensPage" */ './ClaimTokens/ClaimTokens'
  ).then(module => ({
    default: module.ClaimTokensPage,
  }))
);

// ADD YOUR PAGE IMPORTS HERE

export const usePages = () => {
  const { t, i18n } = useTranslation('Menu');
  const { isAuthenticated } = useWalletAuthentication();

  // if you do not have control/access on hosting(html server) config, use hashRouter
  // keep in mind that if you do not use hashRouter,
  // you should redirect all requests to index.html in your server config
  const isHashRouter = false;

  // Home Route
  const Home: PageType = {
    index: true,
    element: <HomePage />,
    menuLabel: t('Home', { ns: 'Menu' }),
    isShownInMainMenu: true,
    isShownInSecondaryMenu: true,
    isProtected: false,
  };

  // User Dashboard Page
  const User: RouteObject = {
    path: 'user',
    element: <UserPage />,
  };

  // ADD YOUR PAGE ROUTES HERE
  const Courses: PageType = {
    path: 'courses',
    menuLabel: t('Courses', { ns: 'Menu' }),
    isShownInMainMenu: true,
    isShownInSecondaryMenu: true,
    isProtected: false,
  };
  const ClaimTokens: PageType = {
    path: 'tokens/claim',
    element: <ClaimTokensPage />,
    menuLabel: t('Claim Tokens', { ns: 'Menu' }),
    isShownInMainMenu: true,
    isShownInSecondaryMenu: true,
    isProtected: false,
  };

  const LoginView: PageType = {
    path: 'login',
    element: <Login />,
    menuLabel: t('Login', { ns: 'Menu' }),
    isShownInMainMenu: false,
    isShownInSecondaryMenu: false,
    isProtected: false,
  };

  const ForgotPasswordView: PageType = {
    path: 'forgot-password',
    element: <ForgotPassword />,
    menuLabel: t('Forgot Password', { ns: 'Menu' }),
    isShownInMainMenu: false,
    isShownInSecondaryMenu: false,
    isProtected: false,
  };


  // do not forget add your page routes into this array
  const Pages: PageType[] = [Courses, ClaimTokens, LoginView, ForgotPasswordView];

  // DO NOT CHANGE THE REST
  const homeMenuItem: MenuType = {
    ...Home,
    path:
      i18n.resolvedLanguage === i18nConfig.fallbackLang.code
        ? ''
        : `/${i18n.resolvedLanguage}/`,
  };

  const mainMenuItems: MenuType[] = [
    homeMenuItem,
    ...Pages.filter(
      m =>
        m.isShownInMainMenu &&
        ((m.isProtected && isAuthenticated) || !m.isProtected)
    ).map(m => {
      return {
        ...m,
        path:
          i18n.resolvedLanguage === i18nConfig.fallbackLang.code
            ? m.path
            : `/${i18n.resolvedLanguage}/${m.path}`,
      };
    }),
  ];

  const secondaryMenuItems: MenuType[] = [
    homeMenuItem,
    ...Pages.filter(
      m =>
        m.isShownInSecondaryMenu &&
        ((m.isProtected && isAuthenticated) || !m.isProtected)
    ).map(m => {
      return {
        ...m,
        path:
          i18n.resolvedLanguage === i18nConfig.fallbackLang.code
            ? m.path
            : `/${i18n.resolvedLanguage}/${m.path}`,
      };
    }),
  ];

  return React.useMemo(() => {
    return {
      Home,
      User,
      Pages,
      mainMenuItems,
      secondaryMenuItems,
      isHashRouter,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.resolvedLanguage, isAuthenticated]);
};
