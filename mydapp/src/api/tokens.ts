import { any } from 'prop-types'
import { getQuery, patchQuery, postQuery } from './apiFunctions'
import { getUserTokens, tokenClaimSignature } from './apiTypes'

function capitalizeText(text: string): string {
    return (text && text[0].toUpperCase() + text.slice(1)) || text;
  }

export const getUserTokensApi = (token: string, is_claimed: boolean = true) => {
    return getQuery<getUserTokens>({
        path: '/blockchain/user-tokens/',
        params: { is_claimed: capitalizeText(is_claimed.toString()) },
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