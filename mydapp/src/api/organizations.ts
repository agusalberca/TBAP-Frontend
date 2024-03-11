import { getQuery, patchQuery, postQuery, deleteQuery } from './apiFunctions'
import { UserToken, UserCourse, PaginatedItem, Admin } from './apiTypes'

export const getInvitationsApi = (token: string) => {
    return getQuery<PaginatedItem>({
        path: '/organization/invitations-sent/',
        token,
        callback: (data: PaginatedItem) =>
            data.data instanceof Array
                ? data
                : { ...data, page: 1, total_items: 0, total_pages: 1, data: [] },
    })
}

export const sentAdminInvitationEmail = async (token, body: { email: string; }) => {
    return await postQuery<any>({
        path: '/organization/send-admin-invitation/',
        token,
        body,
    })
}


export const deleteInvitationApi = async (
    token, body: {invitation_id: number}
) => {
    return await deleteQuery<any>({
        path: '/organization/invitations-sent/',
        token,
        body,
    })
}


export const getAdminOfOrganizationApi = (token: string, params: { organization_id: number }) => {
    return getQuery<Admin[]>({
        path: '/organization/admins/',
        token,
        params
    })

}
export const getUsersOfCourseApi = (token: string, params: { course_id: number, page: number, per_page?: number, status?:string}) => {
    params.status = params.status || "Pending";
    params.per_page = params.per_page || 6; 
    return getQuery<PaginatedItem>({
        path: '/admin/users-in-course/',
        token,
        params,
        callback: (data: PaginatedItem) =>
            data.data instanceof Array
                ? data
                : { ...data, page: 1, total_items: 0, total_pages: 1, data: [] },
    });
};


export const addNewAdminToCourse = async (token, body: { 
    organization_id: string; 
    course_id: string;
    admin_id: string;
}) => {
    return await postQuery<any>({
        path: '/admin/add-admin-to-course/',
        token,
        body,
    })
}


export const addNewUserToCourse = async (token, body: { 
    course_id: string;
    email: string;
}) => {
    return await postQuery<any>({
        path: '/admin/send-invitation-to-join-course-as-user/',
        token,
        body,
    })
}


export const addNewUserMassivelyToCourse = async (token, body: { 
    course_id: string;
    emails: FormData;
}) => {
    return await postQuery<any>({
        path: '/admin/send-invitation-to-join-course-as-user/',
        token,
        body,
    })
}

