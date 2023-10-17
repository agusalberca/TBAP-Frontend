import { getQuery, patchQuery, postQuery } from './apiFunctions'
import { UserToken, UserCourse, AdminCourse } from './apiTypes'

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

