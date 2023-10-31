import { getQuery, patchQuery, postQuery } from './apiFunctions'
import { UserToken, UserCourse, AdminCourse, UserInvitation } from './apiTypes'

export const getUserCoursesApi = (token: string) => {
    return getQuery<UserCourse[]>({
        path: '/regular_user/courses/',
        token,
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

export const getInvitationToJoinCourseApi = (token: string) => {
    return getQuery<UserInvitation[]>({
        path: '/regular_user/invitations-to-join-course-as-user/',
        token
    })
}
