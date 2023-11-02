import React from 'react';
import { useTranslation } from 'react-i18next';
import { RouteObject } from 'react-router-dom';

import { i18nConfig } from '../features/i18n/config';
import { useWalletAuthentication } from '../features/wallet/hooks/useWalletAuthentication';

import { MenuType, PageType } from './types';

import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from './auth/ForgotPassword';
import { UserCoursesPage } from './Courses/UsersCourses';
import { AdminCoursesPage } from './Courses/AdminCourses';
import { OrganizationInvitations } from './Organization/Invitations';
import { AdminInvitations } from './Admins/Invitations';
import { useBackendAuthentication } from '../features/auth/hooks/useBackendAuthentication';
import useAppContext from '../hooks/useAppContext';
import CourseDetail from '../components/Course/CourseDetailNavbar';

const HomePage = React.lazy(() =>
  import(/* webpackChunkName: "HomePage" */ './Home/Home').then(module => ({
    default: module.HomePage,
  }))
);

const UserProfilePage = React.lazy(() =>
  import(/* webpackChunkName: "UserProfilePage" */ './User/UserProfile').then(module => ({
    default: module.UserProfilePage,
  }))
);

const TokenDetailPage = React.lazy(() =>
  import(/* webpackChunkName: "UserTokensPage" */ './Tokens/TokenDetail').then(module => ({
    default: module.TokenDetailPage,
  }))
);

const UserTokensPage = React.lazy(() =>
  import(/* webpackChunkName: "UserTokensPage" */ './User/UserTokens').then(module => ({
    default: module.UserTokensPage,
  }))
);

const UserPage = React.lazy(() =>
  import(/* webpackChunkName: "UserPage" */ './User/User').then(module => ({
    default: module.UserPage,
  }))
);

const ClaimTokensPage = React.lazy(() =>
  import(
    /* webpackChunkName: "ClaimTokensPage" */ './Tokens/ClaimTokens'
  ).then(module => ({
    default: module.ClaimTokensPage,
  }))
);



// ADD YOUR PAGE IMPORTS HERE

export const usePages = () => {
  const { t, i18n } = useTranslation('Menu');
  const isWalletAuthenticated = useWalletAuthentication();
  const isBackendAuthenticated = useBackendAuthentication();
  const isAuthenticated  = isWalletAuthenticated && isBackendAuthenticated

  let { isOrganization, isAdmin, isRegularUser } = useAppContext();
  // TODO REVISAR
  isOrganization=true;
  isAdmin=true;
  isRegularUser=true;

  // if you do not have control/access on hosting(html server) config, use hashRouter
  // keep in mind that if you do not use hashRouter,
  // you should redirect all requests to index.html in your server config
  const isHashRouter = false;

  // Home Route
  const Home: PageType = {
    index: true,
    element: <HomePage />,
    menuLabel: t('Home', { ns: 'Menu' }),
    isShownInMainMenu: false,
    isShownInSecondaryMenu: false,
    isProtected: false,
    };

  // User Dashboard Page
  const User: RouteObject = {
    path: 'user',
    element: <UserPage />,
  };

  // User Profile Page
  const UserProfile: PageType = {
    path: 'profile',
    element: <UserProfilePage />,
    menuLabel: t('Profile', { ns: 'Menu' }),
    isShownInMainMenu: false,
    isShownInSecondaryMenu: false,
    isProtected: false,
  };

  // User Tokens Page
  const UserTokens: PageType = {
    path: 'tokens',
    element: <UserTokensPage />,
    menuLabel: t('My Tokens', { ns: 'Menu' }),
    isShownInMainMenu: isRegularUser,
    isShownInSecondaryMenu: isRegularUser,
    isProtected: false,
  };
  
  // Token Detail Page
  const TokenDetail: PageType = {
    path: 'tokens/detail',
    element: <TokenDetailPage />,
    menuLabel: t('Token Detail', { ns: 'Menu' }),
    isShownInMainMenu: false,
    isShownInSecondaryMenu: false,
    isProtected: true,
  };
  
  const UserCourses: PageType = {
    path: 'user-courses',
    element: <UserCoursesPage />,
    menuLabel: t('Courses', { ns: 'Menu' }),
    isShownInMainMenu: isRegularUser,
    isShownInSecondaryMenu: isRegularUser,
    isProtected: false,
  };

  const AdminCourses: PageType = {
    path: 'admin-courses',
    element: <AdminCoursesPage />,
    menuLabel: t('Courses', { ns: 'Menu' }),
    isShownInMainMenu: isRegularUser,
    isShownInSecondaryMenu: isRegularUser,
    isProtected: false,
  };
  const ClaimTokens: PageType = {
    path: 'tokens/claim',
    element: <ClaimTokensPage />,
    menuLabel: t('Claim Tokens', { ns: 'Menu' }),
    isShownInMainMenu: isRegularUser,
    isShownInSecondaryMenu: isRegularUser,
    isProtected: false,
  };

  const RegisterView: PageType = {
    path: 'register',
    element: <Register />,
    menuLabel: t('Register', { ns: 'Menu' }),
    isShownInMainMenu: false,
    isShownInSecondaryMenu: false,
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


  // Organizations views

  const OrganizationInvitationsPage: PageType = {
    path: 'organzation-invitations',
    element: <OrganizationInvitations />,
    menuLabel: t('Invitations', { ns: 'Menu' }),
    isShownInMainMenu: isOrganization,
    isShownInSecondaryMenu: isOrganization,
    isProtected: true,
  };


  // Admin views

  // const AdminInvitationsPage: PageType = {
  //   path: 'admin-invitations',
  //   element: <AdminInvitations />,
  //   menuLabel: t('Invitations', { ns: 'Menu' }),
  //   isShownInMainMenu: isAdmin,
  //   isShownInSecondaryMenu: isAdmin,
  //   isProtected: true,
  // };

  const CourseDetailPage: PageType = {
    path: 'course/',
    element: <CourseDetail />,
    menuLabel: t('course', { ns: 'Menu' }),
    isShownInMainMenu: false,
    isShownInSecondaryMenu: false,
    isProtected: true,
  };

  // do not forget add your page routes into this array
  const Pages: PageType[] = [
      RegisterView, 
      LoginView, 
      ForgotPasswordView,
      UserProfile, 
      
      OrganizationInvitationsPage,
      
      // AdminInvitationsPage,
      CourseDetailPage,
      UserCourses,
      AdminCourses, 
      TokenDetail,
      UserTokens,
      ClaimTokens,
    ];

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
