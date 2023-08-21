import { getQuery, patchQuery, postQuery } from './apiFunctions'
import { User, UserProfile } from './apiTypes'

export const login = async (body: { email: string; password: string }) => {
  return await postQuery<any>({
    path: '/login/',
    body,
  })
}

export const passwordRecovery = async (body: { email: string }) => {
  return await postQuery<any>({
    path: '/users/password-recovery/',
    body,
  })
}

export const checkPasswordRecoveryToken = async (body: {
  email: string;
  token: string;
}) => {
  return await postQuery<any>({
    path: '/users/password-recovery/check-token/',
    body,
  })
}

export const passwordRecoveryConfirm = async (body: {
  email: string;
  token: string;
  password: string;
}) => {
  return await postQuery<any>({
    path: '/users/password-recovery/confirm/',
    body,
  })
}

export const changePassword = async (token: string, body: {
  old_password: string;
  new_password1: string;
  new_password2: string;
}) => {
  return await postQuery<any>({
    path: '/users/password-change/',
    token,
    body,
  })
}

export const getUser = async (token: string) => {
  return await getQuery<User & UserProfile & { error?: string }>({
    path: '/users/me/',
    token,
    callback: (data) => ({
      ...data?.user,
      ...data?.user_profile,
    }),
  })
}

export const updateUser = async (token: string, body: {
  first_name?: string;
  last_name?: string;
  phone?: string;
  rol?: string;
}) => {
  return await patchQuery<any>({
    path: '/users/me/',
    token,
    body,
  })
}

// interface AddUser {
//   email: string;
//   user_type: string;
//   organization_id?: number;
//   region_id?: number;
//   organization_name?: string;
//   organization_country_residence?: string;
//   organization_address?: string;
//   organization_contact_email?: string;
//   organization_phone?: string;
//   region_name?: string;
//   country_ids?: Array<number>;
// }

export const addUser = async (token: string, body: {
  email: string;
  user_type: string;
  organization_id?: number;
  region_id?: number;
  organization_name?: string;
  organization_country_residence?: string;
  organization_address?: string;
  organization_contact_email?: string;
  organization_phone?: string;
  office_name?: string;
  office_country?: number;
  office_city?: string;
  office_zip_code?: string;
  address_line_1?: string;
  address_line_2?: string;
  office_phone?: string;
  office_email?: string;
  region_name?: string;
  country_ids?: string;
}, ) => {
  return await postQuery<any>({
    path: '/users/send-invitation-email/',
    token,
    body,
  })
}