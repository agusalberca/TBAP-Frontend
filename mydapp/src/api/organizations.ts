import { getQuery, patchQuery, postQuery, deleteQuery } from './apiFunctions'
import { UserToken, UserCourse, PaginatedItem } from './apiTypes'

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


export const deleteInvitationApi = async (
    token, body: {invitation_id: number}
) => {
    return await deleteQuery<any>({
        path: '/organization/invitations-sent/',
        token,
        body,
    })
}