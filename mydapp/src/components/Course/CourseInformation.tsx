import { useQuery } from "react-query";
import useAppContext from "../../hooks/useAppContext";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalCloseButton,
    useDisclosure,
    Button,
    Box,
    Text,
  } from '@chakra-ui/react';
import { canBeDeletedCourseApi, deleteCourseApi } from "../../api/courses";
import { Tooltip } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
  

const CourseInformation = () => {
    const { t } = useTranslation('Course');
    const { adminCourseDetail, userCourseDetail, token, getAdminCoursesAsync, isAdmin, isOrganization } = useAppContext();
    const { isOpen: isOpenModal, onOpen: onOpenModal, onClose: onCloseModal } = useDisclosure();
    const courseDetail = adminCourseDetail || userCourseDetail.course;

    const { data: canBeDeleted } = useQuery<boolean, Error>('canBeDeleted', async () => {
        const params = { course_id: adminCourseDetail.id };
        const result = await canBeDeletedCourseApi(token, params);
        return result;
    });
    const navigate = useNavigate();

    const handleDeleteCourse = () => {
        deleteCourseApi(token, { course_id: courseDetail.id });
        getAdminCoursesAsync();
        navigate('/admin-courses');
    }

    return (
        <>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "68vh", padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
                <header>
                    <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
                        {courseDetail?.name}
                    </h1>
                </header>

                <section>
                    <p style={{ lineHeight: "1.6" }}>
                        {courseDetail?.description}
                    </p>
                </section>
            </div>

            { (isAdmin || isOrganization) && (
            
                <div style={{ display: "flex", justifyContent: "center"}}>
                    {canBeDeleted ? (
                        <Button
                            onClick={onOpenModal}
                            colorScheme="red"
                            variant="link"
                            _hover={{ textDecoration: 'underline', color: 'red.500' }}
                        >
                            {t('Delete course')}
                        </Button>
                    ) : (
                        <Tooltip label="This course can't be deleted because it has tokens assigned" aria-label="A tooltip">
                            <Text color="gray.500" cursor="not-allowed" _hover={{ textDecoration: 'underline' }}>
                                {t('Delete course')}
                            </Text>
                        </Tooltip>
                    )}
                </div>
            )}


            {isOpenModal && (
            <Modal isOpen={isOpenModal} onClose={onCloseModal}>
                <ModalOverlay />
                <ModalContent p={4}>
                    <ModalHeader>{t('Delete course')}</ModalHeader>
                    <ModalCloseButton />
                    <Box mb={4} p={7}>
                        <Text>{t('Are you sure you want to delete this course?')}</Text>
                    </Box>

                    <ModalFooter>
                    <Button colorScheme="red" mr={3} onClick={handleDeleteCourse}>
                        {t('Delete')}
                    </Button>
                    <Button variant="ghost" mr={3} onClick={onCloseModal}>
                        {t('Close')}
                    </Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>
            )}
        </>
    );
};

export default CourseInformation;
