import { any } from 'prop-types'
import { getQuery, patchQuery, postQuery } from './apiFunctions'
import { PaginatedItem, tokenClaimSignature } from './apiTypes'

function capitalizeText(text: string): string {
    return (text && text[0].toUpperCase() + text.slice(1)) || text;
  }

export const getUserTokensApi = (token: string, is_claimed: boolean = true) => {
    return getQuery<PaginatedItem>({
        path: '/blockchain/user-tokens/',
        params: { is_claimed: capitalizeText(is_claimed.toString()) },
        token,
        callback: (data: PaginatedItem) =>
            data.data instanceof Array
            ? data
            : { ...data, page: 1, total_items: 0, total_pages: 1, data: [] },
    })
}

export const getClaimTokenApi = (token: string   
    ) => {
    const response = postQuery<tokenClaimSignature | any>({
        path: '/blockchain/token/claim/',
        token
    })
    return response
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