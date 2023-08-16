//TODO: complete data types for token, courses and organizations 
export interface CourseData {
    title: string;
    description: string;
}
export interface TokenData {
    title: string;
    description: string;
    image: string;
    createdAt: string;
    course: CourseData,
}