import { useState } from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { AdminsInCourse } from "../../pages/Admins/AdminsInCourse";
import { UsersInCourse } from "../../pages/Admins/UsersInCourse";
import useAppContext from "../../hooks/useAppContext";
import { useNavigate } from "react-router-dom";
import CourseInformation from "./CourseInformation";

const CourseDetail = () => {
    const [selected, setSelected] = useState<number>(0);

    const handleTabChange = (index: number) => {
        setSelected(index);
    };

    const { adminCourseDetail, userCourseDetail, isRegularUser } = useAppContext();
    const navigate = useNavigate();
    if (isRegularUser && !userCourseDetail) navigate('/courses');
    if (!isRegularUser && !adminCourseDetail) navigate('/admin-courses');

    return (
        <Tabs index={selected} onChange={handleTabChange} isFitted variant='enclosed'>
            <TabList>
                <Tab>Course detail</Tab>
                {!isRegularUser && <Tab>Admins in course</Tab>}
                {!isRegularUser && <Tab>Users in course</Tab>}
                <Tab>Tokens of the course</Tab>
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
                <TabPanel>
                    <p>Tab 3 content</p>
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};

export default CourseDetail;
