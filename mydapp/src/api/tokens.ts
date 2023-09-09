import { getQuery, patchQuery, postQuery } from './apiFunctions'
import { UserToken, getUserTokens } from './apiTypes'

export const getUserTokensApi = (token: string) => {
    return getQuery<getUserTokens>({
        path: '/blockchain/user-tokens/',
        token,
        callback: (data: getUserTokens) =>
            data.data instanceof Array
            ? data
            : { ...data, page: 1, total_items: 0, total_pages: 1, data: [] },
    })
}
