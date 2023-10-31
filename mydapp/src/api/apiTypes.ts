
export interface UserMini {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

export interface User {
  id: number;
  username?: string;
  email?: string;
  first_name: string;
  last_name: string;
  date_joined?: string;
}

export interface UserProfile {
  id: number;
  birthdate: string | null;
  sex: string | null;
  profile_image: string | null;
  identification_type: string | null;
  identification_number: string | null;
  user: number;
  wallet_address: string | null;
  user_type: string;
}

export interface UserMe {
  user: User;
  user_profile: UserProfile;
}

export interface UserComplete {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  date_joined: string;
  user_profile: {
    id: number;
    birthdate: string | null;
    sex: string | null;
    profile_image: string | null;
    identification_type: string | null;
    identification_number: string | null;
    user: number;
  } | null;
}

export interface Organization {
  id: number;
  name: string;
  description: string;
  logo: string;
  created_at: string;
  user: User;
}


export interface Admin{
  id: number;
  user: User;
  organization: Organization;
}

export interface AdminOrganization {
  admin_organizations: Organization[];
  user_organizations: Organization[];
}

export interface UserToken {
  id: number;
  token_group: {
    id: number;
    name: string;
    description: string;
    image: string;
    createdAt: string;
    course_id: number;
    course_name: string;
    };
  is_claimed: boolean;
  created_at: string;
}


export interface PaginatedItem {
  page: number;
  total_items: number;
  total_pages: number;
  data?: any[];
  error?: string;
}

export interface postClaimToken {
  user_token_id: number;
}

export interface tokenClaimSignature {
  id: number;
  nonce: number;
  signature: string;
  user: number;
  title: string;
  issuerId: number;
  uri: string;
  pending: boolean;
}

export interface UserCourse {
  id: number;
  course: {
    id: number;
    name: string;
    description: string;
    organization: number;
    organization_name: string;
  }
  user: number;
}
export interface AdminInCourse {
  id: number;
  user: User;
  organization: number;  
}

export interface AdminCourse {
  id: number;
  name: string;
  description: string;
  organization: number;
  admins_in_course: AdminInCourse[];
}

export interface OrganizationInvitation {
  id: number;
  email: string;
  status: string;
  created_at: string;
  organization: number;
}


export interface UserInvitation {
  id: number;
  email: string;
  status: string;
  created_at: string;
  course: {
    id: number;
    name: string;
    description: string;
    organization: number;
    organization_name: string;
  }
}

export interface Error{
  error: string;
}

export type TableTypes = UserComplete
