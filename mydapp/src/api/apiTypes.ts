
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


export interface getUserTokens {
  page: number;
  total_items: number;
  total_pages: number;
  data?: UserToken[];
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
}

export interface UserCourse {
  id: number;
  course: {
    id: number;
    name: string;
    description: string;
    organization: number;
  }
  user: number;
}

export interface Error{
  error: string;
}

export type TableTypes = UserComplete
