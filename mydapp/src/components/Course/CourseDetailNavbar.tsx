import { useState, useContext } from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { AdminInvitations } from "../../pages/Admins/Invitations";
import { AdminsInCourse } from "../../pages/Admins/AdminsInCourse";
import { UsersInCourse } from "../../pages/Admins/UsersInCourse";
import useAppContext from "../../hooks/useAppContext";
import { useNavigate } from "react-router-dom";

const CourseDetail = () => {
    const [selected, setSelected] = useState<number>(0);

    const handleTabChange = (index: number) => {
        setSelected(index);
    };
    const { adminCourseDetail } = useAppContext();
    const navigate = useNavigate()
    if (!adminCourseDetail) navigate('/admin-courses')


    return (
        <Tabs index={selected} onChange={handleTabChange} isFitted variant='enclosed'>
            <TabList>
                <Tab>Course detail</Tab>
                <Tab>Admins in course</Tab>
                <Tab>Users in course</Tab>
                <Tab>Tokens of the course</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                    <p>Details course</p>
                </TabPanel>
                <TabPanel>
                    <AdminsInCourse />
                </TabPanel>
                <TabPanel>
                    <UsersInCourse />
                </TabPanel>
                <TabPanel>
                    <p>Tab 3 content</p>
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};

export default CourseDetail;
