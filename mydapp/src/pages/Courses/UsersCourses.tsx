import {
    Box,
    Container,
    Stack,
    Center,
  } from '@chakra-ui/react';
  import { useTranslation } from 'react-i18next';
  import { withBackendProtection } from '../../features/auth/hocs/withBackendProtection';
  import { CommonHeader } from '../../features/ui/components/CommonHeader';
  import useAppContext from '../../hooks/useAppContext';
  import { UserCourseList } from '../../components/Course/Users/UserCourseList';
  import { requireAuth } from '../auth/AboutYou';

  export const UserCoursesPage: React.FC = withBackendProtection(() => {
    requireAuth();
    const { t } = useTranslation('PageUser');
    const { selectedOrganization, userCourses } = useAppContext();
    
    if (!selectedOrganization) {
      return (
        <Box p={4}>
          <Container maxW="7xl" py={2} as={Stack} spacing={2}>
            <CommonHeader
              title="Courses"
              description="These are your courses"
              />
            <Box>
              <p>You have no courses</p>
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
              title="Courses"
              description="These are your courses"
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
  