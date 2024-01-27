import { getQuery, patchQuery, postQuery } from './apiFunctions'
import { UserToken, UserCourse, AdminCourse, UserInvitation } from './apiTypes'

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

export const getInvitationToJoinCourseAsUserApi = (token: string) => {
    return getQuery<UserInvitation[]>({
        path: '/regular_user/invitations-to-join-course-as-user/',
        token
    })
}

export const getInvitationToJoinOrganizationAsAdminApi = (token: string) => {
    return getQuery<UserInvitation[]>({
        path: '/admin/invitations-to-became-admin/',
        token
    })
}
