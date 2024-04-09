import { useEffect, useState } from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { AdminsInCourse } from "../../pages/Admins/AdminsInCourse";
import { UsersInCourse } from "../../pages/Admins/UsersInCourse";
import { TokenGroupsInCourse } from "../../pages/Admins/TokenGroupsInCourse";
import useAppContext from "../../hooks/useAppContext";
import { useNavigate } from "react-router-dom";
import CourseInformation from "./CourseInformation";
import { useTranslation } from "react-i18next";

const CourseDetail = () => {
    const { t } = useTranslation('Course');
    const [selected, setSelected] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    const handleTabChange = (index: number) => {
        setSelected(index);
    };

    const { adminCourseDetail, userCourseDetail, isRegularUser } = useAppContext();
    //This is needed because the context takes too long to load and an undesired redirection happens otherwise.
    useEffect(() => {
        if (isRegularUser === undefined || (isRegularUser && !userCourseDetail) || (!isRegularUser && !adminCourseDetail)) {
            // Data not yet available, stay in loading state
            setLoading(true);
        } else {
            // Data available, stop loading
            setLoading(false);
        }    
    }, [isRegularUser, userCourseDetail, adminCourseDetail]);
    
    const navigate = useNavigate();
    useEffect(() => {
        // Redirect once data is available and user type is determined
        if (!loading) {
            if (isRegularUser && !userCourseDetail) {
                navigate('/courses');
            }
            if (!isRegularUser && !adminCourseDetail) {
                navigate('/admin-courses');
            }
        }
    }, [loading, isRegularUser, userCourseDetail, adminCourseDetail, navigate]);

    return (
        <Tabs index={selected} onChange={handleTabChange} isFitted variant='enclosed'>
            <TabList>
                <Tab>{t('Course detail')}</Tab>
                {!isRegularUser && <Tab>{t('Admins in course')}</Tab>}
                {!isRegularUser && <Tab>{t('Users in course')}</Tab>}
                <Tab>{t('Course Tokens')}</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                    <CourseInformation />
                </TabPanel>

                {!isRegularUser && (
                    <TabPanel>
                        <AdminsInCourse />
                    </TabPanel>
                )}
                {!isRegularUser && (
                    <TabPanel>
                    <UsersInCourse />
                </TabPanel>
                )}
                {!isRegularUser && (
                <TabPanel>
                    <TokenGroupsInCourse />
                </TabPanel>
                )}
                
                {isRegularUser && (
                    <TabPanel>
                        <p>TODO: MyCourseTokens</p>
                        {/* TODO: <MyCourseTokens /> */}
                    </TabPanel>
                )}
            </TabPanels>
        </Tabs>
    );
};

export default CourseDetail;
