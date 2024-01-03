import React from "react";
import useAppContext from "../../hooks/useAppContext";

const CourseInformation = () => {
    const { adminCourseDetail } = useAppContext();

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "68vh", padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
            <header>
                <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
                    {adminCourseDetail?.name}
                </h1>
            </header>

            <section>
                <p style={{ lineHeight: "1.6" }}>
                    {adminCourseDetail?.description}
                </p>
            </section>
        </div>
    );
};

export default CourseInformation;
