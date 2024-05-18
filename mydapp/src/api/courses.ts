import { deleteQuery, getQuery, patchQuery, postQuery } from './apiFunctions'
import { UserToken, UserCourse, AdminCourse, UserInvitation, OrganizationInvitation, TokenGroup, Admin } from './apiTypes'


export const createCourseApi = ( token: string, body: {name: string, description: string, organization_id: number}) => {
    return postQuery<AdminCourse>({
        path: '/admin/courses/',
        token,
        body,
        callback: (data) => data.data
    })
}


export const getUserCoursesApi = (token: string, params:{"organization_id": number}) => {
    return getQuery<UserCourse[]>({
        path: '/regular_user/courses/',
        token,
        params,
        callback: (data: UserCourse[]) =>
            data
    })
}

export const getAdminCoursesApi = (token: string, params) => {
    return getQuery<AdminCourse[]>({
        path: '/admin/courses/',
        token,
        params,
        callback: (data: AdminCourse[]) => 
            data
    })
}

export const getCourseTokenGroups = (token: string, params) => {
    return getQuery<TokenGroup[]>({
        path: '/blockchain/token-groups/',
        token,
        params,
        callback: (data: TokenGroup[]) => 
            data
    })
}

export const getInvitationToJoinCourseAsUserApi = (token: string) => {
    return getQuery<UserInvitation[]>({
        path: '/regular_user/invitations-to-join-course-as-user/',
        token
    })
}

export const getInvitationToJoinOrganizationAsAdminApi = (token: string) => {
    return getQuery<OrganizationInvitation[]>({
        path: '/admin/invitations-to-became-admin/',
        token
    })
}


export const canBeDeletedCourseApi = async (token: string, params: any): Promise<boolean> => {
    try {
        const data = await getQuery({
            path: '/admin/course-delete/',
            token,
            params,
            callback: (response) => response?.deletable,
        });

        return Boolean(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        return false;
    }
};

export const deleteCourseApi = async (
    token, body: {course_id: number}
) => {
    return await deleteQuery<any>({
        path: '/admin/course-delete/',
        token,
        body,
    })
}