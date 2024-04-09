import {
    Box,
    Container,
    Stack,
    Center,
    Text
  } from '@chakra-ui/react';
  import { useTranslation } from 'react-i18next';
  import { withBackendProtection } from '../../features/auth/hocs/withBackendProtection';
  import { CommonHeader } from '../../features/ui/components/CommonHeader';
  import useAppContext from '../../hooks/useAppContext';
  import { UserCourseList } from '../../components/Course/Users/UserCourseList';
  import { requireAuth } from '../auth/AboutYou';


  export const UserCoursesPage: React.FC = withBackendProtection(() => {
    requireAuth();
    const { t } = useTranslation('Course');
    const { selectedOrganization, userCourses } = useAppContext();
    
    if (!selectedOrganization) {
      return (
        <Box p={4}>
          <Container maxW="7xl" py={2} as={Stack} spacing={2}>
            <CommonHeader
              title={t('Courses')}
              description={t('These are your courses')}
              />
            <Box>
              <Text>{t('You have no courses')}</Text>
            </Box>
          </Container>
        </Box>
      );
    }
    

    const courseDataList = {courses: userCourses}

    return (
      <>
        <Box p={4}>
          <Container maxW="7xl" py={2} as={Stack} spacing={2}>
            <CommonHeader 
              title={t('Courses')}
              description={t('These are your courses')}
            />
            <Box>
              <Center>
                <UserCourseList {...courseDataList} />
              </Center>
            </Box>
          </Container>
        </Box>

      </>
    );
  });
  