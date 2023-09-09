import { getQuery, patchQuery, postQuery } from './apiFunctions'
import { UserToken, UserCourse } from './apiTypes'

export const getCoursesApi = (token: string) => {
    return getQuery<UserCourse[]>({
        path: '/regular_user/courses/',
        token,
        callback: (data: UserCourse[]) =>
            data
    })
}
