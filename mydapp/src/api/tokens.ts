import { any } from 'prop-types'
import { getQuery, patchQuery, postQuery } from './apiFunctions'
import { getUserTokens, tokenClaimSignature } from './apiTypes'

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

export const postClaimTokenApi = (token: string, body:{
    user_token_id: number;
}) => {
    const response = postQuery<tokenClaimSignature | any>({
        path: '/blockchain/token/claim/',
        token,
        body,
    })
    return response
}