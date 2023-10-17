import { useState, useContext } from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { AdminInvitations } from "../../pages/Admins/Invitations";
import { AdminsInCourse } from "../../pages/Admins/AdminsInCourse";

const CourseDetail = () => {
    const [selected, setSelected] = useState<number>(0);

    const handleTabChange = (index: number) => {
        setSelected(index);
    };

    return (
        <Tabs index={selected} onChange={handleTabChange} isFitted variant='enclosed'>
            <TabList>
                <Tab>Admins in course</Tab>
                <Tab>Users in course</Tab>
                <Tab>Tokens of the course</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                    <AdminsInCourse />
                </TabPanel>
                <TabPanel>
                    <p>Tab 2 content</p>
                </TabPanel>
                <TabPanel>
                    <p>Tab 3 content</p>
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};

export default CourseDetail;
