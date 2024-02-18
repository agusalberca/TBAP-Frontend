import { deleteQuery, getQuery, patchQuery, postQuery } from './apiFunctions'
import { AdminOrganization, Organization, PaginatedItem, tokenClaimSignature, UserTokenDetail, TokenGroup } from './apiTypes'
import { add_base_url, convert_epoch_to_date } from './utils';
function capitalizeText(text: string): string {
    return (text && text[0].toUpperCase() + text.slice(1)) || text;
  }

export const getUserOrganizationsApi = (token: string) => {
    return getQuery<Organization[]>({
        path: '/organization/',
        token,
        callback: (data) => [...data.admin_organizations, ...data.user_organizations],
    })
}

export const getAdminOrganizationsApi = (token: string) => {
    return getQuery<Organization[]>({
        path: '/organization/',
        token,
        callback: (data) => [...data.admin_organizations, ...data.user_organizations],
    })
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

export const getTokenDetail = (token, db_id) => {
    return getQuery<UserTokenDetail>({
        path: `/blockchain/uri/${db_id}/`,
        token,
        //use utils add_base_url on fields db_token.image and organization.logo
        callback: (data) => {
            data.db_token.image = add_base_url(data.db_token.image)
            data.organization.logo = add_base_url(data.organization.logo)
            data.blockchain_token.createdAt = convert_epoch_to_date(data.blockchain_token.createdAt)
            return data
        }
    })
}

export const getClaimTokenApi = (token: string   
    ) => {
    const response = getQuery<tokenClaimSignature | any>({
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

export const createTokenGroup = ( token: string, body: {
    name: string, 
    description: string, 
    users: number[] | string,
    course_id: number,
}) => {
    return postQuery<TokenGroup>({
        path: '/blockchain/token-groups/',
        token,
        body,
        callback: (data) => data.data
    })
}

export const deleteTokenGroupApi = (token: string, token_group_id: number) => {
    return deleteQuery<TokenGroup>({
        path: `/blockchain/token-groups/${token_group_id}/`,
        token,
    })
}