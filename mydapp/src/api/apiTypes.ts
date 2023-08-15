
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


export type TableTypes = UserComplete
